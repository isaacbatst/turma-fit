import type { GetServerSideProps, NextPage } from 'next'
import { getSession, useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Header from '../components/Header'
import Layout from '../components/Layout'
import StudentCard from '../components/personal/students/StudentCard'
import usePersonalAdvices from '../lib/swr/usePersonalAdvices'
import containers from '../styles/common/containers.module.scss'
import styles from '../styles/pages/home.module.scss'

const Home: NextPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [mounted, setMounted] = useState(false)
  const { advices } = usePersonalAdvices();

  useEffect(() => {
    if(session && !session.user.name){
      router.push('/fill-profile');
    }
  }, [session, router])

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
        {/* <NavMenu /> */}
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

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if(!session){
    return {
      redirect: {
        destination: '/api/auth/login',
        permanent: false
      }
    }
  }

  if(!session.user.name){
    return {
      redirect: {
        destination: '/fill-profile',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}

export default Home;