import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="flex justify-between p-4">
      <img src="images/logo.png" alt="logo" className="w-20" />

      <ul className="flex items-center gap-6">

        <li>
          <NavLink to="/" end>Home</NavLink>
        </li>

        <li>
          <NavLink to="/about">About</NavLink>
        </li>

        <li>
          <NavLink to="/gallery">Gallery</NavLink>
        </li>

        <li>
          <NavLink to="/contact">Contact</NavLink>
        </li>

      </ul>
    </nav>
  );
}

export default Navbar;
