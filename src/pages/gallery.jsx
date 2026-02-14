import Footer from "../components/footer";
 function Gallery() {
  const editions = [
    { title: "Dynamite Open 1.0", folder: "1" },
    { title: "Dynamite Open 2.0", folder: "2" },
    { title: "Dynamite Open 3.0", folder: "3" },
    { title: "Dynamite Open 4.0", folder: "4" },
  ];

  return (
    <main>

      {/* HERO */}
      <section className="py-20 bg-green-900 text-white text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold">
          Gallery
        </h1>
        <p className="mt-4 text-yellow-400">
          Relive the moments from past editions of Dynamite Open.
        </p>
      </section>

      {/* EDITIONS */}
      {editions.map((edition, index) => (
        <section
          key={edition.folder}
          className={`py-16 ${
            index % 2 === 0 ? "bg-white" : "bg-green-50"
          }`} data-aos="zoom-in"
        >
          <div className="max-w-7xl mx-auto px-6">

            <h2 className="text-3xl font-bold text-green-900 mb-10 text-center">
              {edition.title}
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
              {Array.from({ length: 20 }, (_, i) => (
                <div
                  key={i}
                  className="overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition duration-300"
                >
                  <img
                    src={`gallery/${edition.folder}/${i + 1}.jpeg`}
                    alt={`${edition.title} ${i + 1}`}
                    className="w-full h-56 object-cover hover:scale-105 transition duration-300"
                  />
                </div>
              ))}
            </div>

          </div>
        </section>
      ))}
      <section><Footer/></section>

    </main>
  );
}
export default Gallery;