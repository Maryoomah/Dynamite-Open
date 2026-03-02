import { useEffect, useMemo, useState } from "react";

export default function CountdownTimer() {
  const targetDate = useMemo(
    () => new Date("April 16, 2026 09:00:00").getTime(), // Updated to start date
    []
  );

  const [timeLeft, setTimeLeft] = useState(() => {
    const now = Date.now();
    const diff = targetDate - now;
    if (diff <= 0) return null;
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((diff % (1000 * 60)) / 1000),
    };
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = Date.now();
      const diff = targetDate - now;

      if (diff <= 0) return null;

      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      };
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!timeLeft) {
    return (
      <div className="text-center p-4 bg-green-900/10 rounded-2xl border border-green-900/20 backdrop-blur-sm">
        <p className="font-bold text-green-900 text-xl animate-pulse">
          Tournament Live! 🎉
        </p>
      </div>
    );
  }

  const blocks = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="h-1 w-8 bg-green-600 rounded-full" />
        <p className="text-sm font-bold uppercase tracking-widest text-green-800/80">
          Tournament Countdown
        </p>
      </div>

      <div className="grid grid-cols-4 gap-3 sm:gap-4">
        {blocks.map((b) => (
          <div
            key={b.label}
            className="group relative transition-all duration-300 hover:scale-105"
          >
            <div className="absolute inset-0 bg-green-600/5 rounded-2xl blur-lg group-hover:bg-green-600/10 transition-colors" />
            <div className="relative flex flex-col items-center justify-center rounded-2xl border border-white/40 bg-white/40 backdrop-blur-md p-3 sm:p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)]">
              <span className="text-2xl sm:text-4xl font-black text-green-900 tracking-tighter tabular-nums drop-shadow-sm">
                {String(b.value).padStart(2, "0")}
              </span>
              <span className="mt-1 text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-green-800/50">
                {b.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
