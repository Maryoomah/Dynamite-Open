import Link from  "next/link";

const ResultPool = () => {
    return (
        <section className="lg:max-w-[60%] lg:mx-auto flex justify-center items-center flex-col gap-6">
            <div className="my-20 lg:my-28 lg:p-6">
               {/* <h3 className="text-2xl lg:text-4xl text-secondary font-extrabold text-center"> Janet Adowei
                    Memorial Scrabble Classics (JAMSC) Result Submission</h3> */}
                    <h3 className="text-2xl lg:text-4xl text-white font-extrabold text-center"> MuSigma KSSA Result Submission Page</h3>
               <p className="text-white text-lg lg:text-xl text-center">Please fill out the result submission form below with your final scores in the completed round.</p>
                 <div className="flex justify-center items-center  register-btn my-4">
                    <Link href={"/resultpool/result-upload"}><a>Submit Your Score  <i className=" ml-4 text-sm lg:text-lg ri-arrow-right-line text-black"></i></a></Link>
                </div>
            </div>
        
        </section>
    )
}

export default ResultPool