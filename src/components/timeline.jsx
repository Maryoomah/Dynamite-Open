import { motion } from "framer-motion";
import { FaFlagCheckered, FaUsers, FaSchool, FaTrophy } from "react-icons/fa";

const items = [
  {
    year: "2022",
    title: "The First Spark",
    text: "Dynamite Opens launched its first Scrabble tournament with a focus on fair play and community.",
    icon: FaFlagCheckered,
  },
  {
    year: "2023",
    title: "Growth & Community",
    text: "Participation grew as more players joined across categories and the event gained recognition.",
    icon: FaUsers,
  },
  {
    year: "2024",
    title: "Schools & Inclusion",
    text: "Student and school-focused activities were introduced to support youth involvement and inclusion.",
    icon: FaSchool,
  },
  {
    year: "2025",
    title: "Bigger Wins",
    text: "Prizes and partnerships expanded, delivering a stronger tournament experience for everyone.",
    icon: FaTrophy,
  },
];

export default function Timeline() {
  return (
    <div className="py-12 sm:py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-green-50">
            Our Journey
          </h2>
          <p className="mt-3 text-green-50/90 max-w-2xl mx-auto">
            A quick timeline of how Dynamite Opens has grown over the years.
          </p>
        </motion.div>

{/* MOBILE*/}
<div className="mt-12 space-y-6 md:hidden px-4">
  {items.map((item, idx) => {
    const Icon = item.icon;

    return (
      <motion.div
        key={item.year}
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: idx * 0.05 }}
        className="rounded-2xl bg-white p-5 shadow-md"
      >
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-xl bg-green-50 border border-green-200 flex items-center justify-center shrink-0">
            <Icon className="text-green-800 text-lg" />
          </div>

          <div>
            <p className="text-xs font-bold text-green-700 tracking-wide">
              {item.year}
            </p>

            <h3 className="mt-1 text-base font-bold text-green-900 leading-snug">
              {item.title}
            </h3>
          </div>
        </div>

        <p className="mt-3 text-sm text-green-900/70 leading-relaxed">
          {item.text}
        </p>
      </motion.div>
    );
  })}
</div>

        {/* TABLET+ */}
        <div className="mt-12 hidden md:block">
          <div className="relative">
            <div className="absolute left-0 right-0 top-7 h-px bg-green-100/80" />

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {items.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{
                      duration: 0.55,
                      ease: "easeOut",
                      delay: idx * 0.08,
                    }}
                    className="relative"
                  >
                    <div className="mx-auto relative top-5 h-4 w-4 rounded-full bg-yellow-400 ring-4 ring-green-800" />

                    <div className="mx-auto mt-9 h-12 w-12 rounded-2xl bg-green-50 border border-green-100 flex items-center justify-center shadow-sm">
                      <Icon className="text-2xl text-green-800" />
                    </div>

                    <div className="mt-5 rounded-2xl border border-green-100 bg-white p-6 shadow-sm">
                      <p className="text-sm font-bold text-green-800">
                        {item.year}
                      </p>
                      <h3 className="mt-1 text-lg font-bold text-green-900">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-green-900/70 leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
