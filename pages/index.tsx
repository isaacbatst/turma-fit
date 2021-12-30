import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/pages/home.module.scss'
import Layout from '../components/Layout'
import Header from '../components/Header'
import NavMenu from '../components/Home/NavMenu'
import { NextPageWithAuth } from '../types/page'

const Home: NextPageWithAuth = () => {
  return (
    <Layout>
      <div className={styles.wrap}>
        <Head>
          <title>Turma Fit</title>
          <link rel="icon" href="/favicon.png" />
        </Head>

        <Header />
        <NavMenu />
      </div>
    </Layout>
  )
}

Home.auth = true;

export default Home;