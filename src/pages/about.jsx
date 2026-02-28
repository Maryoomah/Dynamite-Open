import Metrics from "../components/metrics";
import Timeline from "../components/timeline";
import Footer from "../components/footer";

function About() {
  return (
    <main>
      {/* HERO */}
     <section
  className="bg-green-50 py-10 sm:py-14 lg:py-20"
  data-aos="fade-up"
>
  <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
    
    <h1 className="uppercase font-extrabold text-2xl sm:text-4xl lg:text-5xl text-green-800 leading-tight">
      About Dynamite <span className="text-yellow-500">Open</span>
    </h1>

    <p className="mt-4 text-green-900/80 font-medium text-sm sm:text-base lg:text-lg">
      A Scrabble tournament built on competition, community, and excellence.
    </p>

  </div>
</section>

      {/* TIMELINE */}
      <section className="bg-green-800" data-aos="fade-up">
        <Timeline />
      </section>

      {/* MISSION & VISION */}
      <section className="bg-white py-20" data-aos="fade-up">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12 lg:mb-14">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-green-900">
              Mission & Vision
            </h2>
            <p className="mt-3 text-green-900/70 max-w-2xl mx-auto">
              The foundation of Dynamite Open and the direction we are moving
              toward.
            </p>
          </div>

          <div className="grid gap-x-10 sm:gap-y-12 md:grid-cols-2">
            {/* Mission */}
            <div className="relative rounded-3xl bg-white hover:border border-green-400 p-8 sm:p-10 shadow-md transition duration-300 hover:shadow-2xl lg:hover:-translate-y-2">
              <div data-aos= "fade-up" className="absolute -top-4 left-4 sm:left-8 bg-green-700 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold shadow-md">
                🎯 Mission
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-green-900 mt-6 sm:mt-4">
                What We Stand For
              </h3>

              <p className="mt-4 text-green-900/80 leading-relaxed">
                Our mission is to grow Scrabble excellence by creating a
                competitive, welcoming platform where players of all levels can
                learn, connect, and compete.
              </p>
            </div>

            {/* Vision */}
            <div data-aos= "fade-up" className="relative rounded-3xl bg-white  hover:border border-green-400` p-8 sm:p-10 shadow-md transition duration-300 hover:shadow-2xl lg:hover:-translate-y-2">
              <div className="absolute -top-4 left-4 sm:left-8 bg-yellow-400 text-green-900 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold shadow-md">
                👁 Vision
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-green-900 mt-6 sm:mt-4">
                Where We Are Headed
              </h3>

              <p className="mt-4 text-green-900/80 leading-relaxed">
                Our vision is to become one of the most respected Scrabble
                tournament brands in Nigeria and beyond.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* METRICS */}
      <section data-aos="fade-up">
        <Metrics />
      </section>

      {/* FOOTER */}
      <Footer />
    </main>
  );
}

export default About;
