import { useState, useEffect } from "react";

export default function CountdownTimer () {
    const targetDate = new Date("April 18,2026 00:00:00").getTime();
    const calculateTimeLeft = () => {
        const present = new Date().getTime();
        const difference = targetDate - present;

        if (difference <= 0) {
            return null;
        }
        return {
            days: Math.floor(difference/ (1000*60*60*24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000),

        };
    };

      const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  // Update the timer every second
  useEffect(() => {
    const timer = setInterval(() => {
      const updatedTime = calculateTimeLeft();
      setTimeLeft(updatedTime);

      if (!updatedTime) {
        clearInterval(timer); // Stop the countdown when time is up
      }
    }, 1000);

    return () => clearInterval(timer); // Cleanup on component unmount
  }, []);

  // Display if countdown is finished
  if (!timeLeft) {
    return <p>Game On</p>;
  }
  return (
  <section className="py-12 bg-green-900 text-white">
    <div className="max-w-5xl mx-auto px-6 text-center">

      <h3 className="text-3xl font-extrabold text-yellow-400 mb-8">
        Countdown to Dynamite Open
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">

        {[
          { label: "Days", value: timeLeft.days },
          { label: "Hours", value: timeLeft.hours },
          { label: "Mins", value: timeLeft.minutes },
          { label: "Secs", value: timeLeft.seconds },
        ].map((item) => (
          <div
            key={item.label}
            className="bg-white/10 backdrop-blur-md rounded-2xl py-6 shadow-lg border border-white/20"
          >
            <p className="text-4xl font-bold text-yellow-400">
              {item.value.toString().padStart(2, "0")}
            </p>
            <p className="mt-2 text-sm uppercase tracking-widest text-white/70">
              {item.label}
            </p>
          </div>
        ))}

      </div>
    </div>
  </section>
);

}