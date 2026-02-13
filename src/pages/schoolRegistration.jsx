import { useState } from "react";

function SchoolRegistration() {
  const [formData, setFormData] = useState({
    schoolName: "",
    schoolAddress: "",
    contactPerson: "",
    contactEmail: "",
    contactPhone: "",

    // Scrabble Team
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

    // Spelling Bee
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

  function handleSubmit(e) {
    e.preventDefault();

    if (!formData.agreed) {
      alert("You must agree to the terms.");
      return;
    }

    console.log("School Registration:", formData);
    alert("Registration submitted successfully!");
  }

  return (
    <section className="py-16 bg-linear-to-br from-green-500 to-green-700">
      <div className="max-w-4xl mx-auto px-6 ">
        <h2 className="text-3xl font-bold text-green-50 mb-8">
          Inter-School Registration
        </h2>

        <form onSubmit={handleSubmit} className="space-y-10">
          {/* SCHOOL INFO */}
          <div>
            <h3 className="text-xl font-semibold text-green-50 mb-4">
              School Information
            </h3>

            <input
              type="text"
              name="schoolName"
              placeholder="School Name"
              value={formData.schoolName}
              onChange={handleChange}
              className="w-full border p-3 rounded mb-4 text-white"
              required
            />

            <input
              type="text"
              name="schoolAddress"
              placeholder="School Address"
              value={formData.schoolAddress}
              onChange={handleChange}
              className="w-full border p-3 rounded mb-4 text-white"
              required
            />

            <input
              type="text"
              name="contactPerson"
              placeholder="Contact Person"
              value={formData.contactPerson}
              onChange={handleChange}
              className="w-full border p-3 rounded mb-4 text-white"
              required
            />

            <input
              type="email"
              name="contactEmail"
              placeholder="Contact Email"
              value={formData.contactEmail}
              onChange={handleChange}
              className="w-full border p-3 rounded mb-4 text-white"
              required
            />

            <input
              type="tel"
              name="contactPhone"
              placeholder="Contact Phone"
              value={formData.contactPhone}
              onChange={handleChange}
              className="w-full border p-3 rounded text-white"
              required
            />
          </div>

          {/* SCRABBLE TEAM */}
          <div>
            <h3 className="text-xl font-semibold text-green-50 mb-4">
              Scrabble Team (4 Players)
            </h3>

            <p className="text-sm text-gray-50 mb-6">
              2 Male and 2 Female students required.
            </p>

            {/* Repeat structure for each student */}
            {[
              "scrabbleMale1",
              "scrabbleMale2",
              "scrabbleFemale1",
              "scrabbleFemale2",
            ].map((player) => (
              <div key={player} className="border p-4 rounded mb-6">
                <h4 className="font-semibold mb-3">
                  {player.includes("Male") ? "Male Player" : "Female Player"}
                </h4>

                <input
                  type="text"
                  name={`${player}Name`}
                  placeholder="Full Name"
                  value={formData[`${player}Name`]}
                  onChange={handleChange}
                  className="w-full border p-2 rounded mb-3 text-white"
                  required
                />

                <input
                  type="date"
                  name={`${player}Dob`}
                  value={formData[`${player}Dob`]}
                  onChange={handleChange}
                  className="w-full border p-2 rounded mb-3 text-white"
                  required
                />

                <select
                  name={`${player}Gender`}
                  value={formData[`${player}Gender`]}
                  onChange={handleChange}
                  className="w-full border p-2 rounded mb-3 "
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>

                <input
                  type="text"
                  name={`${player}Class`}
                  placeholder="Class"
                  value={formData[`${player}Class`]}
                  onChange={handleChange}
                  className="w-full border p-2 rounded text-white"
                  required
                />
              </div>
            ))}
          </div>

          {/* SPELLING BEE */}
          <div>
            <h3 className="text-xl font-semibold text-green-50 mb-4">
              Spelling Bee (2 Players)
            </h3>

            {["beeMale", "beeFemale"].map((player) => (
              <div key={player} className="border p-4 rounded mb-6">
                <h4 className="font-semibold mb-3">
                  {player === "beeMale"
                    ? "Male Participant"
                    : "Female Participant"}
                </h4>

                <input
                  type="text"
                  name={`${player}Name`}
                  placeholder="Full Name"
                  value={formData[`${player}Name`]}
                  onChange={handleChange}
                  className="w-full border p-2 rounded mb-3 text-white"
                  required
                />

                <input
                  type="date"
                  name={`${player}Dob`}
                  value={formData[`${player}Dob`]}
                  onChange={handleChange}
                  className="w-full border p-2 rounded mb-3 text-white"
                  required
                />

                <select
                  name={`${player}Gender`}
                  value={formData[`${player}Gender`]}
                  onChange={handleChange}
                  className="w-full border p-2 rounded mb-3"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>

                <input
                  type="text"
                  name={`${player}Class`}
                  placeholder="Class"
                  value={formData[`${player}Class`]}
                  onChange={handleChange}
                  className="w-full border p-2 rounded text-white"
                  required
                />
              </div>
            ))}
          </div>

          {/* TERMS */}
          <div className="space-y-4">
            <p className="text-sm text-green-50">
              Each student must present valid school identification on event
              day.
            </p>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="agreed"
                checked={formData.agreed}
                onChange={handleChange}
              />
              I confirm that all details provided are accurate.
            </label>

            <button
              type="submit"
              className="bg-green-700 text-white px-6 py-3 rounded"
            >
              Submit Registration
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
export default SchoolRegistration;
