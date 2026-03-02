import { FaCalendar, FaLocationArrow, FaTrophy } from "react-icons/fa";
import CountdownTimer from "../components/countdown";
import Button from "../components/buttons";
import Metrics from "../components/metrics";
import Sponsors from "../components/sponsors";
import Footer from "../components/footer";
import SEO from "../components/SEO";
import { Link } from "react-router-dom";

const categories = [
  {
    title: "Dynamite Opens – Main Event",
    badge: "1199-0",
    check: true,
    fee: "₦15,000",
    notes: ["Scrabble rating bracket: 0–1199"],
    register: true,
    path: "/register/main-event",
    rating: "",
  },
  {
    title: "Student / Female",
    badge: "1199-0",
    check: true,
    fee: "₦10,000",
    notes: ["For students and female participants"],
    register: true,
    path: "/register/main-event",
    rating: "",
  },
  {
    title: "Inter-Secondary School",
    fee: "Free",
    notes: [
      "Each school brings 4 students: 2 male + 2 female",
      "Spelling Bee: 1 male + 1 female",
      "Entry is free",
    ],
    register: true,
    path: "/register/school",
  },
  {
    title: "Celebrity Doubles",
    fee: "Free",
    notes: ["No registration required", "Selected personalities only"],
    register: false,
  },
];
function Home() {
  return (
    <main>
      <SEO title="Home" />
      <section
        data-aos="fade-up"
        className="relative min-h-[90vh] flex items-center bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-amber-50 via-yellow-50 to-orange-100 py-12 sm:py-16 lg:py-24 overflow-hidden"
      >
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-green-200/40 blur-3xl animate-pulse" />
          <div className="absolute top-1/2 -right-24 h-96 w-96 rounded-full bg-yellow-200/40 blur-3xl" />
          <div className="absolute -bottom-24 left-1/4 h-64 w-64 rounded-full bg-orange-200/30 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* LEFT CONTENT */}
            <div className="text-center lg:text-left space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-green-100 shadow-sm animate-bounce-slow">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <p className="text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase text-green-800">
                  Opens Scrabble Tournament 2026
                </p>
              </div>

              {/* Title Area */}
              <div className="space-y-2">
                <h1 className="uppercase font-black text-4xl sm:text-7xl lg:text-8xl text-green-950 leading-[0.9] tracking-tighter">
                  Dynamite <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-amber-500">
                    Opens 5.0
                  </span>
                </h1>
              </div>

              <p className="text-gray-600 text-lg sm:text-xl max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                The ultimate battle of words. A multi-division championship
                designed for beginners, intermediates, and rising stars to
                compete and grow.
              </p>

              {/* Prize Highlight */}
              <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-6 p-1 rounded-3xl sm:rounded-full bg-white/40 backdrop-blur-md border border-white/60 shadow-xl group transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
                <div className="flex items-center gap-4 px-6 py-4">
                  <div className="p-3 bg-green-900 rounded-2xl shadow-inner">
                    <FaTrophy className="text-yellow-400 text-2xl sm:text-3xl animate-pulse" />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] uppercase font-bold tracking-widest text-green-800/60 leading-none mb-1">
                      Total Prize Pool
                    </p>
                    <span className="text-2xl sm:text-3xl font-black text-green-950 leading-none">
                      ₦1,000,000
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT CARD - EVENT INFO */}
            <div className="w-full max-w-lg mx-auto lg:ml-auto lg:mr-0 group">
              <div className="relative p-1 rounded-4xl sm:rounded-[2.5rem] bg-gradient-to-tr from-green-600/20 via-white/40 to-yellow-400/20 shadow-2xl overflow-hidden transition-all duration-500 group-hover:shadow-[0_20px_50px_rgba(21,128,61,0.15)]">
                <div className="relative bg-white/90 backdrop-blur-xl rounded-4xl sm:rounded-[2.2rem] p-6 sm:p-10 border border-white/60 space-y-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-green-50/50 border border-green-100/50">
                      <div className="mt-1 p-2 bg-green-100 rounded-lg text-green-700">
                        <FaCalendar size={18} />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-bold text-green-800/50 tracking-wider">
                          Date
                        </p>
                        <p className="text-gray-900 font-bold">
                          16–18 April, 2026
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-yellow-50/50 border border-yellow-100/50">
                      <div className="mt-1 p-2 bg-yellow-100 rounded-lg text-yellow-700">
                        <FaLocationArrow size={18} />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-bold text-yellow-800/50 tracking-wider">
                          Location
                        </p>
                        <p className="text-gray-900 font-bold">
                          Agege, Lagos, Nigeria
                        </p>
                      </div>
                    </div>
                  </div>

                  <CountdownTimer />

                  {/* Buttons */}
                  <div className="flex flex-col gap-4 pt-4">
                    <button
                      className="w-full bg-green-900 text-yellow-400 font-black hover:bg-green-800 px-8 py-5 text-lg rounded-2xl shadow-lg transition-all active:scale-95 group/btn"
                      onClick={() =>
                        document
                          .getElementById("tournament-breakdown")
                          ?.scrollIntoView({ behavior: "smooth" })
                      }
                      type="button"
                    >
                      REGISTER FOR EVENT
                    </button>

                    <Link
                      to="/participants"
                      className="w-full bg-transparent border-2 border-green-900/10 text-green-900 font-bold hover:bg-green-50 px-8 py-4 text-md rounded-2xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      View Participants List
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tournament Breakdown */}
      <section
        className="py-24 bg-[#0a2e1f] relative overflow-hidden"
        id="tournament-breakdown"
      >
        {/* Background Decorative Blobs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-800/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-yellow-900/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-4 mb-20" data-aos="fade-up">
            <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
              TOURNAMENT <span className="text-yellow-500">BREAKDOWN</span>
            </h2>
            <div className="h-1.5 w-24 bg-linear-to-r from-yellow-500 to-amber-600 mx-auto rounded-full" />
            <p className="text-green-100/60 max-w-2xl mx-auto font-medium text-lg">
              Choose your category and join the most anticipated scrabble event
              of the year.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
            {categories.map((c, idx) => (
              <div
                key={c.title}
                data-aos="fade-up"
                data-aos-delay={idx * 100}
                className="group relative rounded-4xl sm:rounded-[2.5rem] bg-white/5 border border-white/10 p-1 transition-all duration-500 hover:scale-[1.02] hover:bg-white/10"
              >
                <div className="relative bg-[#0d3b28] rounded-4xl sm:rounded-[2.3rem] p-8 sm:p-10 h-full flex flex-col">
                  <div className="flex flex-col sm:flex-row items-start justify-between gap-6 mb-8">
                    <div className="space-y-3">
                      <h3 className="text-2xl sm:text-3xl font-black text-white group-hover:text-yellow-400 transition-colors">
                        {c.title}
                      </h3>
                      {c.badge && (
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
                          <span className="text-xs font-bold text-green-400 uppercase tracking-widest">
                            Rating Bracket: {c.badge}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="bg-white/5 p-4 rounded-3xl border border-white/10 text-center min-w-[120px]">
                      <p className="text-[10px] uppercase font-bold text-yellow-500/60 tracking-widest mb-1">
                        Entry Fee
                      </p>
                      <p className="text-2xl font-black text-white">{c.fee}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-8">
                    <ul className="space-y-4">
                      {c.notes.map((n, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-green-100/70 font-medium leading-relaxed"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-yellow-500 shrink-0 shadow-[0_0_10px_rgba(234,179,8,0.5)]" />
                          {n}
                        </li>
                      ))}
                    </ul>
                    {c.check && (
                      <a
                        href="/documents/dynamiteopens_eligibilitylist.pdf"
                        target="_blank" rel="non-opener noreferrer"
className="text-yellow-400 underline text-sm hover:text-white"                      >Check Rating</a>
                    )}
                  </div>

                  {c.register && (
                    <Link
                      to={c.path}s
                      className="mt-10 inline-flex items-center justify-center gap-3 bg-yellow-500 hover:bg-yellow-400 text-[#0a2e1f] font-black px-8 py-5 rounded-2xl transition-all active:scale-95 shadow-[0_10px_30px_rgba(234,179,8,0.2)]"
                    >
                      REGISTER NOW
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </Link>
                  )}
                  {!c.register && (
                    <div className="mt-10 py-5 text-center bg-white/5 rounded-2xl border border-white/5">
                      <p className="text-white/40 font-bold uppercase tracking-widest text-sm">
                        Invitational Only
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* metrics */}
      <section className=" bg-green-300">
        <Metrics />
      </section>
      <section>
        <Sponsors />
      </section>
      <section>
        <Footer />
      </section>
    </main>
  );
}

export default Home;
