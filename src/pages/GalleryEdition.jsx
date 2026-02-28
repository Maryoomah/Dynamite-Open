import { useParams, Link } from "react-router-dom";
import Footer from "../components/footer";

function GalleryEdition() {
  const { edition } = useParams(); // "4", "3", etc.

  const editionTitles = {
    4: "Dynamite Open 4.0",
    3: "Dynamite Open 3.0",
    2: "Dynamite Open 2.0",
    1: "Dynamite Open 1.0",
  };

  const title = editionTitles[edition] || "Gallery";

  return (
    <main>
      {/* HERO */}
      <section className="py-16 bg-green-900 text-white text-center">
        <h1 className="text-3xl md:text-5xl font-extrabold">{title}</h1>

        <div className="mt-6">
          <Link
            to="/galleryhome"
            className="inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300 font-semibold"
          >
            ← Back to editions
          </Link>
        </div>
      </section>

      {/* PHOTOS */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {Array.from({ length: 20 }, (_, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition duration-300"
              >
                <img
                  src={`${import.meta.env.BASE_URL}gallery/${edition}/${i + 1}.jpeg`}
                  alt={`${title} ${i + 1}`}
                  className="w-full h-56 object-cover hover:scale-105 transition duration-300"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default GalleryEdition;
