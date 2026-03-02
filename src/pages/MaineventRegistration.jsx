import { useState, useEffect } from "react";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import SEO from "../components/SEO";

function Field({
  label,
  name,
  register,
  validation = {},
  type = "text",
  placeholder,
  error,
  options,
  readOnly = false,
  value,
}) {
  const base =
    "w-full rounded-2xl bg-white/10 text-white placeholder:text-white/30 " +
    "border border-white/20 px-5 py-4 shadow-sm transition-all duration-300 " +
    "focus:outline-none focus:ring-2 focus:ring-yellow-400/30 focus:border-yellow-400/50 focus:bg-white/20";

  const normalBorder = "border-white/20";
  const errorBorder = "border-red-400 focus:border-red-400 focus:ring-red-400/20";

  const labelClass = "text-[11px] font-black uppercase tracking-widest text-white/50 ml-2";

  if (type === "select") {
    return (
      <div className="space-y-2">
        <label className={labelClass}>{label}</label>
        <div className="relative">
          <select
            {...register(name, validation)}
            disabled={readOnly}
            className={`${base} ${error ? errorBorder : normalBorder} appearance-none pr-12 cursor-pointer font-medium`}
          >
            {options?.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-green-900 text-white">
                {opt.label}
              </option>
            ))}
          </select>

          <svg
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        {!!error && <p className="ml-2 text-[10px] font-bold text-red-300 uppercase tracking-wider">{error.message}</p>}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <label className={labelClass}>{label}</label>
      <input
        type={type}
        {...register(name, validation)}
        placeholder={placeholder}
        readOnly={readOnly}
        value={value}
        className={`${base} ${error ? errorBorder : normalBorder} ${readOnly ? "opacity-60 cursor-not-allowed" : ""} font-medium shadow-inner`}
      />
      {!!error && <p className="ml-2 text-[10px] font-bold text-red-300 uppercase tracking-wider">{error.message}</p>}
    </div>
  );
}

function StepPill({ active, children, done }) {
  return (
    <div
      className={
        "flex items-center gap-2 rounded-full px-4 py-2 text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all duration-500 " +
        (active 
          ? "bg-yellow-400 text-green-950 scale-105 shadow-xl shadow-yellow-400/20" 
          : done 
            ? "bg-green-500/20 text-green-400 border border-green-500/20" 
            : "bg-white/5 text-white/30 border border-white/5")
      }
    >
      {done && (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      )}
      {children}
    </div>
  );
}

export default function MainEventForm() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const { register, handleSubmit, trigger, watch, formState: { errors } } = useForm({
    defaultValues: {
      surname: "",
      name: "",
      phone: "",
      gender: "",
      category: "",
      nsfRating: "",
      email: "",
      agreed: false,
    }
  });

  const formValues = watch();
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const category = formValues.category;
    if (category === "male") setAmount(15000);
    else if (category === "female" || category === "student") setAmount(10000);
    else setAmount(0);
  }, [formValues.category]);

  const [txRef] = useState(() => `dynamite-${Date.now()}`);

  const config = {
    public_key: "FLWPUBK-8c2f310158ecb5c81ecaf573286e79f4-X",
    tx_ref: txRef,
    amount: amount,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: formValues.email,
      phonenumber: formValues.phone,
      name: `${formValues.name} ${formValues.surname}`,
    },
    customizations: {
      title: "Dynamite Opens 5.0 Registration",
      description: `Payment for ${formValues.category} category`,
      logo: "/images/logo.png",
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  const onSubmit = (data) => {
    if (!data.agreed) {
      alert("You must agree to the terms and conditions.");
      return;
    }

    handleFlutterPayment({
        callback: (response) => {
            console.log("Payment successful", response);
            closePaymentModal();
            alert("Registration successful! Thank you for joining Dynamite Opens.");
            navigate("/");
        },
        onClose: () => {
            console.log("Payment modal closed");
        },
    });
  };

  const nextStep = async () => {
    let fieldsToValidate = [];
    if (step === 1) fieldsToValidate = ["surname", "name", "phone", "gender"];
    if (step === 2) fieldsToValidate = ["category", "nsfRating", "email"];

    const isValid = await trigger(fieldsToValidate);
    if (isValid) setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
  };

  const genderOptions = [
    { value: "", label: "Select Gender" },
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
  ];

  const categoryOptions = [
    { value: "", label: "Select Category" },
    { value: "male", label: "Non-Student Male (₦15,000)" },
    { value: "female", label: "Non-Student Female (₦10,000)" },
    { value: "student", label: "Student (₦10,000)" },
  ];

  return (
    <section className="min-h-screen py-10 sm:py-16 bg-[#0a2e1f] relative overflow-hidden flex items-center">
      <SEO title="Main Event Registration" description="Register for the Dynamite Opens Main Event. Compete for the ultimate prize." />
      
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-green-800/20 blur-3xl opacity-50 sm:opacity-100" />
        <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-yellow-500/10 blur-3xl opacity-50 sm:opacity-100" />
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10 w-full">
        <div className="text-center sm:text-left space-y-4">
          <div className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 uppercase tracking-[0.2em] text-[10px] font-black text-yellow-500">
            Tournament Entry
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tighter leading-none">
            Main Event <span className="text-transparent bg-clip-text bg-linear-to-r from-yellow-500 to-amber-400">Registration</span>
          </h1>
          <p className="text-green-100/60 font-medium text-base sm:text-lg leading-relaxed max-w-xl">
            Secure your spot in Nigeria's premier Scrabble event. 
            Three simple steps to glory.
          </p>

          <div className="pt-6 sm:pt-8 flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-3">
            <StepPill active={step === 1} done={step > 1}>1. Personal</StepPill>
            <StepPill active={step === 2} done={step > 2}>2. Category</StepPill>
            <StepPill active={step === 3} done={step > 3}>3. Finalize</StepPill>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 sm:mt-12 group/form">
          <div className="relative p-1 rounded-4xl sm:rounded-[2.8rem] bg-linear-to-tr from-green-500/20 via-white/5 to-yellow-500/20 shadow-2xl transition-all duration-500 hover:shadow-green-500/20">
            <div className="relative bg-[#0d3b28]/95 backdrop-blur-3xl rounded-[1.8rem] sm:rounded-[2.5rem] p-6 sm:p-12 border border-white/10">
              
              {step === 1 && (
                <div className="space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="space-y-2">
                    <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">Personal Profile</h3>
                    <div className="h-1 sm:h-1.5 w-12 bg-green-500 rounded-full" />
                  </div>

                  <div className="grid gap-5 sm:gap-6 sm:grid-cols-2">
                    <Field
                      label="Surname"
                      name="surname"
                      register={register}
                      validation={{ required: "Surname is required" }}
                      placeholder="Enter surname"
                      error={errors.surname}
                    />
                    <Field
                      label="First Name"
                      name="name"
                      register={register}
                      validation={{ required: "First name is required" }}
                      placeholder="Enter first name"
                      error={errors.name}
                    />
                  </div>

                  <div className="grid gap-5 sm:gap-6 sm:grid-cols-2">
                    <Field
                      label="Phone Number"
                      name="phone"
                      type="tel"
                      register={register}
                      validation={{ 
                        required: "Phone number is required",
                        pattern: { value: /^[0-9]+$/, message: "Numbers only" },
                        minLength: { value: 10, message: "Valid phone required" }
                      }}
                      placeholder="e.g. 08012345678"
                      error={errors.phone}
                    />
                    <Field
                      label="Gender"
                      type="select"
                      name="gender"
                      register={register}
                      validation={{ required: "Select gender" }}
                      options={genderOptions}
                      error={errors.gender}
                    />
                  </div>

                  <div className="pt-4 sm:pt-6">
                    <button
                      type="button"
                      onClick={nextStep}
                      className="w-full bg-yellow-500 text-green-950 font-black px-6 py-4 sm:py-5 rounded-2xl shadow-xl shadow-yellow-500/20 hover:bg-yellow-400 hover:scale-[1.02] active:scale-95 transition-all text-sm sm:text-base uppercase tracking-widest flex items-center justify-center gap-3"
                    >
                      CONTINUE TO CATEGORY
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                   <div className="space-y-2">
                    <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">Category & Experience</h3>
                    <div className="h-1 sm:h-1.5 w-12 bg-yellow-500 rounded-full" />
                  </div>

                  <div className="grid gap-5 sm:gap-6 sm:grid-cols-2">
                    <Field
                      label="Tournament Category"
                      type="select"
                      name="category"
                      register={register}
                      validation={{ required: "Select category" }}
                      options={categoryOptions}
                      error={errors.category}
                    />
                    <Field
                      label="NSF Rating"
                      name="nsfRating"
                      register={register}
                      validation={{ required: "Rating is required" }}
                      placeholder="e.g. 1450"
                      error={errors.nsfRating}
                    />
                  </div>

                  <div className="grid gap-5 sm:gap-6 sm:grid-cols-2">
                    <Field
                      label="Email Address"
                      name="email"
                      type="email"
                      register={register}
                      validation={{ 
                        required: "Email is required",
                        pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email" }
                      }}
                      placeholder="name@email.com"
                      error={errors.email}
                    />
                    <div className="space-y-2">
                      <label className="text-[11px] font-black uppercase tracking-widest text-white/50 ml-2">Total Payable</label>
                      <div className="w-full rounded-2xl bg-white/5 text-yellow-500 border border-white/10 px-5 py-4 font-black text-lg sm:text-xl flex items-center h-[58px]">
                        {amount ? `₦${amount.toLocaleString()}` : "N/A"}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 sm:pt-6 flex flex-col sm:flex-row items-center gap-4">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="w-full sm:w-1/3 border-2 border-white/10 text-white font-bold px-6 py-4 sm:py-5 rounded-2xl hover:bg-white/5 transition-all text-[10px] sm:text-xs uppercase tracking-widest order-2 sm:order-1"
                    >
                      BACK
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      className="w-full sm:w-2/3 bg-yellow-500 text-green-950 font-black px-10 py-4 sm:py-5 rounded-2xl shadow-xl shadow-yellow-500/20 hover:bg-yellow-400 hover:scale-[1.02] active:scale-95 transition-all text-sm sm:text-base uppercase tracking-widest flex items-center justify-center gap-3 order-1 sm:order-2"
                    >
                      REVIEW ENTRY
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="space-y-2">
                    <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">Final Verification</h3>
                    <div className="h-1 sm:h-1.5 w-12 bg-white rounded-full" />
                  </div>

                  <div className="rounded-3xl sm:rounded-[2.5rem] bg-white/5 border border-white/10 p-6 sm:p-8 space-y-4">
                    <div className="flex items-center gap-3 text-yellow-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <h4 className="font-black text-xs sm:text-sm uppercase tracking-widest">Important Rules</h4>
                    </div>
                    <ul className="space-y-3">
                      {[
                        "All players must follow NSF Scrabble rules.",
                        "Students must present valid ID on day 1.",
                        "Payment is non-refundable after April 10th."
                      ].map((rule, i) => (
                        <li key={i} className="flex gap-3 text-green-100/60 font-medium text-xs sm:text-sm">
                          <span className="h-1.5 w-1.5 rounded-full bg-green-500 shrink-0 mt-1.5" />
                          {rule}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <label className="flex items-center gap-4 cursor-pointer group/agree p-1 sm:p-2">
                      <div className="relative">
                        <input
                          type="checkbox"
                          {...register("agreed", { required: "You must agree to the terms" })}
                          className="peer hidden"
                        />
                        <div className={`h-6 w-6 sm:h-7 sm:w-7 rounded-lg border-2 flex items-center justify-center transition-all ${errors.agreed ? 'border-red-400 bg-red-400/10' : 'border-white/20 peer-checked:bg-yellow-500 peer-checked:border-yellow-500'} peer-checked:[&_svg]:scale-100`}>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-green-950 scale-0 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-white uppercase tracking-widest group-hover:text-yellow-400 transition-colors">
                        Accept Terms & Conditions
                      </span>
                    </label>
                    {errors.agreed && <p className="ml-12 text-[10px] font-bold text-red-300 uppercase tracking-wider">{errors.agreed.message}</p>}
                  </div>

                  <div className="pt-4 sm:pt-6 flex flex-col sm:flex-row items-center gap-4">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="w-full sm:w-1/3 border-2 border-white/10 text-white font-bold px-6 py-4 sm:py-5 rounded-2xl hover:bg-white/5 transition-all text-[10px] sm:text-xs uppercase tracking-widest order-2 sm:order-1"
                    >
                      BACK
                    </button>
                    <button
                      type="submit"
                      className="w-full sm:w-2/3 bg-green-500 text-white font-black px-10 py-4 sm:py-5 rounded-2xl shadow-xl shadow-green-500/20 hover:bg-green-400 hover:scale-[1.02] active:scale-95 transition-all text-sm sm:text-base uppercase tracking-widest flex items-center justify-center gap-3 order-1 sm:order-2"
                    >
                      PROCEED TO PAYMENT
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-2">
            <span className="h-1 w-1 rounded-full bg-white/20" />
            <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">Dynamite Opens 2026</p>
            <span className="h-1 w-1 rounded-full bg-white/20" />
          </div>
        </form>
      </div>
    </section>
  );
}
