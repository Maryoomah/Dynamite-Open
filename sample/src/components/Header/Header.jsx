import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import classes from "./header.module.css";

const Header = () => {
    const router = useRouter();

    return(
        <header className={"animate_animated animate__fadeInDown w-full lg:max-w-[85%] lg:mx-auto flex justify-between items-center px-5 py-4 lg:px-10"}>
            <div className="relative">
                <Link href={"/"}>
                    <a className={`${classes.logo_text} text-xl md:text-2xl  font-bold`}>
                        {/* JAMSC{"'"}23 */}
                    
                     <Image width={100} height={90} src={require("../../assets/images/kssa_logo.png")} alt={"logo"} />
                    
                    </a> 
                </Link>
            </div>
            

            <div className="flex justify-around items-center gap-2 lg:gap-8">
                {/* <Link href={"/about-us"} > */}
                <a href={"https://scrabblekssa.wordpress.com/kssa-indian-open-2026"} target="_blank" rel="noopener noreferrer">
                    <div className="bg-white shadow-primary hover:bg-primary shadow-lg cursor-pointer flex justify-between items-center gap-2 py-2 px-5 rounded-tl-lg rounded-br-lg group">
                        <h3 className="group-hover:text-white hover:text-white text-center text-sm lg:text-lg text-primary font-semibold">About KSSA</h3>
                        <i className="ri-arrow-right-line group-hover:text-primary hover:text-primary text-primary text-lg lg:text-xl"></i>
                    </div>
                </a>  
            </div>
            
        </header>
    )
}

export default Header