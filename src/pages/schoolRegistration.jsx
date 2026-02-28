import { useState } from "react";
import emailjs from "@emailjs/browser";

function Field({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  required = false,
  className = "",
  options,
}) {
  const base =
    "w-full rounded-xl bg-white/95 text-green-950 placeholder:text-green-900/40 " +
    "border border-white/40 px-4 py-3 shadow-sm " +
    "focus:outline-none focus:ring-2 focus:ring-yellow-300/70 focus:border-yellow-300 " +
    "transition";

  const labelClass = "text-xs font-semibold tracking-wide text-white/80";

  if (type === "select") {
    return (
      <div className={className}>
        <label className={labelClass}>{label}</label>
        <div className="relative mt-2">
          <select
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            className={`${base} appearance-none pr-10 cursor-pointer`}
          >
            {options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          {/* chevron */}
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
      </div>
    );
  }

  return (
    <div className={className}>
      <label className={labelClass}>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`${base} mt-2`}
      />
    </div>
  );
}

function Card({ title, subtitle, children }) {
  return (
    <div
      className="rounded-3xl bg-white/10 border border-white/15 backdrop-blur-xl
                 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.45)] p-6 sm:p-8"
    >
      <div className="mb-6">
        <h3 className="text-xl sm:text-2xl font-bold text-white">{title}</h3>
        {subtitle ? (
          <p className="mt-2 text-sm sm:text-base text-white/80">{subtitle}</p>
        ) : null}
      </div>
      {children}
    </div>
  );
}

function PlayerCard({ heading, tag = "Required", children }) {
  return (
    <div className="rounded-2xl bg-white/10 border border-white/15 backdrop-blur p-5 sm:p-6">
      <div className="mb-5 flex items-center justify-between gap-3">
        <h4 className="font-bold text-white">{heading}</h4>
        <span className="rounded-full bg-yellow-400/20 text-yellow-200 px-3 py-1 text-xs font-semibold">
          {tag}
        </span>
      </div>
      {children}
    </div>
  );
}

export default function SchoolRegistration() {
  const [formData, setFormData] = useState({
    schoolName: "",
    schoolAddress: "",
    contactPerson: "",
    contactEmail: "",
    contactPhone: "",

    scrabbleMale1Name: "",
    scrabbleMale1Dob: "",
    scrabbleMale1Gender: "",
    scrabbleMale1Class: "",

    scrabbleMale2Name: "",
    scrabbleMale2Dob: "",
    scrabbleMale2Gender: "",
    scrabbleMale2Class: "",

    scrabbleFemale1Name: "",
    scrabbleFemale1Dob: "",
    scrabbleFemale1Gender: "",
    scrabbleFemale1Class: "",

    scrabbleFemale2Name: "",
    scrabbleFemale2Dob: "",
    scrabbleFemale2Gender: "",
    scrabbleFemale2Class: "",

    beeMaleName: "",
    beeMaleDob: "",
    beeMaleGender: "",
    beeMaleClass: "",

    beeFemaleName: "",
    beeFemaleDob: "",
    beeFemaleGender: "",
    beeFemaleClass: "",

    agreed: false,
  });

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();

    setSubmitError("");
    setSubmitSuccess("");

    if (!formData.agreed) {
      setSubmitError("You must agree to the terms and conditions.");
      return;
    }

    setSending(true);

    try {
      await emailjs.send(
        "service_nj2zxzq",
        "template_wlpzggb",
        formData,
        "EFzPn9Dkw09RICB86",
      );

      setSubmitSuccess("Registration submitted successfully!");

      setFormData(initialFormData);
    } catch (error) {
      console.error("EmailJS Error:", error);

      if (error?.status === 400) {
        setSubmitError("Invalid request. Please check your inputs.");
      } else if (error?.status === 401) {
        setSubmitError("Email service configuration error.");
      } else if (error?.status === 429) {
        setSubmitError("Too many attempts. Please wait before trying again.");
      } else if (error?.text) {
        setSubmitError(error.text);
      } else {
        setSubmitError("Network error. Please check your connection.");
      }
    } finally {
      setSending(false);
    }
  }

  const grid2 = "grid gap-4 sm:grid-cols-2";
  const genderOptions = [
    { value: "", label: "Select Gender" },
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
  ];
  const classOptions = [
    { value: "", label: "Select Class" },
    { value: "jss 1", label: "JSS 1" },
    { value: "jss 2", label: "JSS 2" },
    { value: "jss 3", label: "JSS 3" },
    { value: "sss 1", label: "SSS 1" },
    { value: "sss 2", label: "SSS 2" },
    { value: "sss 3", label: "SSS 3" },
  ];

  const scrabblePlayers = [
    { key: "scrabbleMale1", heading: "Scrabble — Male Player 1" },
    { key: "scrabbleMale2", heading: "Scrabble — Male Player 2" },
    { key: "scrabbleFemale1", heading: "Scrabble — Female Player 1" },
    { key: "scrabbleFemale2", heading: "Scrabble — Female Player 2" },
  ];

  const beePlayers = [
    { key: "beeMale", heading: "Spelling Bee — Male Participant" },
    { key: "beeFemale", heading: "Spelling Bee — Female Participant" },
  ];

  return (
    <section className="py-14 sm:py-16 bg-gradient-to-br from-green-600 via-green-700 to-green-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center sm:text-left">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Inter-School Registration
          </h2>
          <p className="mt-2 text-white/80 max-w-2xl">
            Register your school team for Scrabble and Spelling Bee.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-10 space-y-10">
          {/* SCHOOL INFO */}
          <Card
            title="School Information"
            subtitle="Tell us about your school and the main contact person."
          >
            <div className={grid2}>
              <Field
                label="School Name"
                name="schoolName"
                value={formData.schoolName}
                onChange={handleChange}
                required
              />
              <Field
                label="Contact Person"
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleChange}
                placeholder="Full name"
                required
              />
              <Field
                label="Contact Email"
                name="contactEmail"
                type="email"
                value={formData.contactEmail}
                onChange={handleChange}
                placeholder="name@school.com"
                required
              />
              <Field
                label="Contact Phone"
                name="contactPhone"
                type="tel"
                value={formData.contactPhone}
                onChange={handleChange}
                placeholder="+234..."
                required
              />
              <Field
                label="School Address"
                name="schoolAddress"
                value={formData.schoolAddress}
                onChange={handleChange}
                placeholder="Street, City, State"
                required
                className="sm:col-span-2"
              />
            </div>
          </Card>

          {/* SCRABBLE TEAM */}
          <Card
            title="Scrabble Team"
            subtitle="4 players required: 2 Male and 2 Female."
          >
            <div className="space-y-6">
              {scrabblePlayers.map((p) => (
                <PlayerCard key={p.key} heading={p.heading}>
                  <div className={grid2}>
                    <Field
                      label="Full Name"
                      name={`${p.key}Name`}
                      value={formData[`${p.key}Name`]}
                      onChange={handleChange}
                      placeholder="Student's full name"
                      required
                    />
                    <Field
                      label="Date of Birth"
                      name={`${p.key}Dob`}
                      type="date"
                      value={formData[`${p.key}Dob`]}
                      onChange={handleChange}
                      required
                    />
                    <Field
                      label="Gender"
                      type="select"
                      name={`${p.key}Gender`}
                      value={formData[`${p.key}Gender`]}
                      onChange={handleChange}
                      required
                      options={genderOptions}
                    />
                    <Field
                      label="Class"
                      type="select"
                      name={`${p.key}Class`}
                      value={formData[`${p.key}Class`]}
                      onChange={handleChange}
                      required
                      options={classOptions}
                    />
                  </div>
                </PlayerCard>
              ))}
            </div>
          </Card>

          {/* SPELLING BEE */}
          <Card
            title="Spelling Bee"
            subtitle="2 players required: 1 Male and 1 Female."
          >
            <div className="space-y-6">
              {beePlayers.map((p) => (
                <PlayerCard key={p.key} heading={p.heading}>
                  <div className={grid2}>
                    <Field
                      label="Full Name"
                      name={`${p.key}Name`}
                      value={formData[`${p.key}Name`]}
                      onChange={handleChange}
                      placeholder="Student's full name"
                      required
                    />
                    <Field
                      label="Date of Birth"
                      name={`${p.key}Dob`}
                      type="date"
                      value={formData[`${p.key}Dob`]}
                      onChange={handleChange}
                      required
                    />
                    <Field
                      label="Gender"
                      type="select"
                      name={`${p.key}Gender`}
                      value={formData[`${p.key}Gender`]}
                      onChange={handleChange}
                      required
                      options={genderOptions}
                    />
                  <Field
                      label="Class"
                      type="select"
                      name={`${p.key}Class`}
                      value={formData[`${p.key}Class`]}
                      onChange={handleChange}
                      required
                      options={classOptions}
                    />
                  </div>
                </PlayerCard>
              ))}
            </div>
          </Card>

          {/* TERMS + SUBMIT */}
          <Card
            title="Confirmation"
            subtitle="Please confirm before submitting."
          >
            <div className="space-y-5">
              <p className="text-sm sm:text-base text-white/80">
                Each student must present valid school identification on event
                day.
              </p>

              <label className="flex items-start gap-3 text-white">
                <input
                  type="checkbox"
                  name="agreed"
                  checked={formData.agreed}
                  onChange={handleChange}
                  className="mt-1 h-5 w-5 accent-yellow-400"
                />
                <span className="text-sm sm:text-base text-white/90">
                  I confirm that all details provided are accurate.
                </span>
              </label>

              <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-3">
                <button
                  type="submit"
                  disabled={sending}
                  className="bg-green-800 text-yellow-400 font-bold px-6 py-3 rounded-xl
             disabled:opacity-60 disabled:cursor-not-allowed
             hover:bg-green-600 hover:text-white transition"
                >
                  {sending ? "Submitting..." : "Submit Registration"}
                </button>
                {submitError && (
                  <p className="text-red-500 text-sm mt-3">{submitError}</p>
                )}

                {submitSuccess && (
                  <p className="text-green-500 bg-white p-1 text-sm mt-3">{submitSuccess}</p>
                )}
                <p className="text-xs text-white/70">
                  By submitting, you agree the information is correct.
                </p>
              </div>
            </div>
          </Card>
        </form>
      </div>
    </section>
  );
}
