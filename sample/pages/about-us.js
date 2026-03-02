import Head from 'next/head';
import About from '../src/components/About/About';
import Gallery from '../src/components/Gallery/Gallery';

export default function Register() {
  return (
    <>
      <Head>
        <title>About Us - MuSigma KSSA Open 2026</title>
        <meta name="description" content="About Us - The Official Website of MuSigma KSSA OPEN 2026" />
        <meta name="keyword" content="KSSA OPEN 2026, KSSA, Mu Sigma Scrabble"/>
      </Head>
      <About/>
      <Gallery/>
    </>
  )
}
