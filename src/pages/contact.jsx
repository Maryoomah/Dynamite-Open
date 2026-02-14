import { useState } from "react";
import { FaEnvelope, FaPhone, FaLocationArrow } from "react-icons/fa";
import Footer from "../components/footer";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Contact form:", formData);
    alert("Message sent successfully!");
  }

  return (
    <main>
      {/* HERO */}
      <section className="py-20 bg-green-900 text-white text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold">Contact Us</h1>
        <p className="mt-4 text-yellow-400">We'd love to hear from you.</p>
      </section>

      {/* CONTACT CONTENT */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12">
          {/* LEFT SIDE INFO */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-green-900">Get In Touch</h2>

            <p className="text-gray-600">
              For sponsorship, registration support, or general inquiries, reach
              out to us through the details below.
            </p>

            <div className="space-y-4 text-gray-700">
              <p className="flex items-center gap-3">
                <FaEnvelope className="text-green-700" />
                info@dynamiteopen.com
              </p>

              <p className="flex items-center gap-3">
                <FaPhone className="text-green-700" />
                +234 7033 7162 03
              </p>

              <p className="flex items-center gap-3">
                <FaLocationArrow className="text-green-700" />
                Lagos, Nigeria
              </p>
            </div>
          </div>

          {/* RIGHT SIDE FORM */}
          <div className="bg-green-50 p-8 rounded-2xl shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border p-3 rounded"
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border p-3 rounded"
                required
              />

              <textarea
                name="message"
                placeholder="Your Message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                className="w-full border p-3 rounded"
                required
              ></textarea>

              <button
                type="submit"
                className="w-full bg-green-800 text-yellow-400 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
      <section>
        <Footer />
      </section>
    </main>
  );
}
export default Contact;
