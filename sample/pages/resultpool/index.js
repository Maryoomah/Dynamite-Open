import Head from 'next/head';
import ResultPool from '../../src/components/ResultPool/ResultPool';

export default function index() {
  return (
    <>
      <Head>
        {/* <title>ResultPool - Janet Adowei Memorial Scrabble Classics (JAMSC)Tournament</title> */}
        <title>ResultPool - Scrabblemania Tournament</title>
     <meta name="description" content="Home - The Official Website of Liberia Scrabble Events Page" />
        <meta name="keyword" content="Liberia Scrabble Events Page, Scrabblemania, liberia scrabble"/>
       </Head>
      <ResultPool/>
    </>
  )
}
