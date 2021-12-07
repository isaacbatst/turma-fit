import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/pages/home.module.scss'
import Layout from '../components/Layout'
import Header from '../components/Home/Header'


const Home: NextPage = () => {
  return (
    <Layout>
      <div className={styles.container}>
        <Head>
          <title>Turma Fit</title>
          <link rel="icon" href="/favicon.png" />
        </Head>

        <Header />
      </div>
    </Layout>
  )
}

export default Home