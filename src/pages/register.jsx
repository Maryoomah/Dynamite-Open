import { useState } from "react";
function MainEventForm() {
  const [step, setStep] = useState(1);
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

  //handle input change
  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }
  //handle category change and auto amount
  function handleCategoryChange(e) {
    const value = e.target.value;
    let amount = 0;

    if (value === "male") {
      amount = 15000;
    } else if (value === "female" || value === "student") {
      amount = 10000;
    }
    setFormData((prev) => ({
      ...prev,
      category: value,
      amount: amount,
    }));
  }
  function nextStep() {
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
    console.log("Form Submittedx", formData);
    alert("Ready for Payement ");
  }
  return (
    <section className="py-16 bg-linear-to-br from-green-200 to-green-500">
      <div className="max-w-xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-green-900 mb-8">
          Main Event Registration
        </h1>

        <form
          action="
            "
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* step 1 */}
          {step === 1 && (
            <>
              <input
                type="text"
                name="surname"
                placeholder="Surname"
                value={formData.surname}
                onChange={handleChange}
                className="w-full border p-3 rounded "
                required
              />
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border p-3 rounded"
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Enter Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border p-3 rounded"
                required
              />
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full border p-3 rounded"
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              <button
                type="button"
                onClick={nextStep}
                className="bg-green-600 text-white px-6 py-3 rounded"
              >
                Next
              </button>{" "}
            </>
          )}
          {/* step2 */}
          {step === 2 && (
            <>
              <select
                name="category"
                value={formData.category}
                onChange={handleCategoryChange}
                className="w-full border p-3 rounded"
                required
              >
                <option value="">Select Category</option>
                <option value="male">Non-Student Male (15,000)</option>
                <option value="female">Non-Student Female (10,000) </option>
                <option value="student">Student (10,000) </option>
              </select>
              <input
                type="text"
                name="nsfRating"
                placeholder="NSF Rating"
                value={formData.nsfRating}
                onChange={handleChange}
                className="w-full border p-3 rounded"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full border p-3 rounded"
                required
              />
              <input
                type="text"
                value={`N${formData.amount}`}
                readOnly
                className="w-full border p-3 rounded bg-gray-200"
              />
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="bg-green-600 text-white  px-6 py-3 rounded"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="bg-green-600 text-white px-6 py-3 rounded"
                >
                  Next
                </button>
              </div>
            </>
          )}
          {/* step 3 */}
          {step === 3 && (
            <>
              <div className="text-sm text-gray-700 space-y-3">
                <p>
                  By registering, you agree to follow the rules of dynamite open
                  tournament
                </p>
                <p>Identification will be required for students on event day</p>
              </div>
              <label className="flex item-center gap-2">
                <input
                  type="checkbox"
                  name="agreed"
                  checked={formData.agreed}
                  onChange={handleChange}
                />
                I agree to the terms and conditions
              </label>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="bg-green-600 text-white  px-6 py-3 rounded"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="bg-green-600 text-white px-6 py-3 rounded"
                >
                  Proceed to pay
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </section>
  );
}
export default MainEventForm