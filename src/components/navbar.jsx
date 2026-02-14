import { NavLink } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">

        {/* Logo */}
        <img
          src={`${import.meta.env.BASE_URL}images/logo.png`}
          alt="logo"
          className="w-20"
        />

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 font-semibold text-green-900">
          <li><NavLink to="/" end>Home</NavLink></li>
          <li><NavLink to="/about">About</NavLink></li>
          <li><NavLink to="/gallery">Gallery</NavLink></li>
          <li><NavLink to="/contact">Contact</NavLink></li>
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
        <ul className="md:hidden bg-green-900 text-white flex flex-col items-center gap-6 py-6 text-lg font-semibold transition-all">
          <li onClick={() => setIsOpen(false)}>
            <NavLink to="/" end>Home</NavLink>
          </li>
          <li onClick={() => setIsOpen(false)}>
            <NavLink to="/about">About</NavLink>
          </li>
          <li onClick={() => setIsOpen(false)}>
            <NavLink to="/gallery">Gallery</NavLink>
          </li>
          <li onClick={() => setIsOpen(false)}>
            <NavLink to="/contact">Contact</NavLink>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
