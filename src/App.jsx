import Navbar from "./components/navbar";
import "./App.css";

import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/about";
import MainEventForm from "./pages/register";
import SchoolRegistration from "./pages/schoolRegistration";
import Gallery from "./pages/gallery";
import Contact from "./pages/contact";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
console.log("APP RENDERED");
function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // animation speed (ms)
      once: true, // animate only once (good UX)
      offset: 100, // start animation a bit earlier
    });
  }, []);
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/register/main-event" element={<MainEventForm />} />
        <Route path="/register/school" element={<SchoolRegistration />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
}

export default App;
