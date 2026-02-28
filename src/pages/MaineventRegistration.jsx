import { useState } from "react";
function Field({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  required = false,
  error,
  options,
  readOnly = false,
}) {
  const base =
    "w-full rounded-xl bg-white/95 text-green-950 placeholder:text-green-900/40 " +
    "border px-4 py-3 shadow-sm transition " +
    "focus:outline-none focus:ring-2 focus:ring-yellow-300/70";

  const normalBorder = "border-white/40 focus:border-yellow-300";
  const errorBorder =
    "border-red-400 focus:border-red-400 focus:ring-red-300/40";

  const labelClass = "text-xs font-semibold tracking-wide text-white/80";

  if (type === "select") {
    return (
      <div>
        <label className={labelClass}>{label}</label>
        <div className="relative mt-2">
          <select
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            className={`${base} ${error ? errorBorder : normalBorder} appearance-none pr-10 cursor-pointer`}
          >
            {options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <svg
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-green-900/60"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        {!!error && <p className="mt-2 text-sm text-red-200">{error}</p>}
      </div>
    );
  }

  return (
    <div>
      <label className={labelClass}>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        readOnly={readOnly}
        className={`${base} ${error ? errorBorder : normalBorder} mt-2 ${readOnly ? "bg-white/80" : ""}`}
      />
      {!!error && <p className="mt-2 text-sm text-red-200">{error}</p>}
    </div>
  );
}

function StepPill({ active, children }) {
  return (
    <div
      className={
        "rounded-full px-3 py-1 text-xs font-semibold " +
        (active ? "bg-yellow-400 text-green-950" : "bg-white/15 text-white/80")
      }
    >
      {children}
    </div>
  );
}

export default function MainEventForm() {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    surname: "",
    name: "",
    phone: "",
    gender: "",
    category: "",
    nsfRating: "",
    email: "",
    amount: "",
    fee: "",
    agreed: false,
  });

  function validateStep(currentStep = step) {
    const newErrors = {};

    if (currentStep === 1) {
      if (!formData.surname.trim()) newErrors.surname = "Surname is required";
      if (!formData.name.trim()) newErrors.name = "Name is required";
      if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
      if (!formData.gender.trim()) newErrors.gender = "Select gender";

      if (formData.phone && /\D/.test(formData.phone)) {
        newErrors.phone = "Only numbers are allowed";
      }
    }

    if (currentStep === 2) {
      if (!formData.category.trim()) newErrors.category = "Select category";
      if (!formData.nsfRating.trim()) newErrors.nsfRating = "Enter rating";
      if (!formData.email.trim()) newErrors.email = "Email is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    let newValue = value;

    if (name === "phone") {
      newValue = value.replace(/\D/g, "");
      setErrors((prev) => ({
        ...prev,
        phone: value !== newValue ? "Only numbers are allowed" : "",
      }));
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : newValue,
    }));

    setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function handleCategoryChange(e) {
    const value = e.target.value;
    let amount = 0;

    if (value === "male") amount = 15000;
    else if (value === "female" || value === "student") amount = 10000;

    setFormData((prev) => ({
      ...prev,
      category: value,
      amount,
    }));

    setErrors((prev) => ({ ...prev, category: "" }));
  }

  function nextStep() {
    if (!validateStep(step)) return;
    setStep((prev) => prev + 1);
  }

  function prevStep() {
    setStep((prev) => prev - 1);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!formData.agreed) {
      alert("You must agree to the terms and conditions.");
      return;
    }
    console.log("Form Submitted", formData);
    alert("Ready for Payment");
  }

  const cardClass =
    "rounded-3xl bg-white/10 border border-white/15 backdrop-blur-xl " +
    "shadow-[0_20px_60px_-30px_rgba(0,0,0,0.45)] p-6 sm:p-8";

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
    <section className="py-14 sm:py-16 bg-gradient-to-br from-green-600 via-green-700 to-green-800">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Main Event Registration
          </h1>
          <p className="mt-2 text-white/80">
            Complete your details and proceed to payment.
          </p>

          {/* Step indicator */}
          <div className="mt-5 flex flex-wrap gap-2">
            <StepPill active={step === 1}>1. Personal</StepPill>
            <StepPill active={step === 2}>2. Category</StepPill>
            <StepPill active={step === 3}>3. Confirm</StepPill>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className={cardClass}>
            {/* STEP 1 */}
            {step === 1 && (
              <div className="space-y-5">
                <div>
                  <h3 className="text-xl font-bold text-white">
                    Personal Details
                  </h3>
                  <p className="mt-1 text-sm text-white/80">
                    Enter your basic information.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    label="Surname"
                    name="surname"
                    value={formData.surname}
                    onChange={handleChange}
                    placeholder="Surname"
                    required
                    error={errors.surname}
                  />
                  <Field
                    label="First Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="First name"
                    required
                    error={errors.name}
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="080..."
                    required
                    error={errors.phone}
                  />
                  <Field
                    label="Gender"
                    type="select"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                    options={genderOptions}
                    error={errors.gender}
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={nextStep}
                    className="w-full sm:w-auto rounded-xl bg-yellow-400 px-7 py-3.5 font-bold text-green-950
                               shadow-lg hover:bg-yellow-300 active:scale-[0.99] transition"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div className="space-y-5">
                <div>
                  <h3 className="text-xl font-bold text-white">
                    Category & Rating
                  </h3>
                  <p className="mt-1 text-sm text-white/80">
                    Select a category and provide your NSF rating.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    label="Category"
                    type="select"
                    name="category"
                    value={formData.category}
                    onChange={handleCategoryChange}
                    required
                    options={categoryOptions}
                    error={errors.category}
                  />
                  <Field
                    label="NSF Rating"
                    name="nsfRating"
                    value={formData.nsfRating}
                    onChange={handleChange}
                    placeholder="e.g. 1400"
                    required
                    error={errors.nsfRating}
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@email.com"
                    required
                    error={errors.email}
                  />
                  <Field
                    label="Registration Fee"
                    name="amount"
                    value={formData.amount ? `₦${formData.amount}` : ""}
                    onChange={() => {}}
                    readOnly
                    placeholder="Select a category"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="rounded-xl bg-white/15 px-6 py-3 font-semibold text-white hover:bg-white/20 transition"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="rounded-xl bg-yellow-400 px-7 py-3.5 font-bold text-green-950
                               shadow-lg hover:bg-yellow-300 active:scale-[0.99] transition"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <div className="space-y-5">
                <div>
                  <h3 className="text-xl font-bold text-white">
                    Confirm & Proceed
                  </h3>
                  <p className="mt-1 text-sm text-white/80">
                    Please confirm the rules before payment.
                  </p>
                </div>

                <div className="rounded-2xl bg-white/10 border border-white/15 p-4 text-white/90 text-sm space-y-2">
                  <p>
                    By registering, you agree to follow the rules of Dynamite
                    Open tournament.
                  </p>
                  <p>
                    Identification will be required for students on event day.
                  </p>
                </div>

                <label className="flex items-start gap-3 text-white">
                  <input
                    type="checkbox"
                    name="agreed"
                    checked={formData.agreed}
                    onChange={handleChange}
                    className="mt-1 h-5 w-5 accent-yellow-400"
                  />
                  <span className="text-sm text-white/90">
                    I agree to the terms and conditions.
                  </span>
                </label>

                <div className="pt-2 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="rounded-xl bg-white/15 px-6 py-3 font-semibold text-white hover:bg-white/20 transition"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-yellow-400 px-7 py-3.5 font-bold text-green-950
                               shadow-lg hover:bg-yellow-300 active:scale-[0.99] transition"
                  >
                    Proceed to pay
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Tiny note */}
          <p className="text-xs text-white/70 text-center sm:text-left">
            Need help? Reach out via the contact page.
          </p>
        </form>
      </div>
    </section>
  );
}
