import Metrics from "../components/metrics";
import Timeline from "../components/timeline";
import Footer from "../components/footer";

function About() {
  return (
    <main>
      <section className="p-16 sm:p-20 bg-green-50" data-aos="fade-up" >
        <div className="mt-5">
          <h1 className="uppercase font-extrabold text-4xl md:text-6xl  text-green-800">
            About Dynamite  
            <span className=" text-yellow-500">  Open
            </span>
          </h1>
          <p className="mt-6 text-gray-700 font-bold ">
            A Scrabble tournament built on competition, community, and
            excellence.
          </p>
        </div>
      </section>
<section className="bg-green-800 mb-14">
<Timeline/>
</section>
<section className=" bg-green-50">
  <div className=" w-full lg:max-w-6xl lg:mx-auto px-4 sm:px-6">

    <div className="text-center mb-14">
      <h2 className="text-4xl font-extrabold text-green-900">
        Mission & Vision
      </h2>
      <p className="mt-3 text-green-900/70 max-w-2xl mx-auto">
        The foundation of Dynamite Open and the direction we are moving toward.
      </p>
    </div>

    <div className="grid gap-8 md:grid-cols-2">

      {/* Mission */}
      <div className="relative rounded-3xl bg-white p-10 shadow-lg border border-green-100 transition hover:-translate-y-2 hover:shadow-2xl">

        {/* Icon badge */}
        <div className="absolute -top-6 left-8 bg-green-700 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md">
          🎯 Mission
        </div>

        <h3 className="text-2xl font-bold text-green-900 mt-4">
          What We Stand For
        </h3>

        <p className="mt-4 text-green-900/80 leading-relaxed">
          Our mission is to grow Scrabble excellence by creating a competitive,
          welcoming platform where players of all levels can learn, connect,
          and compete. We’re committed to fair play, strong organization,
          and memorable experiences that celebrate language, strategy, and community.
        </p>
      </div>

      {/* Vision */}
      <div className="relative rounded-3xl bg-white p-7 sm:p-10 shadow-lg border border-green-100 transition hover:-translate-y-2 hover:shadow-2xl">

        {/* Icon badge */}
        <div className="absolute -top-6 left-8 bg-yellow-400 text-green-900 px-4 py-2 rounded-full text-sm font-semibold shadow-md">
          👁 Vision
        </div>

        <h3 className="text-2xl font-bold text-green-900 mt-4">
          Where We Are Headed
        </h3>

        <p className="mt-4 text-green-900/80 leading-relaxed">
          Our vision is to become one of the most respected Scrabble tournament
          brands in Nigeria and beyond, known for quality competition, inclusive
          participation, and lasting impact. We aim to inspire the next generation
          of champions and make Scrabble more visible, accessible, and exciting.
        </p>
      </div>

    </div>
  </div>
</section>

      <section>
        <Metrics/>
      </section>
         <section>
        <Footer/>
      </section>
    </main>
  );
}

export default About;
