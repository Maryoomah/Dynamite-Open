import Head from 'next/head'
import Thanks from '../src/components/Register/Thanks'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'


export default function Thankyou() {

  const router = useRouter();
  const { data } = router.query;
  
  useEffect(() => {
      if (data) {
      const formData = JSON.parse(data);
        console.log(formData);
        const submitForm = async () => {
          try {
            await axios.post('/api/emmaapi', formData);
          } catch (err) {
            console.log(err);
          }
        };

        submitForm();
      }
    }, [data]);

    if (!router.isReady) {
      return <div>Loading...</div>;
    }

  return (
    <>
      <Head>
        <title>Thanks For Registering - Janet Adowei Memorial Scrabble Classics (JAMSC)Tournament</title>
        <meta name="description" content="About Us - The Official Website of Janet Adowei Memorial Scrabble Classics (JAMSC) Tournament" />
        <meta name="keyword" content="Janet Adowei Memorial Scrabble Classics (JAMSC) Tournament, JAMSC Scrabble"/>
      </Head>
      <Thanks/>
    </>
  )
}
