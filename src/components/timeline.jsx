import { motion } from "framer-motion";
import { FaFlagCheckered, FaUsers, FaSchool, FaTrophy } from "react-icons/fa";

const items = [
  {
    year: "2022",
    title: "The First Spark",
    text: "Dynamite Open launched its first Scrabble tournament with a focus on fair play and community.",
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
    <section className="py-16 bg-green-800">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-green-50">
            Our Journey
          </h2>
          <p className="mt-3 text-green-50 max-w-2xl mx-auto">
            A quick timeline of how Dynamite Open has grown over the years.
          </p>
        </motion.div>

        {/* MOBILE: vertical timeline */}
        <div className="mt-12 space-y-8 lg:hidden">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: idx * 0.05 }}
                className="relative pl-10"
              >
                {/* line */}
                <div className="absolute left-4 top-0 bottom-0 w-0.75 bg-green-100 rounded-full" />

                {/* dot */}
                <div className="absolute left-1.75 top-1 w-5 h-5 rounded-full bg-yellow-400 ring-4 ring-white" />

                {/* icon bubble */}
                <div className="absolute left-0 top-8 w-9 h-9 rounded-xl bg-green-50 border border-green-100 flex items-center justify-center">
                  <Icon className="text-green-800" />
                </div>

                <div className="rounded-2xl border border-green-100 bg-white p-6 shadow-sm">
                  <p className="text-sm font-bold text-green-800">{item.year}</p>
                  <h3 className="mt-1 text-xl font-bold text-green-900">
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

        {/* DESKTOP: horizontal timeline */}
        <div className="mt-14 hidden lg:block">
          {/* top line */}
          <div className="relative">
            <div className="absolute left-0 right-0 top-6 h-0.75 bg-green-100 rounded-full" />

            <div className="grid grid-cols-4 gap-6">
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
                    {/* dot on the line */}
                    <div className="mx-auto w-5 h-5 rounded-full bg-yellow-400 ring-4 ring-white relative top-3" />

                    {/* icon bubble */}
                    <div className="mx-auto mt-6 w-12 h-12 rounded-2xl bg-green-50 border border-green-100 flex items-center justify-center shadow-sm">
                      <Icon className="text-2xl text-green-800" />
                    </div>

                    {/* card */}
                    <div className="mt-5 rounded-2xl border border-green-100 bg-white p-6 shadow-sm">
                      <p className="text-sm font-bold text-green-800">{item.year}</p>
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
    </section>
  );
}
