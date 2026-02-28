import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  // lock scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
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
        <ul className="hidden md:flex items-center gap-8 font-semibold text-green-900">
          <li>
            <NavLink to="/" end>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          <li>
            <NavLink to="/galleryhome">Gallery</NavLink>
          </li>
          <li>
            <NavLink to="/contact">Contact</NavLink>
          </li>
        </ul>

        {/* Hamburger Icon */}
        <button
          className="md:hidden text-green-900 text-3xl cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-50  md:hidden">
          {/* backdrop */}
          <button
            className="absolute inset-0 bg-black/60"
            onClick={close}
            aria-label="Close menu"
          />
          {/* panel */}
          <div className="absolute inset-0 bg-white flex flex-col h-screen">
            {/* header */}
            <div className="flex items-center justify-between px-6 py-5 border-b">
              <img
                src={`${import.meta.env.BASE_URL}images/logo.png`}
                className="w-28"
                alt="logo"
              />
              <button
                onClick={close}
                className="text-3xl text-green-700"
                aria-label="Close menu"
              >
                {" "}
                ×
              </button>
            </div>
            {/* links */}
            <div className="flex-1 px-6 py-6">
              <ul className="flex flex-col">
                {[
                  { label: "Home", to: "/" },
                  { label: "About", to: "/about" },
                  { label: "Gallery", to: "/galleryhome" },
                  { label: "Contact", to: "/contact" },
                ].map((item) => (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      onClick={close}
                      className="block py-5 text-lg text-green-700"
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <NavLink
                  to="/"
                  end
                  onClick={close}
                  className="block w-full text-center
               bg-gradient-to-r from-green-900 to-green-700
               text-yellow-300 font-extrabold
               px-6 py-4 rounded-2xl
               shadow-lg
               active:scale-[0.99] hover:scale-[1.01]
               transition-transform"
                >
                  Register Now
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
