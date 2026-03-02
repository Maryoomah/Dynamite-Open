import Head from 'next/head';
import TablePool from '../../src/components/ResultPool/TablePool';

export default function resultlist() {
  return (
    <>
      <Head>
        <title>Result Lists - Scrabblemania Tournament</title>
        <meta name="description" content="Home - The Official Website of Liberia Scrabble Events Page" />
        <meta name="keyword" content="Liberia Scrabble Events Page, Scrabblemania, liberia scrabble"/>
      </Head>
      <TablePool/>
    </>
  )
}
