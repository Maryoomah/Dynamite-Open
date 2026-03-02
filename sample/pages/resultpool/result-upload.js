import Head from 'next/head';
import Upload from '../../src/components/ResultPool/Upload';

export default function resultupload() {
  return (
    <>
      <Head>
        {/* <title>Result Upload - Janet Adowei Memorial Scrabble Classics (JAMSC)Tournament</title> */}
        <title>Result Upload - Scrabblemania Tournament</title>
       <meta name="description" content="Home - The Official Website of Liberia Scrabble Events Page" />
        <meta name="keyword" content="Liberia Scrabble Events Page, Scrabblemania, liberia scrabble"/>
      </Head>
      <Upload/>
    </>
  )
}
