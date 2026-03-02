import Head from 'next/head'
import PresidentForm from "../src/components/Register/EeastCup/PresidentForm"


export default function Register() {
  return (
    <>
      <Head>
        <title>Registration - Janet Adowei Memorial Scrabble Classics (JAMSC)Tournament</title>
        <meta name="description" content="Registration - The Official Website of Janet Adowei Memorial Scrabble Classics (JAMSC) Tournament" />
        <meta name="keyword" content="Janet Adowei Memorial Scrabble Classics (JAMSC) Tournament, JAMSC Scrabble"/>
      </Head>
      <PresidentForm/>
    </>
  )
}
