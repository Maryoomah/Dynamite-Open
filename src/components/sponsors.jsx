export default function Sponsors() {
  const sponsors = [
    "images/fp.png",
    "images/LSF.png",
    "images/mgi.png",
    "images/vagas.png",
    "images/web.png",
    "images/BOAS.png",
    "images/nsf.png",
  ];

  return (
    <section className="bg-green-50 py-12 sm:py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-green-900">
          Our Sponsors & Partners
        </h2>

        <p className="mt-3 text-green-900/70 max-w-2xl mx-auto">
          Proudly supported by organizations that believe in excellence,
          competition, and community.
        </p>

        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-8 sm:gap-10 items-center">
          {sponsors.map((logo, i) => (
            <div key={i} className="flex justify-center">
              <img
                src={logo}
                alt="Sponsor logo"
                className="h-12 sm:h-14 lg:h-16 object-contain grayscale opacity-80 hover:opacity-100 hover:grayscale-0 transition duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
