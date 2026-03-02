import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEnvelope, FaPhone, FaLocationArrow, FaCheckCircle, FaExclamationCircle, FaTimes, FaSpinner } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "../components/footer";
import SEO from "../components/SEO";

function Contact() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      name: "",
      email: "",
      message: "",
    }
  });

  const [sending, setSending] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onSubmit = async (data) => {
    setSending(true);
    try {
      const contactEmail = import.meta.env.VITE_CONTACT_EMAIL || "info@dynamiteopens.com";
      const response = await fetch(`https://formsubmit.co/ajax/${contactEmail}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        setSubmitStatus('success');
        reset();
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitStatus('error');
    } finally {
      setSending(false);
      setIsModalOpen(true);
    }
  };

  const StatusModal = () => (
    <AnimatePresence>
      {isModalOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
            className="absolute inset-0 bg-green-950/40 backdrop-blur-md"
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative bg-white w-full max-w-sm rounded-[2.5rem] shadow-2xl p-8 text-center overscroll-none"
          >
            <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
            >
                <FaTimes className="text-gray-400" />
            </button>

            <div className="flex flex-col items-center gap-6 mt-4">
               <div className={`h-20 w-20 rounded-3xl flex items-center justify-center text-4xl shadow-2xl ${submitStatus === 'success' ? 'bg-green-50 text-green-600 shadow-green-200' : 'bg-red-50 text-red-600 shadow-red-200'}`}>
                    {submitStatus === 'success' ? <FaCheckCircle /> : <FaExclamationCircle />}
               </div>
               
               <div className="space-y-2">
                 <h3 className="text-2xl font-black text-green-950 uppercase tracking-tight">
                    {submitStatus === 'success' ? "Message Sent!" : "System Error"}
                 </h3>
                 <p className="text-gray-500 font-medium text-sm leading-relaxed px-4">
                    {submitStatus === 'success' 
                        ? "Thank you for reaching out. Our team will review your message and get back to you shortly." 
                        : "Something went wrong while sending your message. Please try again later or contact us directly."}
                 </p>
               </div>

               <button
                onClick={() => setIsModalOpen(false)}
                className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all cursor-pointer ${submitStatus === 'success' ? 'bg-green-950 text-yellow-400 hover:bg-green-900' : 'bg-red-600 text-white hover:bg-red-700'}`}
               >
                {submitStatus === 'success' ? "Got it" : "Dismiss"}
               </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  const inputBase = "w-full bg-gray-50/50 border shadow-xs text-green-950 p-4 sm:p-5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-600/20 focus:bg-white transition-all font-medium";
  const normalBorder = "border-gray-100";
  const errorBorder = "border-red-400 focus:border-red-400 focus:ring-red-400/20";

  return (
    <main className="bg-white min-h-screen">
      <SEO title="Contact" description="Get in touch with the Dynamite Opens team for support, sponsorship, or inquiries." />
      
      <StatusModal />

      {/* HERO */}
      <section className="relative py-16 sm:py-24 bg-green-950 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-yellow-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none">
            Contact <span className="text-yellow-500">Us</span>
          </h1>
          <p className="mt-6 text-green-100/60 max-w-xl mx-auto text-base sm:text-lg font-medium leading-relaxed">
            Have questions about the tournament? We'd love to hear from you. 
            Reach out and our team will get back to you shortly.
          </p>
        </div>
      </section>

      {/* CONTACT CONTENT */}
      <section className="py-12 sm:py-24 -mt-8 sm:-mt-12 group">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-start">
            
            {/* LEFT SIDE INFO */}
            <div className="lg:col-span-2 space-y-8 sm:space-y-10">
              <div className="space-y-4">
                <h2 className="text-2xl sm:text-3xl font-black text-green-950 uppercase tracking-tight">
                  Get In <span className="text-yellow-600">Touch</span>
                </h2>
                <div className="h-1.5 w-16 bg-green-600 rounded-full" />
              </div>

              <p className="text-gray-500 text-base sm:text-lg font-medium leading-relaxed">
                For sponsorship, registration support, or general inquiries, reach
                out to us through the details below.
              </p>

              <div className="space-y-4 sm:space-y-6">
                {[
                  { icon: FaEnvelope, label: "Email", value: "info@dynamiteopens.com", color: "bg-green-100 text-green-700" },
                  { icon: FaPhone, label: "Phone", value: "+234 7033 7162 03", color: "bg-yellow-100 text-yellow-700" },
                  { icon: FaLocationArrow, label: "Location", value: "Lagos, Nigeria", color: "bg-orange-100 text-orange-700" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 sm:gap-5 p-4 rounded-3xl border border-gray-100 hover:border-green-100 hover:shadow-lg transition-all duration-300">
                    <div className={`p-3 sm:p-4 rounded-2xl ${item.color}`}>
                      <item.icon size={18} className="sm:size-5" />
                    </div>
                    <div>
                      <p className="text-[9px] sm:text-[10px] uppercase font-bold text-gray-400 tracking-widest">{item.label}</p>
                      <p className="text-green-950 font-black text-base sm:text-lg">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT SIDE FORM */}
            <div className="lg:col-span-3">
              <div className="relative p-1 rounded-4xl sm:rounded-[2.5rem] bg-linear-to-tr from-green-600/10 via-white to-yellow-400/10 shadow-2xl">
                <div className="bg-white/90 backdrop-blur-xl rounded-4xl sm:rounded-[2.3rem] p-6 sm:p-12 border border-white/60">
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 sm:space-y-8 text-left">
                    <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 text-left">
                      <div className="space-y-2">
                        <label className="text-[11px] font-black uppercase tracking-widest text-green-900/60 ml-2">Name</label>
                        <input
                          type="text"
                          {...register("name", { required: "Name is required" })}
                          placeholder="What's your name?"
                          className={`${inputBase} ${errors.name ? errorBorder : normalBorder}`}
                        />
                        {errors.name && <p className="ml-2 text-[10px] font-bold text-red-500 uppercase tracking-widest">{errors.name.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <label className="text-[11px] font-black uppercase tracking-widest text-green-900/60 ml-2">Email Address</label>
                        <input
                          type="email"
                          {...register("email", { 
                            required: "Email is required",
                            pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email" }
                          })}
                          placeholder="example@email.com"
                          className={`${inputBase} ${errors.email ? errorBorder : normalBorder}`}
                        />
                         {errors.email && <p className="ml-2 text-[10px] font-bold text-red-500 uppercase tracking-widest">{errors.email.message}</p>}
                      </div>
                    </div>

                    <div className="space-y-2">
                       <label className="text-[11px] font-black uppercase tracking-widest text-green-900/60 ml-2">Your Message</label>
                       <textarea
                        {...register("message", { required: "Message is required" })}
                        placeholder="Tell us something..."
                        rows="6"
                        className={`${inputBase} rounded-3xl resize-none ${errors.message ? errorBorder : normalBorder}`}
                      ></textarea>
                       {errors.message && <p className="ml-2 text-[10px] font-bold text-red-500 uppercase tracking-widest">{errors.message.message}</p>}
                    </div>

                    <button
                      type="submit"
                      disabled={sending}
                      className="w-full bg-green-900 text-yellow-400 py-5 sm:py-6 rounded-2xl font-black text-base sm:text-lg hover:bg-green-800 transition-all shadow-xl shadow-green-900/20 active:scale-[0.98] uppercase tracking-widest disabled:opacity-50 flex items-center justify-center gap-3 cursor-pointer"
                    >
                      {sending ? (
                        <>
                          <FaSpinner className="animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        "Send Message"
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default Contact;
