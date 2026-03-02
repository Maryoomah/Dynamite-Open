import { Link } from "react-router-dom";
import Footer from "../components/footer";
import SEO from "../components/SEO";

function GalleryHome() {
  const editions = [
    {
      title: "Dynamite Opens 4.0",
      slug: "4",
      thumbnail: `${import.meta.env.BASE_URL}gallery/4/1.jpeg`,
    },
    {
      title: "Dynamite Opens 3.0",
      slug: "3",
      thumbnail: `${import.meta.env.BASE_URL}gallery/3/1.jpeg`,
    },
    {
      title: "Dynamite Opens 2.0",
      slug: "2",
      thumbnail: `${import.meta.env.BASE_URL}gallery/2/1.jpeg`,
    },
    {
      title: "Dynamite Opens 1.0",
      slug: "1",
      thumbnail: `${import.meta.env.BASE_URL}gallery/1/1.jpeg`,
    },
  ];

  return (
    <main className="bg-[#f8fafc] min-h-screen">
      <SEO title="Gallery" description="Explore photos from previous editions of the Dynamite Opens Scrabble Tournament." />
      
      {/* HERO */}
      <section className="relative py-24 bg-green-950 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
            <div className="absolute top-10 right-10 w-64 h-64 bg-yellow-500 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-white/5 border border-white/10 uppercase tracking-[0.2em] text-[10px] font-black text-yellow-500">
            Visual History
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter shadow-sm">
            The <span className="text-transparent bg-clip-text bg-linear-to-r from-yellow-500 to-amber-400">Gallery</span>
          </h1>
          <p className="mt-6 text-green-100/60 max-w-xl mx-auto text-lg font-medium leading-relaxed">
            Relive the moments of intensity, triumph, and brotherhood from our previous championships.
          </p>
        </div>
      </section>

      {/* EDITION CARDS */}
      <section className="py-24 -mt-12 relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {editions.map((ed) => (
              <Link
                key={ed.slug}
                to={`/gallery/${ed.slug}`}
                className="group relative rounded-4xl sm:rounded-[2.8rem] bg-white border border-gray-100 p-2 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className="relative overflow-hidden rounded-3xl sm:rounded-[2.5rem] aspect-square">
                    <img 
                        src={ed.thumbnail} 
                        alt={ed.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1593006517831-14b91ff78de1?q=80&w=2070&auto=format&fit=crop"; }}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-green-950/80 via-transparent to-transparent opacity-60" />
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[10px] text-green-700 font-black uppercase tracking-widest">
                        Edition {ed.slug}.0
                    </p>
                  </div>
                  <h2 className="text-2xl font-black text-green-900 group-hover:text-green-700 transition-colors">
                    {ed.title}
                  </h2>
                  <div className="mt-6 flex items-center gap-2 text-green-800 font-black text-xs uppercase tracking-widest group-hover:gap-4 transition-all">
                    Explore Photos
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
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
