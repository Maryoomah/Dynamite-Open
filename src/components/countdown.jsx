import { useEffect, useMemo, useState } from "react";

export default function CountdownTimer() {
  const targetDate = useMemo(
    () => new Date("April 18, 2026 00:00:00").getTime(),
    []
  );

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

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      const updated = calculateTimeLeft();
      setTimeLeft(updated);
      if (!updated) clearInterval(timer);
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!timeLeft) {
    return (
      <p className="text-center font-semibold text-green-900">
        Game on 🎉
      </p>
    );
  }

  const blocks = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Mins", value: timeLeft.minutes },
    { label: "Secs", value: timeLeft.seconds },
  ];

  return (
    <div className="space-y-3">
      <p className="text-sm font-semibold text-green-900/80 text-center sm:text-left">
        Countdown
      </p>

      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        {blocks.map((b) => (
          <div
            key={b.label}
            className="rounded-2xl border border-green-100 bg-white/60 backdrop-blur px-2 py-3 sm:px-3 sm:py-4 text-center shadow-sm"
          >
            <p className="text-lg sm:text-2xl font-extrabold text-green-900 tabular-nums">
              {String(b.value).padStart(2, "0")}
            </p>
            <p className="mt-1 text-[10px] sm:text-xs uppercase tracking-wider text-green-900/60">
              {b.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
