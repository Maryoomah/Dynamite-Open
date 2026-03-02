import Metrics from "../components/metrics";
import Timeline from "../components/timeline";
import Footer from "../components/footer";
import SEO from "../components/SEO";

function About() {
  return (
    <main className="bg-white">
      <SEO title="About Us" description="Learn about the Dynamite Opens Scrabble Tournament, our mission, vision, and history." />
      
      {/* HERO */}
      <section
        className="relative bg-linear-to-b from-green-50 to-white py-20 lg:py-32 overflow-hidden"
        data-aos="fade-up"
      >
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
          <div className="absolute top-10 left-10 w-64 h-64 bg-green-200 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-yellow-200 rounded-full blur-3xl" />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-green-100 border border-green-200">
            <span className="text-xs font-bold text-green-800 uppercase tracking-widest">Our Story</span>
          </div>
          <h1 className="uppercase font-black text-4xl sm:text-6xl lg:text-7xl text-green-950 leading-tight tracking-tighter">
            About Dynamite <span className="text-transparent bg-clip-text bg-linear-to-r from-yellow-600 to-amber-500">Open</span>
          </h1>

          <p className="mt-8 text-gray-600 font-medium text-lg sm:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed">
            A Scrabble tournament built on competition, community, and excellence. Joining minds together since inception.
          </p>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="bg-[#0a2e1f] py-24 relative overflow-hidden" data-aos="fade-up">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        <Timeline />
      </section>

      {/* MISSION & VISION */}
      <section className="py-24 bg-white relative" data-aos="fade-up">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl sm:text-5xl font-black text-green-950 uppercase tracking-tight">
              Mission & <span className="text-yellow-600">Vision</span>
            </h2>
            <div className="mt-4 h-1.5 w-20 bg-green-600 mx-auto rounded-full" />
            <p className="mt-6 text-gray-500 max-w-2xl mx-auto font-medium text-lg">
              The foundation of Dynamite Opens and the strategic direction we are moving toward.
            </p>
          </div>

          <div className="grid gap-12 md:grid-cols-2 lg:px-12">
            {/* Mission Card */}
            <div className="group relative" data-aos="fade-right">
              <div className="absolute inset-0 bg-green-600/5 rounded-4xl sm:rounded-[2.5rem] blur-2xl group-hover:bg-green-600/10 transition-all" />
              <div className="relative rounded-4xl sm:rounded-[2.5rem] bg-white border border-green-100 p-8 sm:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.04)] transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl h-full">
                <div className="w-16 h-16 bg-green-900 rounded-2xl flex items-center justify-center mb-8 shadow-xl shadow-green-900/20">
                   <span className="text-3xl">🎯</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-green-950 mb-6">
                  What We Stand For
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg font-medium">
                  Our mission is to grow Scrabble excellence by creating a
                  competitive, welcoming platform where players of all levels can
                  learn, connect, and compete at the highest standards.
                </p>
              </div>
            </div>

            {/* Vision Card */}
            <div className="group relative" data-aos="fade-left">
              <div className="absolute inset-0 bg-yellow-600/5 rounded-4xl sm:rounded-[2.5rem] blur-2xl group-hover:bg-yellow-600/10 transition-all" />
              <div className="relative rounded-4xl sm:rounded-[2.5rem] bg-white border border-yellow-100 p-8 sm:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.04)] transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl h-full">
                <div className="w-16 h-16 bg-yellow-500 rounded-2xl flex items-center justify-center mb-8 shadow-xl shadow-yellow-500/20">
                   <span className="text-3xl">👁️</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-green-950 mb-6">
                  Where We Are Headed
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg font-medium">
                  Our vision is to become one of the most respected Scrabble
                  tournament brands in Nigeria and globally, fostering a culture
                  of mental agility and word mastery.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* METRICS */}
      <section className="bg-green-50" data-aos="fade-up">
        <Metrics />
      </section>

      {/* FOOTER */}
      <Footer />
    </main>
  );
}

export default About;
