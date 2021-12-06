import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import styles from '../styles/Home.module.css'
import Image from 'next/image'
import Layout from '../components/Layout'

async function fetchApi(endpoint: string) {
  const response = await fetch(`/api/${endpoint}`)
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }

  return response.json()
}

const Home: NextPage = () => {
  return (
    <Layout>
      <div className={styles.container}>
        <Head>
          <title>Home</title>
          <link rel="icon" href="/favicon.png" />
        </Head>

        <section className={styles.main}>
          Oi
        </section>
      </div>
    </Layout>
  )
}

export default Home