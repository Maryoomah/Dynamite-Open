import { FaInstagram, FaTwitter, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-green-900 text-white py-12 sm:py-14">
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-extrabold text-yellow-400">
              Dynamite Open
            </h3>
            <p className="mt-3 text-white/70 max-w-sm">
              Nigeria’s premier Scrabble tournament bringing players together to
              compete, connect and win big.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-yellow-400 mb-4">Quick Links</h4>
            <ul className="space-y-2 text-white/80">
              <li className="hover:text-yellow-300 transition">
                <Link to="/">Home</Link>
              </li>
              <li className="hover:text-yellow-300 transition">
                <Link to="/about">About</Link>
              </li>
              <li className="hover:text-yellow-300 transition">
                <Link to="/gallery">Gallery</Link>
              </li>
              <li className="hover:text-yellow-300 transition">
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-yellow-400 mb-4">Contact</h4>
            <p className="text-white/80 break-words">info@dynamiteopen.com</p>

            <div className="mt-4 flex gap-4 text-xl">
              <FaInstagram className="hover:text-yellow-300 cursor-pointer transition" />
              <FaTwitter className="hover:text-yellow-300 cursor-pointer transition" />
              <FaEnvelope className="hover:text-yellow-300 cursor-pointer transition" />
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-green-700 pt-5 text-center text-sm text-white/60">
          © {new Date().getFullYear()}
          <span className="text-yellow-400 font-semibold"> Dynamite Open </span>.
          All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
