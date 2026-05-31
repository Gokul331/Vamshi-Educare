import { useState } from 'react'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    studentName: '',
    fatherName: '',
    phoneNumber: '',
    alternateNumber: '',
    email: '',
    dateOfBirth: '',
    address: '',
    pincode: '',
    interestedColleges: 'Dhanalakshmi Srinivasan University',
    aadharNumber: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmitted(true)
    console.log('Application submitted', formData)
  }

  return (
    <main className="app-shell">
      <section className="form-panel">
        <header className="form-header">
          <h1>Student Application Form</h1>
          <p>Complete the application details below to apply for admission.</p>
        </header>

        <form className="application-form" onSubmit={handleSubmit}>
          <div className="field-grid">
            <label className="field-label">
              Student Name
              <input
                type="text"
                name="studentName"
                value={formData.studentName}
                onChange={handleChange}
                required
                placeholder="Enter student name"
              />
            </label>

            <label className="field-label">
              Father Name
              <input
                type="text"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleChange}
                required
                placeholder="Enter father name"
              />
            </label>

            <label className="field-label">
              Phone Number
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                placeholder="Enter primary phone"
              />
            </label>

            <label className="field-label">
              Alternate Number
              <input
                type="tel"
                name="alternateNumber"
                value={formData.alternateNumber}
                onChange={handleChange}
                placeholder="Enter alternate phone"
              />
            </label>

            <label className="field-label">
              Mail ID
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter email address"
              />
            </label>

            <label className="field-label">
              Date of Birth
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
              />
            </label>

            <label className="field-label field-full">
              Address
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                placeholder="Enter full address"
                rows="4"
              />
            </label>

            <label className="field-label">
              Pincode
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                required
                placeholder="Enter pincode"
                maxLength={6}
              />
            </label>

            <label className="field-label field-full">
              Interested Colleges
              <div className="college-options">
                <label
                  className={`college-option ${
                    formData.interestedColleges === 'Dhanalakshmi Srinivasan University'
                      ? 'selected'
                      : ''
                  }`}
                >
                  <input
                    type="radio"
                    name="interestedColleges"
                    value="Dhanalakshmi Srinivasan University"
                    checked={formData.interestedColleges === 'Dhanalakshmi Srinivasan University'}
                    onChange={handleChange}
                  />
                  <span>Dhanalakshmi Srinivasan University</span>
                </label>

                <label
                  className={`college-option ${
                    formData.interestedColleges === 'Saveetha University'
                      ? 'selected'
                      : ''
                  }`}
                >
                  <input
                    type="radio"
                    name="interestedColleges"
                    value="Saveetha University"
                    checked={formData.interestedColleges === 'Saveetha University'}
                    onChange={handleChange}
                  />
                  <span>Saveetha University</span>
                </label>
              </div>
            </label>

            <label className="field-label field-full">
              Aadhar Card Number
              <input
                type="text"
                name="aadharNumber"
                value={formData.aadharNumber}
                onChange={handleChange}
                placeholder="Enter Aadhar number"
                maxLength={12}
                required
              />
            </label>
          </div>

          <button type="submit" className="submit-button">
            Submit Application
          </button>
        </form>

        {submitted && (
          <div className="success-message">
            Your application has been submitted successfully.
          </div>
        )}
      </section>
    </main>
  )
}

export default App
