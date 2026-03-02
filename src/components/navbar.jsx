import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  // lock scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => (document.body.style.overflow = "");
  }, [isOpen]);

  const close = () => setIsOpen(false);
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="flex justify-between items-center p-4 md:mx-28">
        {/* Logo */}
        <NavLink to="/" end>
          {" "}
          <img
            src={`${import.meta.env.BASE_URL}images/logo.png`}
            alt="logo"
            className="w-20"
          />
        </NavLink>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 font-semibold text-green-900 uppercase tracking-widest text-xs">
          <li>
            <NavLink to="/" end className={({ isActive }) => 
              isActive ? "text-yellow-600 border-b-2 border-yellow-600 pb-1" : "hover:text-yellow-600 transition-colors"
            }>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={({ isActive }) => 
              isActive ? "text-yellow-600 border-b-2 border-yellow-600 pb-1" : "hover:text-yellow-600 transition-colors"
            }>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/galleryhome" className={({ isActive }) => 
              isActive ? "text-yellow-600 border-b-2 border-yellow-600 pb-1" : "hover:text-yellow-600 transition-colors"
            }>
              Gallery
            </NavLink>
          </li>
          <li>
            <NavLink to="/participants" className={({ isActive }) => 
              isActive ? "text-yellow-600 border-b-2 border-yellow-600 pb-1" : "hover:text-yellow-600 transition-colors"
            }>
              Participants
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={({ isActive }) => 
              isActive ? "text-yellow-600 border-b-2 border-yellow-600 pb-1" : "hover:text-yellow-600 transition-colors"
            }>
              Contact
            </NavLink>
          </li>
        </ul>

        {/* Hamburger Icon */}
        <button
          className="md:hidden text-green-900 text-3xl cursor-pointer p-2 rounded-xl hover:bg-gray-100 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            {/* backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={close}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            {/* panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-white shadow-2xl flex flex-col h-screen overflow-y-auto"
            >
              {/* header */}
              <div className="flex items-center justify-between px-6 py-6 border-b border-gray-100">
                <img
                  src={`${import.meta.env.BASE_URL}images/logo.png`}
                  className="w-24"
                  alt="logo"
                />
                <button
                  onClick={close}
                  className="p-3 rounded-2xl bg-gray-50 text-green-700 hover:bg-gray-100 transition-colors"
                  aria-label="Close menu"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* links */}
              <div className="flex-1 px-8 py-10 space-y-2">
                {[
                  { label: "Home", to: "/" },
                  { label: "About", to: "/about" },
                  { label: "Gallery", to: "/galleryhome" },
                  { label: "Participants", to: "/participants" },
                  { label: "Contact", to: "/contact" },
                ].map((item, i) => (
                  <motion.div
                    key={item.to}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                  >
                    <NavLink
                      to={item.to}
                      onClick={close}
                      className={({ isActive }) => `
                        block py-4 text-xl font-black uppercase tracking-tighter transition-all
                        ${isActive ? "text-yellow-600 pl-4 border-l-4 border-yellow-600" : "text-green-900 hover:text-yellow-600"}
                      `}
                    >
                      {item.label}
                    </NavLink>
                  </motion.div>
                ))}
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="pt-10"
                >
                  <NavLink
                    to="/"
                    end
                    onClick={close}
                    className="block w-full text-center
                 bg-green-900
                 text-yellow-400 font-black
                 px-6 py-5 rounded-2xl
                 shadow-xl shadow-green-900/20
                 active:scale-[0.98]
                 transition-all uppercase tracking-widest"
                  >
                    Register Now
                  </NavLink>
                </motion.div>
              </div>

              <div className="p-8 border-t border-gray-100">
                <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em] text-center">
                  Dynamite Opens © 2026
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;
