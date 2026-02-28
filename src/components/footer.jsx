import { FaInstagram, FaTwitter, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-green-900 text-white ">
      <div className="max-w-6xl mx-auto px-6 py-14 grid gap-10 md:grid-cols-3 items-start">
        {" "}
        {/* Brand */}
        <div>
       <img
            src={`${import.meta.env.BASE_URL}images/logowhite.png`}
            alt="logo"
            className="w-20"
          />
          <p className="mt-3 text-white/70">
            Nigeria’s premier Scrabble tournament bringing players together to
            compete, connect and win big.
          </p>
        </div>
        {/* Links */}
        <div>
          <h4 className="m-0 font-semibold text-yellow-400 mb-4">
            Quick Links
          </h4>

          <ul className=" text-white/80">
            <li className="hover:text-yellow-300 cursor-pointer transition">
              <Link to="/" >
                Home
              </Link>
            </li>
            <li className="hover:text-yellow-300 cursor-pointer transition">
              <Link to="/about">About</Link>
            </li>
            <li className="hover:text-yellow-300 cursor-pointer transition">
              <Link to="/galleryhome">Gallery</Link>
            </li>
            <li className="hover:text-yellow-300 cursor-pointer transition">
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
        {/* Contact */}
        <div>
          <div className="flex flex-col gap-3">
            <h4 className="m-0 font-semibold text-yellow-400 mb-4">Contact</h4>

            <p className="text-white/80">info@dynamiteopen.com</p>

            <div className="flex gap-4 text-xl">
              <FaInstagram className="hover:text-yellow-300 cursor-pointer transition" />
              <FaTwitter className="hover:text-yellow-300 cursor-pointer transition" />
              <FaEnvelope className="hover:text-yellow-300 cursor-pointer transition" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-10 border-t border-green-700 py-5 text-center text-sm text-white/60">
        © {new Date().getFullYear()}
        <span className="text-yellow-400 font-semibold"> Dynamite Open </span>.
        All rights reserved.
      </div>
    </footer>
  );
}
export default Footer;
