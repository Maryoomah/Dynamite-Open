export default function Sponsors() {
  const sponsors = [
    "/images/sponsor1.png",
    "/images/sponsor2.png",
    "/images/sponsor3.png",
    "/images/sponsor4.png",
    "/images/sponsor5.png",
  ];

  return (
    <section className="py-16 bg-green-50">
      <div className="max-w-6xl mx-auto px-6 text-center">

        <h2 className="text-3xl font-bold text-green-900">
          Our Sponsors & Partners
        </h2>

    

        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 items-center">
          {sponsors.map((logo, i) => (
            <img
              key={i}
              src={logo}
              alt="Sponsor logo"
              className="mx-auto h-12 object-contain grayscale hover:grayscale-0 transition"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
