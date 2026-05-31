import { useState } from 'react'
import './App.css'

const courseOptions = [
  'Arts',
  'Engineering',
  'Nursing',
  'Pharm',
  'Allied Health Science',
  'Polytechnic',
  'Law',
  'Agri',
]

const collegeOptions = [
  'Dhanalakshmi Srinivasan University',
  'Saveetha University',
]

function App() {
  const [formData, setFormData] = useState({
    studentName: '',
    phoneNumber: '',
    dateOfBirth: '',
    email: '',
    aadharNumber: '',
    fatherName: '',
    fatherNumber: '',
    motherName: '',
    motherNumber: '',
    addressLine1: '',
    addressLine2: '',
    district: '',
    pincode: '',
    course: 'Select course',
    college: 'Dhanalakshmi Srinivasan University',
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
          

          <div className="form-title">
            <img src="/Logo.png" alt="Vamshi Edu Care" className="form-logo" />
            <div className="form-title-copy">
              <p className="brand-name">
                <span className="brand-name-line">Vamshi Edu Care</span>
                
              </p>
              <h1>Scholarship Form</h1>
              <p className="form-description">
                Complete the scholarship application in one go. Start with student details, then fill parent,
                address, course, and college preferences.
              </p>
            </div>
          </div>
        </header>

        <form className="application-form" onSubmit={handleSubmit}>
          <section className="panel-section">
            <div className="section-heading">
              <h2>Personal Details</h2>
            </div>
            <div className="field-grid">
              <label className="field-label">
                <span className="field-label-text">Student Name</span>
                <input
                  type="text"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleChange}
                  placeholder="Enter student name"
                  required
                />
              </label>

              <label className="field-label">
                <span className="field-label-text">Phone Number</span>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  required
                />
              </label>

              <label className="field-label">
                <span className="field-label-text">Date of Birth</span>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  required
                />
              </label>

              <label className="field-label">
                <span className="field-label-text">Mail ID</span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email address"
                  required
                />
              </label>

              <label className="field-label">
                <span className="field-label-text">Aadhar Number</span>
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
          </section>

          <section className="panel-section">
            <div className="section-heading">
              <h2>Parent Details</h2>
            </div>
            <div className="field-grid">
              <label className="field-label">
                <span className="field-label-text">Father Name</span>
                <input
                  type="text"
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleChange}
                  placeholder="Enter father name"
                  required
                />
              </label>

              <label className="field-label">
                <span className="field-label-text">Father Number</span>
                <input
                  type="tel"
                  name="fatherNumber"
                  value={formData.fatherNumber}
                  onChange={handleChange}
                  placeholder="Enter father phone"
                  required
                />
              </label>

              <label className="field-label">
                <span className="field-label-text">Mother Name</span>
                <input
                  type="text"
                  name="motherName"
                  value={formData.motherName}
                  onChange={handleChange}
                  placeholder="Enter mother name"
                  required
                />
              </label>

              <label className="field-label">
                <span className="field-label-text">Mother Number</span>
                <input
                  type="tel"
                  name="motherNumber"
                  value={formData.motherNumber}
                  onChange={handleChange}
                  placeholder="Enter mother phone"
                  required
                />
              </label>
            </div>
          </section>

          <section className="panel-section">
            <div className="section-heading">
              <h2>Address Details</h2>
            </div>
            <div className="field-grid">
              <label className="field-label field-full">
                <span className="field-label-text">Address Line 1</span>
                <input
                  type="text"
                  name="addressLine1"
                  value={formData.addressLine1}
                  onChange={handleChange}
                  placeholder="Street/House name"
                  required
                />
              </label>

              <label className="field-label field-full">
                <span className="field-label-text">Address Line 2</span>
                <input
                  type="text"
                  name="addressLine2"
                  value={formData.addressLine2}
                  onChange={handleChange}
                  placeholder="Area/landmark"
                />
              </label>

              <label className="field-label">
                <span className="field-label-text">District</span>
                <input
                  type="text"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  placeholder="Enter district"
                  required
                />
              </label>

              <label className="field-label">
                <span className="field-label-text">Pincode</span>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="Enter pincode"
                  maxLength={6}
                  required
                />
              </label>
            </div>
          </section>

          <section className="panel-section">
            <div className="field-grid">
              <label className="field-label field-full">
                <span className="field-label-text">Course Selection</span>
                <select name="course" value={formData.course} onChange={handleChange} required>
                  <option value="Select course" disabled>
                    Select course
                  </option>
                  {courseOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </section>

          <section className="panel-section">
            <div className="section-heading">
              <h2>College Selection</h2>
            </div>
            <div className="college-options">
              {collegeOptions.map((option) => (
                <label
                  key={option}
                  className={`college-option ${formData.college === option ? 'selected' : ''}`}
                >
                  <input
                    type="radio"
                    name="college"
                    value={option}
                    checked={formData.college === option}
                    onChange={handleChange}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </section>

          <div className="submit-row">
            <button type="submit" className="submit-button">
              Submit Application
            </button>
          </div>
        </form>

        {submitted && (
          <div className="success-message">
            <h3>Application submitted successfully</h3>
            <p>Thanks! We have received your application data.</p>
          </div>
        )}
      </section>
    </main>
  )
}

export default App
