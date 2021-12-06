import Head from "next/head"

const Layout: React.FC = ({ children }) => {
  return (
      <>
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="Learn how to build a personal website using Next.js"
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