import Head from 'next/head';
import Payments from '../src/components/Register/Payments/Payments';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

function Payment() {
  const [formData, setFormData] = useState({});
  const router = useRouter();
  const { data } = router.query;

  useEffect(() => {
    if (data) {
      setFormData(JSON.parse(data));
    }
  }, [data]);

  if (!router.isReady) {
    return (
      <>
        <Head>
          <title>Loading...</title>
        </Head>
        <div>Loading...</div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Payment - Janet Adowei Memorial Scrabble Classics (JAMSC)Tournament</title>
        <meta name="description" content="Payment - The Official Website of Janet Adowei Memorial Scrabble Classics (JAMSC) Tournament" />
        <meta name="keyword" content="Janet Adowei Memorial Scrabble Classics (JAMSC) Tournament, JAMSC Scrabble"/>
      </Head>
      <Payments form={formData} />
    </>
  );
}

export default Payment;
