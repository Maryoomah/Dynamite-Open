import { FaCalendar, FaLocationArrow, FaTrophy } from "react-icons/fa";
import CountdownTimer from "../components/countdown";
import Button from "../components/buttons";
import Metrics from "../components/metrics";
import Sponsors from "../components/sponsors";
import Footer from "../components/footer";
import { Link } from "react-router-dom";

const categories = [
  {
    title: "Dynamite Open – Main Event",
    badge: "1199-0",
    fee: "₦15,000",
    notes: ["Scrabble rating bracket: 0–1199"],
    register: true,
    path: "/register/main-event",
  },
  {
    title: "Student / Female",
    fee: "₦10,000",
    notes: ["For students and female participants"],
    register: true,
    path: "/register/main-event",
  },
  {
    title: "Inter-Secondary School",
    fee: "Free (for now)",
    notes: [
      "Each school brings 4 students: 2 male + 2 female",
      "Spelling Bee: 1 male + 1 female",
      "Fee is not final yet",
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
      <section
        data-aos="fade-up"
        className="relative py-24 bg-linear-to-br from-amber-100 via-yellow-100 to-amber-200 overflow-hidden"
      >
        {/* Decorative background blur */}
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-green-300/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-400/30 rounded-full blur-3xl"></div>

        <div className="relative max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* LEFT SIDE */}
            <div>
              <p className="inline-block text-xs font-semibold tracking-widest uppercase text-green-800 bg-white px-4 py-1 rounded-full shadow-sm">
                Open Scrabble Tournament
              </p>

              <div className="mt-6 flex gap-6 items-baseline">
                <h1 className="uppercase font-extrabold text-5xl md:text-6xl text-green-900 leading-tight tracking-tight drop-shadow-md">
                  Dynamite
                </h1>

                <div className="leading-none">
                  <p className="uppercase font-extrabold text-4xl md:text-5xl text-yellow-500 drop-shadow-sm">
                    Open
                  </p>
                  <p className="uppercase font-extrabold text-4xl md:text-5xl text-yellow-500 drop-shadow-sm">
                    5.0
                  </p>
                </div>
              </div>

              <p className="mt-8 text-gray-700 text-lg max-w-md">
                Compete with top players across Nigeria in an exciting
                multi-division Scrabble championship.
              </p>

              {/* Prize Highlight Card */}
              <div className="mt-10 inline-flex items-center gap-4 bg-green-900 text-white px-6 py-4 rounded-2xl shadow-xl hover:scale-105 transition">
                <FaTrophy className="text-yellow-400 text-2xl" />
                <span className="text-2xl font-bold">
                  ₦1,000,000 Prize Pool
                </span>
              </div>
            </div>

            {/* RIGHT SIDE CARD */}
            <div className="md:justify-self-end w-full max-w-md">
              <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/40 space-y-6">
                <p className="flex items-center gap-3 text-gray-800 font-medium">
                  <FaCalendar className="text-green-700" />
                  16–18th of April, 2026
                </p>

                <p className="flex items-center gap-3 text-gray-800 font-medium">
                  <FaLocationArrow className="text-green-700" />
                  Lagos, Nigeria
                </p>

                <CountdownTimer />

                <div className="flex gap-4 pt-2">
                  <button className="bg-green-800 text-yellow-400 font-bold hover:bg-green-600 hover:text-white px-6 py-3 text-lg rounded-lg cursor-pointer"
                    onClick={() =>
                      document
                        .getElementById("tournament-breakdown")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                   
                  >Register Now</button>
                  <Button text="View Participants" secondary />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Tournament Breakdown */}
      <section className="py-16 bg-green-700" id="tournament-breakdown">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-amber-50">
            Tournament Breakdown
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-2 ">
            {categories.map((c) => (
              <div
                key={c.title}
                className="rounded-2xl border bg-white p-6 shadow-sm transition-all duration-300 hover:scale-105 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {c.title}
                    </h3>
                    {c.badge && (
                      <span className="inline-block mt-2 text-sm px-3 py-1 rounded-full bg-green-50 text-green-800">
                        Rating: {c.badge}
                      </span>
                    )}
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-gray-500">Entry Fee</p>
                    <p className="text-lg font-bold text-green-900">{c.fee}</p>
                  </div>
                </div>
                <ul className="mt-4 space-y-2 text-gray-700 list-disc pl-5">
                  {c.notes.map((n) => (
                    <li key={n}>{n}</li>
                  ))}
                </ul>
                {c.register && (
                  <Link
                    to={c.path}
                    className="mt-6 inline-block bg-green-600 text-amber-100 px-4 py-2 rounded-lg hover:bg-green-700"
                  >
                    Register
                  </Link>
                )}
              </div>
            ))}{" "}
          </div>

          {/* Optional disclaimer */}
          <p className="mt-6 text-sm text-amber-50">
            Note: Inter-Secondary School entry is currently free and may be
            updated later.
          </p>
        </div>
      </section>
      {/* metrics */}
      {/* Metrics */}
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
