import Image from "next/image";
import Link from "next/link";

const Thanks = () => {
    return (
        <section className="flex justify-center items-center flex-col mt-20">
            <div className="relative lg:w-80 w-60 h-60 lg:h-80 flex justify-center items-center flex-col">
                <Image src={require("../../assets/images/check-animation.gif")} alt={"Check Animation"}/>
            </div>

            <div className="thanks flex justify-center items-center flex-col gap-3 p-3 rounded-sm">
                <h3 className="text-white font-bold text-center text-2xl">Thanks For Registering, See You at the Tournament!</h3>

                <Link href={"/"}>Go to Home</Link>
            </div>

            
        </section>
    )
}

export default Thanks