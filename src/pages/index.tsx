import type { NextPage } from 'next'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import Header from '../components/Header'
import NavMenu from '../components/home/NavMenu'
import Layout from '../components/Layout'
import StudentCard from '../components/personal/students/StudentCard'
import usePersonalAdvices from '../lib/swr/usePersonalAdvices'
import styles from '../styles/pages/home.module.scss'
import containers from '../styles/common/containers.module.scss';

const Home: NextPage = () => {
  const [mounted, setMounted] = useState(false)
  const { advices } = usePersonalAdvices();

  useEffect(() => {
    setMounted(true);
  }, [])

  return (
    <Layout>
      <div className={styles.wrap}>
        <Head>
          <title>Turma Fit</title>
          <link rel="icon" href="/favicon.png" />
        </Head>

        <Header />
        <NavMenu />

        <section className={containers.container}>
          <section aria-label="Seção de Listagem">
            <div role="list" aria-label="Lista de Alunos" className={styles.studentCards}>
              {
                mounted && advices &&  advices.map((advice) => {
                  return <StudentCard
                    key={`${advice.personalId}-${advice.studentId}`}
                    advice={advice}
                  />
                })
              }
            </div>
          </section>
          {
            advices?.length === 0 && (
              <div className={styles.noStudents}>
                <p>Nenhum aluno encontrado</p>
              </div>
            )
          }
        </section>
      </div>
    </Layout>
  )
}

export default Home;