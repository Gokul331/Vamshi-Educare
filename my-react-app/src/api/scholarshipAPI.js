// API configuration
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://vamshi-educare.onrender.com/api/';

// Scholarship Application API endpoints
export const APPLICATION_ENDPOINTS = {
  submit: `${API_BASE_URL}/applications/`,
  list: `${API_BASE_URL}/applications/`,
  statistics: `${API_BASE_URL}/applications/statistics/`,
  exportCSV: `${API_BASE_URL}/applications/export_csv/`,
};

// Convert frontend form data (camelCase) to backend format (snake_case)
export const convertFormDataToBackend = (formData) => {
  return {
    student_name: formData.studentName,
    phone_number: formData.phoneNumber,
    date_of_birth: formData.dateOfBirth,
    email: formData.email,
    aadhar_number: formData.aadharNumber,
    father_name: formData.fatherName,
    father_number: formData.fatherNumber,
    mother_name: formData.motherName,
    address_line1: formData.addressLine1,
    address_line2: formData.addressLine2 || null,
    district: formData.district,
    pincode: formData.pincode,
    course: formData.course,
    department_name: formData.departmentName,
    college: formData.college,
  };
};

// Submit scholarship application to backend
export const submitScholarshipApplication = async (formData) => {
  try {
    const backendData = convertFormDataToBackend(formData);
    
    const response = await fetch(APPLICATION_ENDPOINTS.submit, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(backendData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Failed to submit application');
    }

    const data = await response.json();
    return {
      success: true,
      data,
      message: data.message || 'Application submitted successfully',
    };
  } catch (error) {
    console.error('Application submission error:', error);
    return {
      success: false,
      error: error.message || 'An error occurred while submitting the application',
    };
  }
};
