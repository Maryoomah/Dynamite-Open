import classes from "./about.module.css";
import Image from "next/image";
import Link from "next/link";

const socialLinks = [
    {
        icon: "ri-facebook-fill",
        url: "/about-us",
    },

    {
        icon: "ri-instagram-fill",
        url: "/about-us",
    },

    {
        icon: "ri-twitter-x-fill",
        url: "/about-us",
    },

]

const About = () => {
    return (
        <section className="py-6 lg:py-10">
            <div className="lg:max-w-[80%] lg:mx-auto lg:p-0 p-5 container">
                <div className={`${classes.about_bg} flex flex-col shadow-md shadow-secondary justify-center items-center py-12 px-4 rounded-md gap-8`}>
                    <h4 className="text-white text-4xl lg:text-5xl font-semibold">About Us</h4>
                    <div className="flex justify-around items-center gap-2">
                        {
                            socialLinks.map((link, i) => (
                                <Link key={i} href={link.url}>
                                    <i  className={`${classes.icon_bg} ${link.icon} cursor-pointer rounded-full py-1.5 px-3 text-lg text-white`}></i>
                                </Link>
                            ))
                        }
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 py-32">

                    <div className="flex flex-col justify-start items-start gap-16">

                        <div data-aos="slide-right" data-aos-duration="1000" className="flex flex-col justify-start items-start gap-4">
                                <div className={`${classes.about_text_bg} rounded-full py-2 px-4 flex justify-center items-center flex-col`}>
                                    <h5 className={`text-secondary text-xl font-bold`}>About Us</h5>
                                </div>
                                <h4 className="text-white text-2xl lg:text-3xl font-semibold">Who We Are</h4>
                                <p className="text-sm font-normal text-white">The Janet Adowei Memorial Scrabble Classics (JAMSC) was birthed as an initiative in furtherance of the growth of scrabble in Nigeria by Engr. Ebikeme Adowei in honour of his late mother who departed this world on November 2, 2020.
                                </p>
                                <p className="text-sm font-normal text-white"> The first edition of JAMSC held in December 2020 as a one day invitational and since then, two more editions have held in 2021 and 2022 respectively in the same format. 
                                </p>
                                <p className="text-sm font-normal text-white"> The 2023 JAMSC edition was unique in the sense that it was organized in collaboration with the Nigeria Scrabble Federation (NSF) and Mindgames Incorporated (MGI). It was opened to global participation and spanned over two days. The 5th edition of JAMSC will be held in a similar fashion between November 16 and 17, 2024.
                                </p>
                                <p className="text-sm font-normal text-white"> Mouth watering prizes await the deserving wordsmiths across various categories as compared to previous editions. It promises to be a thrilling experience worth the while.
                                </p>
                        </div>

                        <div data-aos="slide-right" data-aos-duration="1000" className="flex flex-col justify-start items-start gap-4">
                            <div className={`${classes.about_text_bg} rounded-full py-2 px-4 flex justify-center items-center flex-col`}>
                                <h5 className={`text-secondary text-xl font-bold`}>Vision & Mission</h5>
                            </div>
                            <h4 className="text-white text-2xl lg:text-3xl font-semibold">What We Want to Achieve</h4>
                            <p className="text-sm font-normal text-white">The mission of JAMSC is to support the growth of scrabble in Nigeria and the vision is to raise worthy scrabble wordsmiths that are competitive globally.</p>
                    </div>

                    </div>


                   {/* The hero image */}
                   <div data-aos="slide-left" data-aos-duration="1000" className="flex justify-center items-center flex-col">
                      <Image src={require("../../assets/images/aboutm.jpeg")} alt="register"/>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default About