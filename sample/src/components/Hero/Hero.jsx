import classes from "./hero.module.css";
import styles from "./hero.module.css";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const Hero = () => {
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const targetDate = new Date("2026-01-23");
      const diff = targetDate.getTime() - now.getTime();

      if (diff <= 0) {
        // D-Day has arrived
        clearInterval(interval);
        setCountdown("D-Day of the Tournaments!");
      } else {
        // Calculate remaining days, hours, minutes, and seconds
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        setCountdown(`${days}D:${hours}H:${minutes}M:${seconds}S`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 lg:py-10">
      <div className="lg:max-w-[80%] lg:mx-auto container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* The hero text */}
          <div className="flex justify-start items-center gap-10">
            {/* <div className={`${classes.neon_glow}`}></div> */}

            <div className="flex justify-start items-start flex-col gap-2">
              

              <h3 className="animate__animated animate__fadeInRight text-white text-3xl lg:text-4xl font-bold">
                Mu Sigma KSSA Indian Open 2026
              </h3>
              <p className="animate__animated animate__fadeInRight text-sm font-normal text-ash">
                Format: 33 games, SAI and WESPA Rated, Rules: CSW24
              </p>

              <div className="flex flex-col justify-start items-start gap-1 my-5">
                <div className="flex justify-start items-center gap-1">
                  <i className="text-secondary text-xl ri-map-pin-fill"></i>
                  <h5 className="text-sm text-white">MuSigma Campus, Bengaluru, India.</h5>
                </div>
                <div className="flex justify-start items-center gap-1">
                  <i className="text-secondary text-xl ri-calendar-event-fill"></i>
                  <h5 className="text-sm text-white">Jan. 26th - 28th, 2026 </h5>
                </div>
                <div className="flex justify-start items-center gap-1">
                  <i className="text-secondary text-xl ri-timer-fill"></i>
                  <p className="bg p-2 text-lg text-deep text-[rgba(245,60,30,1)] font-semibold">
                    {" "}
                    Countdown to the Event: {countdown}
                  </p>
                </div>
                {" "}
                <div
                  className={`${styles.border_holder} font-bold font-inter flex justify-center items-center register-btn p-2`}
                >
                  <i className="text-secondary text-xl ri-links-line"></i>
                  <p className="bg p-2 text-lg text-deep text-white font-semibold">
                    {" "}
                    Tournament Rosters -{" "}
                    <Link
                      href={
                        "https://centrestar.co.uk/tsh/testkssa/html/rosters.html"
                      }
                    >
                      <a className=" mx-3 text-sm lg:text-lg text-blue"> Rosters </a>
                    </Link>
                  </p>
                </div>
                <div
                  className={`${styles.border_holder} font-bold font-inter flex justify-center items-center register-btn p-2`}
                >
                  <i className="text-secondary text-xl ri-links-fill"></i>
                  <p className="bg p-2 text-lg text-deep text-white font-semibold">
                    {" "}
                    Tournament Link -{" "}
                    <Link
                      href={
                        "https://centrestar.co.uk/tsh/testkssa/html/index.html"
                      }
                    >
                      <a className=" mx-3 text-sm lg:text-lg"> Index Page </a>
                    </Link>
                  </p>
                </div>
                <div
                  className={`${styles.border_holder} font-bold font-inter flex justify-center items-center register-btn p-2`}
                >
                  <i className="text-secondary text-xl ri-pages-fill"></i>
                  <p className="bg p-2 text-lg text-deep text-white font-semibold">
                    {" "}
                    Result Submission Page -{" "}
                    <Link href={"/resultpool"}>
                      <a className=" mx-3 text-sm lg:text-lg"> Result Page </a>
                    </Link>
                  </p>
                </div>
              </div>

              {/* <Link href={"/registration"} >
                                <div className="bg-secondary shadow-secondary hover:bg-white shadow-lg cursor-pointer flex justify-between items-center gap-2 py-2 px-5 rounded-tl-lg rounded-br-lg group">
                                    <h3 className="group-hover:text-primary hover:text-primary text-center text-sm lg:text-lg text-primary font-semibold">Register Now</h3>
                                    <i className="ri-arrow-right-line group-hover:text-primary hover:text-primary text-primary text-lg lg:text-xl"></i>
                                </div>
                            </Link>                             */}
            </div>
          </div>

          {/* The hero image */}
          <div
            data-aos="slide-left"
            data-aos-duration="1000"
            className="flex justify-end items-end flex-col"
          >
            <Image
              src={require("../../assets/images/awards.jpeg")}
              alt="register"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
