import Head from 'next/head'
import Hero from '../src/components/Hero/Hero'


export default function Home() {
  return (
    <>
      <Head>
        <title>Home - MuSigma KSSA Scrabble Events Page</title>
        <meta name="description" content="Home - The Official Website of KSSA Scrabble Events Page" />
        <meta name="keyword" content="KSSA Scrabble Events Page, KSSA, Indian scrabble"/>
      </Head>
      <Hero/>
    </>
  )
}
