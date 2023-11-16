import '@/styles/globals.css'
import Head from 'next/head'
import Layout from './layout'

export default function App({ Component, pageProps }) {
  return (
    <>
    <Head>
      <title>GameList</title>
    </Head>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </>
  )
}
