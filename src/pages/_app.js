import '@/styles/globals.css'
import Head from 'next/head'
import Layout from './layout'
import ErrorBoundary from '@/components/ErrorBoundary'

export default function App({ Component, pageProps }) {
  return (
    <ErrorBoundary>
    <Head>
      <title>GameList</title>
    </Head>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </ErrorBoundary>
  )
}
