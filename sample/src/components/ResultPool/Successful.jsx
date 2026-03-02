import Link from  "next/link";
import Confetti from "react-confetti";
import { useState, useEffect } from "react";
const Successful = () => {
    const [confetti, setConfetti] = useState(false);
    useEffect(() => {
        const timeoutId = setTimeout(() => {
        setConfetti(true);
        }, 1000);

        return () => {
        clearTimeout(timeoutId);
        };
    }, []);

    return (
        <section className="lg:max-w-[60%] lg:mx-auto flex justify-center items-center flex-col gap-6">
            {confetti && (
                <Confetti
                    width={window.innerWidth / 1.05}
                    height={window.innerHeight / 1.05}
                />
            )}
                
            <div className="my-20 lg:my-28 lg:p-6 flex flex-col justify-center items-center gap-6">
               <h3 className="text-2xl lg:text-4xl text-primary font-extrabold text-center">Result Submitted Successfully!</h3>
               <p className="text-white text-lg lg:text-xl text-center">Your results have been submitted successfully. Kindly visit the tournament link (button) below to see your next pairing and standings.</p>
                 <div className="flex justify-center items-center register-btn">
                    <Link href={"https://centrestar.co.uk/tsh/testkssa/html/index.html"}><a>Tournament Link <i className=" ml-4 text-sm lg:text-lg ri-arrow-right-fill text-black"></i></a></Link>
                </div>          
                {/* <div className="flex justify-center items-center register-btn">
                    <Link href={"#"}><a>Tournament Link (Opens and Veterans) <i className=" ml-4 text-sm lg:text-lg ri-arrow-right-fill text-black"></i></a></Link>
                </div> */}
            </div>
        
        </section>
    )
}

export default Successful