import { useEffect, useMemo } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { FaTrophy, FaUsers, FaMoneyBillWave } from "react-icons/fa";

function formatNumber(n) {
  return new Intl.NumberFormat("en-NG").format(n);
}

function StatCard({ icon: Icon, value, suffix = "", label, delay = 0 }) {
  const count = useMotionValue(0);

  const formatted = useTransform(count, (latest) =>
    formatNumber(Math.round(latest))
  );

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
      className="rounded-3xl bg-white border border-green-100 shadow-sm p-5 sm:p-7"
    >
      <div className="flex items-center gap-4">
        <div className="shrink-0 rounded-2xl bg-green-50 p-3">
          <Icon className="text-2xl text-green-800" />
        </div>

        <div className="min-w-0">
          <div className="flex items-baseline gap-2">
            <motion.span className="text-3xl sm:text-5xl font-extrabold text-green-900 tracking-tight tabular-nums">
              {formatted}
            </motion.span>

            {!!suffix && (
              <span className="text-lg sm:text-2xl font-bold text-green-900">
                {suffix}
              </span>
            )}
          </div>

          <p className="mt-1 text-green-800/80 font-medium">{label}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Metrics() {
  return (
    <section className="bg-green-50 py-12 sm:py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-green-900">
            Our Record Over the Years
          </h2>
          <p className="mt-3 text-green-900/70 max-w-2xl mx-auto">
            A snapshot of our growth — tournaments hosted, players reached, and prizes delivered.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard icon={FaTrophy} value={4} label="Tournaments" delay={0.05} />
          <StatCard icon={FaUsers} value={100} suffix="+" label="Participants" delay={0.12} />
          <StatCard icon={FaMoneyBillWave} value={2000000} suffix="+" label="Prizes Won (₦)" delay={0.19} />
        </div>
      </div>
    </section>
  );
}
