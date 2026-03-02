import  { useState, useEffect } from "react"
import Confetti from "react-confetti";
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import  { useRouter } from "next/router";

const Payments = ({ form }) => {

    const router = useRouter();
    const [confetti, setConfetti] = useState(false);
    useEffect(() => {
        const timeoutId = setTimeout(() => {
        setConfetti(true);
        }, 1000);

        return () => {
        clearTimeout(timeoutId);
        };
    }, []);


    const now = new Date();
    const year = now.getFullYear();
    const month = ('0' + (now.getMonth() + 1)).slice(-2);
    const day = ('0' + now.getDate()).slice(-2);
    const hours = ('0' + now.getHours()).slice(-2);
    const minutes = ('0' + now.getMinutes()).slice(-2);
    const seconds = ('0' + now.getSeconds()).slice(-2);

    const config = {
        public_key: `FLWPUBK-8c2f310158ecb5c81ecaf573286e79f4-X`, 
        tx_ref: `jamsc-tx-${minutes}${seconds}2023`,
        amount: `${form.amount_payed}`,
        currency: 'NGN',
        payment_options: 'card,mobilemoney,ussd',
        customer: {
            email: `${form.email}`,
            phonenumber: `${form.phone_no}`,
            name: `${form.firstname} ${form.surname}`
        },

        customizations: {
            title: "Janet Adowei Memorial Scrabble Classics Payments",
            logo: "https://scrabblejamclassic.com/logo.PNG"
        },

        method: "POST",
    };

    const handleFlutterPayment = useFlutterwave(config);
     const handleFlutterPaymentBtn = async () => {
   
        try {
            const response = await handleFlutterPayment({
                callback: (response) => {
                console.log(response);
                closePaymentModal(); // this will close the modal programmatically
                setTimeout(() => {
                    router.push({
                        pathname: "/thankyou",
                        query: { data: JSON.stringify(form) },
                    });

                }, 5000);
                },
                onClose: () => {},
            });

            } catch (error) {
            console.log(error);
        } 
    };

 

    return (
        <section>
            <div className="lg:max-w-[70%] lg:mx-auto flex justify-center items-center payment flex-col gap-2 h-[68.5vh] sm:h-[79vh] lg:h-[68.5vh]">
                {confetti && (
                    <Confetti
                    width={window.innerWidth / 1.05}
                    height={window.innerHeight / 1.05}
                    />
            )}
                
                <div className="my-1">
                    <p className="text-white text-center text-lg lg:text-xl font-medium">Congratulations on registering for <b className="text-gold uppercase"> Janet Adowei Scrabble Classics Tournament</b> Get ready to put your skills to the test and compete with the best of the best. Make your payment now and secure your spot in the tournament for a chance to win amazing prizes.</p>
                </div>

                <div className="flex justify-center items-center payment flex-col">
                    <button onClick={handleFlutterPaymentBtn} className="outline-none border-none"> <a>Proceed to Payment<i className=" ml-4 text-lg ri-arrow-right-line text-black"></i></a></button>
                </div>
            </div>
        </section>
    )
}

export default Payments