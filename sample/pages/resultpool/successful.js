import Head from 'next/head';
import Successful from '../../src/components/ResultPool/Successful';

export default function successful() {
  return (
    <>
      <Head>
        <title>Result Submission Successful - Scrabblemania Tournament</title>
        <meta name="description" content="Result Submission Successful - The Official Website of Janet Adowei Memorial Scrabble Classics (JAMSC) Tournament" />
        <meta name="keyword" content="Janet Adowei Memorial Scrabble Classics (JAMSC) Tournament, JAMSC Scrabble"/>
      </Head>
      <Successful/>
    </>
  )
}
