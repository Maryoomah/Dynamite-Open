import { useState } from "react";
import emailjs from "@emailjs/browser";
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
  className = "",
  options,
  readOnly = false,
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
      <div className={className + " space-y-2"}>
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
    <div className={className + " space-y-2"}>
      <label className={labelClass}>{label}</label>
      <input
        type={type}
        {...register(name, validation)}
        placeholder={placeholder}
        readOnly={readOnly}
        className={`${base} ${error ? errorBorder : normalBorder} font-medium`}
      />
      {!!error && <p className="ml-2 text-[10px] font-bold text-red-300 uppercase tracking-wider">{error.message}</p>}
    </div>
  );
}

function Card({ title, subtitle, children }) {
  return (
    <div className="relative p-1 rounded-4xl sm:rounded-[2.8rem] bg-linear-to-tr from-green-500/20 via-white/5 to-yellow-500/20 shadow-2xl transition-all duration-500 hover:shadow-green-500/10">
      <div className="relative bg-[#0d3b28]/95 backdrop-blur-3xl rounded-4xl sm:rounded-[2.5rem] p-6 sm:p-12 border border-white/10">
        <div className="mb-8 sm:mb-10 space-y-2">
          <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">{title}</h3>
          <div className="h-1.5 w-12 bg-yellow-500 rounded-full" />
          {subtitle && (
            <p className="mt-4 text-green-100/60 font-medium text-xs sm:text-sm leading-relaxed max-w-xl">{subtitle}</p>
          )}
        </div>
        {children}
      </div>
    </div>
  );
}

function PlayerCard({ heading, tag = "Required", children }) {
  return (
    <div className="rounded-3xl sm:rounded-4xl bg-white/5 border border-white/10 p-5 sm:p-8 space-y-6">
      <div className="flex items-center justify-between gap-3 border-b border-white/5 pb-4">
        <h4 className="font-black text-[10px] sm:text-xs uppercase tracking-[0.2em] text-yellow-400">{heading}</h4>
        <span className="rounded-full bg-yellow-400/10 text-yellow-500 px-3 sm:px-4 py-1.5 text-[9px] sm:text-[10px] font-black uppercase tracking-widest">
          {tag}
        </span>
      </div>
      {children}
    </div>
  );
}

export default function SchoolRegistration() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      schoolName: "",
      schoolAddress: "",
      contactPerson: "",
      contactEmail: "",
      contactPhone: "",
      agreed: false,
    }
  });

  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");
  
  const onSubmit = async (data) => {
    setSubmitError("");
    setSubmitSuccess("");

    if (!data.agreed) {
      setSubmitError("You must agree to the terms and conditions.");
      return;
    }

    setSending(true);

    try {
      await emailjs.send(
        "service_nj2zxzq",
        "template_wlpzggb",
        data,
        "EFzPn9Dkw09RICB86",
      );

      setSubmitSuccess("Registration submitted successfully!");
      reset();
    } catch (error) {
      console.error("EmailJS Error:", error);
      setSubmitError(error?.text || "Network error. Please try again.");
    } finally {
      setSending(false);
    }
  };

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
    <section className="min-h-screen py-10 sm:py-16 bg-[#0a2e1f] relative overflow-hidden">
      <SEO title="School Registration" description="Register your school team for the Dynamite Opens inter-school competition." />
      
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 -right-24 h-[500px] w-[500px] rounded-full bg-green-800/20 blur-3xl opacity-30 sm:opacity-50" />
        <div className="absolute bottom-1/4 -left-24 h-[500px] w-[500px] rounded-full bg-yellow-500/5 blur-3xl opacity-30 sm:opacity-50" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 w-full">
        <div className="text-center sm:text-left space-y-4 mb-10 sm:mb-16">
          <div className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 uppercase tracking-[0.2em] text-[10px] font-black text-yellow-500">
            Inter-School Champions
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tighter leading-none">
            Team <span className="text-transparent bg-clip-text bg-linear-to-r from-yellow-500 to-amber-400">Registration</span>
          </h1>
          <p className="text-green-100/60 font-medium text-base sm:text-lg leading-relaxed max-w-xl">
            Empowering the next generation of Scrabble masters. 
            Register your school's finest players today.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10 sm:y-16 group/form">
          <Card
            title="School Foundation"
            subtitle="Details about your institution and official coordinator."
          >
            <div className="grid gap-5 sm:gap-6 sm:grid-cols-2">
              <Field
                label="School Name"
                name="schoolName"
                register={register}
                validation={{ required: "School name is required" }}
                placeholder="Full school name"
                error={errors.schoolName}
              />
              <Field
                label="Lead Contact Person"
                name="contactPerson"
                register={register}
                validation={{ required: "Contact person is required" }}
                placeholder="Full name & Title"
                error={errors.contactPerson}
              />
              <Field
                label="Official Email"
                name="contactEmail"
                type="email"
                register={register}
                validation={{ 
                  required: "Email is required",
                  pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email" }
                }}
                placeholder="school@email.com"
                error={errors.contactEmail}
              />
              <Field
                label="Contact Phone"
                name="contactPhone"
                type="tel"
                register={register}
                validation={{ 
                  required: "Phone is required",
                  pattern: { value: /^[0-9]+$/, message: "Numbers only" }
                }}
                placeholder="Active phone number"
                error={errors.contactPhone}
              />
              <Field
                label="School Physical Address"
                name="schoolAddress"
                register={register}
                validation={{ required: "Address is required" }}
                placeholder="Street, City, LGA, State"
                error={errors.schoolAddress}
                className="sm:col-span-2"
              />
            </div>
          </Card>

          <Card
            title="The Scrabble Four"
            subtitle="Official team roster: 2 Male and 2 Female players required."
          >
            <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
              {scrabblePlayers.map((p) => (
                <PlayerCard key={p.key} heading={p.heading}>
                  <div className="space-y-5 sm:space-y-6">
                    <Field
                      label="Full Student Name"
                      name={`${p.key}Name`}
                      register={register}
                      validation={{ required: "Student name is required" }}
                      placeholder="Student full name"
                      error={errors[`${p.key}Name`]}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <Field
                        label="Date of Birth"
                        name={`${p.key}Dob`}
                        type="date"
                        register={register}
                        validation={{ required: "Required" }}
                        error={errors[`${p.key}Dob`]}
                      />
                      <Field
                        label="Gender"
                        type="select"
                        name={`${p.key}Gender`}
                        register={register}
                        validation={{ required: "Required" }}
                        options={genderOptions}
                        error={errors[`${p.key}Gender`]}
                      />
                    </div>
                    <Field
                      label="Current Grade/Class"
                      type="select"
                      name={`${p.key}Class`}
                      register={register}
                      validation={{ required: "Select class" }}
                      options={classOptions}
                      error={errors[`${p.key}Class`]}
                    />
                  </div>
                </PlayerCard>
              ))}
            </div>
          </Card>

          <Card
            title="Spelling Bee Duo"
            subtitle="Representing the school's literacy excellence."
          >
            <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
              {beePlayers.map((p) => (
                <PlayerCard key={p.key} heading={p.heading}>
                  <div className="space-y-5 sm:space-y-6">
                    <Field
                      label="Full Student Name"
                      name={`${p.key}Name`}
                      register={register}
                      validation={{ required: "Student name is required" }}
                      placeholder="Student full name"
                      error={errors[`${p.key}Name`]}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <Field
                        label="Date of Birth"
                        name={`${p.key}Dob`}
                        type="date"
                        register={register}
                        validation={{ required: "Required" }}
                        error={errors[`${p.key}Dob`]}
                      />
                      <Field
                        label="Gender"
                        type="select"
                        name={`${p.key}Gender`}
                        register={register}
                        validation={{ required: "Required" }}
                        options={genderOptions}
                        error={errors[`${p.key}Gender`]}
                      />
                    </div>
                    <Field
                      label="Current Grade/Class"
                      type="select"
                      name={`${p.key}Class`}
                      register={register}
                      validation={{ required: "Select class" }}
                      options={classOptions}
                      error={errors[`${p.key}Class`]}
                    />
                  </div>
                </PlayerCard>
              ))}
            </div>
          </Card>

          <div className="relative p-1 rounded-4xl sm:rounded-[2.8rem] bg-linear-to-tr from-yellow-400/20 to-transparent">
            <div className="bg-white/5 backdrop-blur-3xl rounded-4xl sm:rounded-[2.5rem] p-6 sm:p-12 border border-white/10">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                <div className="space-y-4">
                  <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">Final Verification</h3>
                  <div className="space-y-3">
                    <label className="flex items-center gap-4 cursor-pointer group/agree">
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
                </div>

                <div className="w-full md:w-auto">
                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full md:w-auto bg-green-500 text-white font-black px-8 sm:px-12 py-4 sm:py-5 rounded-2xl shadow-xl shadow-green-500/20 hover:bg-green-400 hover:scale-[1.02] active:scale-95 transition-all text-sm sm:text-base uppercase tracking-widest flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {sending ? "SUBMITTING..." : "FINALIZE REGISTRATION"}
                    {!sending && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {submitError && (
                <div className="mt-6 sm:mt-8 p-4 rounded-xl bg-red-400/10 border border-red-400/20 text-red-300 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-center animate-in fade-in slide-in-from-top-2">
                  {submitError}
                </div>
              )}

              {submitSuccess && (
                <div className="mt-6 sm:mt-8 p-4 rounded-xl bg-green-400/10 border border-green-400/20 text-green-300 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-center animate-in fade-in slide-in-from-top-2">
                  {submitSuccess}
                </div>
              )}
            </div>
          </div>
        </form>

        <div className="mt-12 sm:mt-16 flex items-center justify-center gap-4 py-8 border-t border-white/5">
          <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em]">Dynamite Opens Excellence 2026</p>
        </div>
      </div>
    </section>
  );
}
