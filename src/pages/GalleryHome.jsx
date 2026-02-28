import { Link } from "react-router-dom";
import Footer from "../components/footer";

function GalleryHome() {
  const editions = [
    {
      title: "Dynamite Open 4.0",
      slug: "4",
      thumbnail: `${import.meta.env.BASE_URL}gallery/4/1.jpeg`,
    },
    {
      title: "Dynamite Open 3.0",
      slug: "3",
      thumbnail: `${import.meta.env.BASE_URL}gallery/3/1.jpeg`,
    },
    {
      title: "Dynamite Open 2.0",
      slug: "2",
      thumbnail: `${import.meta.env.BASE_URL}gallery/2/1.jpeg`,
    },
    {
      title: "Dynamite Open 1.0",
      slug: "1",
      thumbnail: `${import.meta.env.BASE_URL}gallery/1/1.jpeg`,
    },
  ];

  return (
    <main>
      {/* HERO */}
      <section className="py-20 bg-green-900 text-white text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold">Gallery</h1>
        <p className="mt-4 text-yellow-400">
          Select an edition to view photos.
        </p>
      </section>

      {/* EDITION CARDS */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {editions.map((ed) => (
              <Link
                key={ed.slug}
                to={`/gallery/${ed.slug}`}
                className="group rounded-3xl border border-green-100 bg-green-50 overflow-hidden shadow-sm hover:shadow-xl transition"
              >
                <div className="p-6">
                  <p className="text-sm text-green-700 font-semibold">
                    Edition
                  </p>
                  <h2 className="mt-2 text-2xl font-extrabold text-green-900">
                    {ed.title}
                  </h2>

                  <p className="mt-3 text-green-800/70">
                    Click to view photos →
                  </p>

                  <div className="mt-6 inline-flex items-center justify-center rounded-xl bg-green-900 text-white px-4 py-2 text-sm font-semibold group-hover:bg-green-800 transition">
                    View gallery
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default GalleryHome;
