import { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";
import Footer from "../components/footer";
import SEO from "../components/SEO";

function GalleryEdition() {
  const { edition } = useParams(); // "4", "3", etc.
  const [selectedIndex, setSelectedIndex] = useState(null);

  const editionTitles = {
    4: "Dynamite Opens 4.0",
    3: "Dynamite Opens 3.0",
    2: "Dynamite Opens 2.0",
    1: "Dynamite Opens 1.0",
  };

  const title = editionTitles[edition] || "Gallery";
  const totalImages = 20; // Assuming 20 images per edition
  const images = Array.from({ length: totalImages }, (_, i) => ({
    src: `${import.meta.env.BASE_URL}gallery/${edition}/${i + 1}.jpeg`,
    id: i + 1
  }));

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) => (prev + 1) % totalImages);
  }, [totalImages]);

  const handlePrev = useCallback(() => {
    setSelectedIndex((prev) => (prev - 1 + totalImages) % totalImages);
  }, [totalImages]);

  const handleKeyDown = useCallback((e) => {
    if (selectedIndex === null) return;
    if (e.key === "ArrowRight") handleNext();
    if (e.key === "ArrowLeft") handlePrev();
    if (e.key === "Escape") setSelectedIndex(null);
  }, [selectedIndex, handleNext, handlePrev]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedIndex, handleKeyDown]);

  return (
    <main className="bg-[#f8fafc] min-h-screen">
      <SEO title={title} description={`View photos from the ${title} edition of Dynamite Opens.`} />
      
      {/* HERO */}
      <section className="relative py-16 sm:py-24 bg-green-950 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Link
            to="/galleryhome"
            className="inline-flex items-center gap-2 text-yellow-500 hover:text-yellow-400 font-black text-[10px] uppercase tracking-widest mb-8 group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            Back to editions
          </Link>
          <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter shadow-sm">
            {title} <span className="text-transparent bg-clip-text bg-linear-to-r from-yellow-500 to-amber-400">Memories</span>
          </h1>
        </div>
      </section>

      {/* MASONRY PHOTOS */}
      <section className="py-12 sm:py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 sm:gap-6 space-y-4 sm:space-y-6">
            {images.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setSelectedIndex(i)}
                className="group relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer break-inside-avoid"
              >
                <img
                  src={img.src}
                  alt={`${title} ${img.id}`}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                  onError={(e) => { e.target.src = `https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=2070&auto=format&fit=crop`; }}
                />
                <div className="absolute inset-0 bg-green-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-yellow-500 flex items-center justify-center text-green-950 scale-0 group-hover:scale-100 transition-transform duration-500 delay-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                        </svg>
                    </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CINEMA LIGHTBOX */}
      <AnimatePresence>
        {selectedIndex !== null && (
            <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-10"
          >
            {/* Close */}
            <button
              onClick={() => setSelectedIndex(null)}
              className="absolute top-6 right-6 z-110 text-white/50 hover:text-white p-4 transition-colors"
            >
              <FaTimes size={32} />
            </button>

            {/* Navigation */}
            <button
              onClick={handlePrev}
              className="absolute left-4 sm:left-10 z-110 text-white/30 hover:text-white hover:bg-white/10 p-4 rounded-full transition-all"
            >
              <FaChevronLeft size={32} />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 sm:right-10 z-110 text-white/30 hover:text-white hover:bg-white/10 p-4 rounded-full transition-all"
            >
              <FaChevronRight size={32} />
            </button>

            {/* Image Container */}
            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.9, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9, x: -20 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative max-w-full max-h-full flex flex-col items-center"
            >
              <img
                src={images[selectedIndex].src}
                className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl border border-white/10"
                alt="Selected photo"
                onError={(e) => { e.target.src = `https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=2070&auto=format&fit=crop`; }}
              />
              <div className="mt-8 text-center space-y-2">
                <p className="text-yellow-500 font-black tracking-[0.2em] text-xs uppercase">
                  {title} • Image {selectedIndex + 1} of {totalImages}
                </p>
                <div className="h-1 w-12 bg-yellow-500/50 mx-auto rounded-full" />
              </div>
            </motion.div>

            {/* Thumbnails Strip (Optional but nice) */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex gap-2 p-2 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md">
                {images.slice(Math.max(0, selectedIndex - 2), Math.min(totalImages, selectedIndex + 3)).map((img, i) => {
                    const actualIdx = images.indexOf(img);
                    return (
                        <button
                            key={actualIdx}
                            onClick={() => setSelectedIndex(actualIdx)}
                            className={`h-12 w-12 rounded-lg overflow-hidden border-2 transition-all ${actualIdx === selectedIndex ? 'border-yellow-500 scale-110' : 'border-transparent opacity-50 hover:opacity-100'}`}
                        >
                            <img src={img.src} className="w-full h-full object-cover" />
                        </button>
                    )
                })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}

export default GalleryEdition;
