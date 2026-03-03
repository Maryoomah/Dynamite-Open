import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaTimes, FaSave, FaUser, FaEnvelope, FaPhone, FaTrophy, FaSchool, FaMapMarkerAlt, FaUserTie } from "react-icons/fa";
import { participantService } from "../services/participantService";

export default function AdminParticipantModal({ isOpen, onClose, onSave, participant }) {
  const [regType, setRegType] = useState("Main Event");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm();
  
  const selectedCategory = watch("category");
  const selectedSubCategory = watch("subCategory");

  useEffect(() => {
    if (participant) {
      setRegType(participant.category === "School Registration" ? "School Registration" : "Main Event");
      reset(participant);
    } else {
      setRegType("Main Event");
      reset({
        fullName: "",
        surname: "",
        email: "",
        phone: "",
        category: "Main Event",
        subCategory: "",
        rating: 0,
        paymentStatus: "Pending",
        schoolName: "",
        contactPerson: "",
        schoolAddress: "",
      });
    }
  }, [participant, reset, isOpen]);

  // Auto-calculate amount for Main Event
  useEffect(() => {
    if (regType === "Main Event" && selectedCategory && selectedSubCategory) {
      const fee = participantService.getFee(selectedCategory, selectedSubCategory);
      setValue("amount", fee);
    } else if (regType === "School Registration") {
      setValue("amount", 0);
    }
  }, [selectedCategory, selectedSubCategory, regType, setValue]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-green-950/40 backdrop-blur-md"
        />
        
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="relative bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden overflow-y-auto max-h-[90vh]"
        >
          {/* Header */}
          <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <div className="space-y-1">
                <h3 className="text-2xl font-black text-green-950 uppercase tracking-tight">
                {participant ? "Edit Record" : "New Entry"}
                </h3>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{regType}</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer">
              <FaTimes className="text-gray-400" />
            </button>
          </div>

          <form onSubmit={handleSubmit(
            async (data) => {
              setIsSubmitting(true);
              try {
                const sanitizedData = {
                  ...data,
                  category: regType === "School Registration" ? "School Registration" : data.category,
                  rating: isNaN(data.rating) || data.rating === "" ? 0 : Number(data.rating),
                  amount: isNaN(data.amount) || data.amount === "" ? 0 : Number(data.amount)
                };
                await onSave(sanitizedData);
              } finally {
                setIsSubmitting(false);
              }
            },
            (errs) => console.error("Validation failed:", errs)
          )} className="p-8 space-y-6">
            {Object.keys(errors).length > 0 && (
              <div className="bg-red-50 text-red-500 p-4 rounded-xl text-xs font-bold">
                Please fill in all required fields correctly. (Missing: {Object.keys(errors).join(', ')})
              </div>
            )}
            {!participant && (
                <div className="flex p-1 bg-gray-100 rounded-2xl">
                    {["Main Event", "School Registration"].map((t) => (
                        <button
                            key={t}
                            type="button"
                            onClick={() => {
                              setRegType(t);
                              reset();
                            }}
                            className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all cursor-pointer ${regType === t ? 'bg-white text-green-950 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            {t}
                        </button>
                    ))}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {regType === "Main Event" ? (
                <>
                  {/* MAIN EVENT FIELDS */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Surname</label>
                    <div className="relative">
                      <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                      <input
                        {...register("surname", { required: regType === "Main Event" })}
                        placeholder="Last name"
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-600/5 focus:bg-white transition-all font-bold text-green-950"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">First Name</label>
                    <div className="relative">
                      <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                      <input
                        {...register("fullName", { required: regType === "Main Event" })}
                        placeholder="First name"
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-600/5 focus:bg-white transition-all font-bold text-green-950"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">NSF Rating</label>
                    <div className="relative">
                      <FaTrophy className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                      <input
                        type="number"
                        {...register("rating", { valueAsNumber: true })}
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-600/5 focus:bg-white transition-all font-bold text-green-950"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Sub-Category</label>
                    <select
                      {...register("subCategory")}
                      className="w-full px-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-600/5 focus:bg-white transition-all font-bold text-green-950 cursor-pointer"
                    >
                      <option value="">Select Sub-Category</option>
                      <option value="Non-Student Male">Non-Student Male</option>
                      <option value="Non-Student Female">Non-Student Female</option>
                      <option value="Student">Student</option>
                    </select>
                  </div>
                </>
              ) : (
                <>
                  {/* SCHOOL FIELDS */}
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">School Name</label>
                    <div className="relative">
                      <FaSchool className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                      <input
                        {...register("schoolName", { required: regType === "School Registration" })}
                        placeholder="Full school institution name"
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-600/5 focus:bg-white transition-all font-bold text-green-950"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Lead Contact Person</label>
                    <div className="relative">
                      <FaUserTie className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                      <input
                        {...register("contactPerson", { required: regType === "School Registration" })}
                        placeholder="Coordinator name"
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-600/5 focus:bg-white transition-all font-bold text-green-950"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">School Level</label>
                    <select
                      {...register("subCategory")}
                      className="w-full px-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-600/5 focus:bg-white transition-all font-bold text-green-950 cursor-pointer"
                    >
                      <option value="">Select school level</option>
                      <option value="Primary">Primary</option>
                      <option value="Secondary">Secondary</option>
                    </select>
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Physical Address</label>
                    <div className="relative">
                      <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                      <input
                        {...register("schoolAddress", { required: regType === "School Registration" })}
                        placeholder="Location"
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-600/5 focus:bg-white transition-all font-bold text-green-950"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* SHARED FIELDS */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Email Address</label>
                <div className="relative">
                  <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                  <input
                    {...register("email", { required: true })}
                    placeholder="email@example.com"
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-600/5 focus:bg-white transition-all font-bold text-green-950"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Phone Number</label>
                <div className="relative">
                  <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                  <input
                    {...register("phone", { required: true })}
                    placeholder="Contact phone"
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-600/5 focus:bg-white transition-all font-bold text-green-950"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Amount Payable</label>
                <div className="w-full px-4 py-4 bg-green-50 border border-green-100 rounded-2xl font-black text-green-700 text-lg">
                  ₦{(watch("amount") || 0).toLocaleString()}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Payment Status</label>
                <select
                  {...register("paymentStatus")}
                  className="w-full px-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-600/5 focus:bg-white transition-all font-bold text-green-950 cursor-pointer"
                >
                  <option value="Pending">Pending</option>
                  <option value="Paid">Paid</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            <div className="pt-6 flex gap-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-4 rounded-2xl bg-gray-100 text-gray-600 font-bold hover:bg-gray-200 transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-2 py-4 rounded-2xl bg-green-950 text-yellow-500 font-black hover:bg-green-900 transition-all shadow-xl shadow-green-950/20 flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <svg className="animate-spin h-5 w-5 text-yellow-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : <FaSave />}
                {isSubmitting ? "Saving..." : participant ? "Save Changes" : "Create Record"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
