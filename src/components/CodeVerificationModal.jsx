import { useState } from "react";
import { FaLock, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function CodeVerificationModal({ isOpen, onClose, onVerify, actionTitle }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = onVerify(code);
    if (isValid) {
      setCode("");
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-200 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-green-950/40 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl p-8 sm:p-10 border border-white"
          >
            <div className="text-center space-y-6">
              <div className={`mx-auto w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg transition-colors ${error ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-700'}`}>
                {error ? <FaExclamationTriangle size={24} /> : <FaLock size={24} />}
              </div>
              
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-green-950 uppercase tracking-tight">Security Check</h3>
                <p className="text-sm text-gray-500 font-medium">
                  Authorizing action: <span className="text-green-700 font-bold uppercase">{actionTitle}</span>. 
                  Please enter the admin code to proceed.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <input
                    type="text"
                    maxLength={13}
                    value={code}
                    onChange={(e) => {
                        let val = e.target.value.toUpperCase();
                        // Strip non-alphanumeric
                        val = val.replace(/[^A-Z0-9]/g, '');
                        // Auto-format: J4YU-6AQ-K5L2
                        if (val.length > 4 && val.length <= 7) {
                            val = val.slice(0, 4) + '-' + val.slice(4);
                        } else if (val.length > 7) {
                            val = val.slice(0, 4) + '-' + val.slice(4, 7) + '-' + val.slice(7, 11);
                        }
                        setCode(val);
                        setError(false);
                    }}
                    placeholder="Enter Code"
                    className={`w-full text-center tracking-[0.2em] text-xl font-black p-5 rounded-2xl border transition-all focus:outline-none ${error ? 'border-red-400 bg-red-50' : 'border-gray-100 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-green-600/5'}`}
                  />
                  {error && <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest">Invalid or incomplete code</p>}
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 py-4 rounded-xl border border-gray-100 text-gray-400 font-bold hover:bg-gray-50 transition-all uppercase tracking-widest text-xs cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-4 rounded-xl bg-green-950 text-yellow-400 font-black hover:bg-green-900 transition-all shadow-lg shadow-green-950/20 uppercase tracking-widest text-xs flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Verify
                    <FaCheckCircle />
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
