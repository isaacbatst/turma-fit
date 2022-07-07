import Head from "next/head"

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Salve seus treinos gratuitamente"
        />
        <meta name="og:title" content='TurmaFit' />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <main>
        { children }
      </main>
    </>
  )
}

export default Layout