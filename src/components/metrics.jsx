import { useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { FaTrophy, FaUsers, FaMoneyBillWave } from "react-icons/fa";

function StatCard({ icon: Icon, value, suffix = "", label, delay = 0 }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    const controls = animate(count, value, {
      duration: 1.4,
      ease: "easeOut",
      delay,
    });
    return controls.stop;
  }, [count, value, delay]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.55, ease: "easeOut", delay }}
      className="rounded-2xl bg-white border border-green-100 shadow-sm p-6 sm:p-8"
    >
      <div className="flex items-start gap-4">
        <div className="shrink-0 rounded-xl bg-green-50 p-3">
          <Icon className="text-2xl text-green-800" />
        </div>

        <div className="min-w-0">
          <div className="flex items-baseline gap-2">
            <motion.span className="text-4xl sm:text-5xl font-extrabold text-green-900 tracking-tight">
              {rounded}
            </motion.span>
            {!!suffix && (
              <span className="text-xl sm:text-2xl font-bold text-green-900">
                {suffix}
              </span>
            )}
          </div>

          <p className="mt-2 text-green-800/80 font-medium">{label}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Metrics() {
  return (
    <section className="py-16 sm:py-20 ">
      <div className="lg:max-w-6xl lg:mx-auto w-full px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-green-900">
            Our Record Over the Years
          </h2>
         
        </motion.div>

        {/* Responsive: 1 col (mobile), 2 col (tablet), 3 col (desktop) */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard
            icon={FaTrophy}
            value={4}
            label="Tournaments"
            delay={0.05}
          />
          <StatCard
            icon={FaUsers}
            value={100}
            suffix="+"
            label="Participants"
            delay={0.12}
          />
          <StatCard
            icon={FaMoneyBillWave}
            value={2000000}
            suffix="+"
            label="Prizes Won (₦)"
            delay={0.19}
          />
        </div>
      </div>
    </section>
  );
}
