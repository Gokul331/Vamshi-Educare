# Frontend-Backend Integration Guide

## Overview
The scholarship form frontend (React/Vite) is now fully integrated with the Django REST API backend. Form submissions are sent to the backend, validated, stored in the database, and confirmation emails are sent to applicants.

## Architecture

```
React Frontend (Port 5173)
         ↓
   API Service Layer
         ↓
   Django REST API (Port 8000)
         ↓
   SQLite Database
   + Email Notifications
```

## Setup Instructions

### Backend Setup

#### 1. Navigate to backend directory
```bash
cd backend
```

#### 2. Activate virtual environment
```bash
# Windows
myenv\Scripts\activate

# macOS/Linux
source myenv/bin/activate
```

#### 3. Install dependencies
```bash
pip install -r requirements.txt
```

#### 4. Create database migrations
```bash
cd myproject
python manage.py makemigrations applications
python manage.py migrate
```

#### 5. Create superuser for admin access
```bash
python manage.py createsuperuser
```

#### 6. Start the development server
```bash
python manage.py runserver
```

Backend will be available at: `http://localhost:8000`

### Frontend Setup

#### 1. Navigate to frontend directory
```bash
cd my-react-app
```

#### 2. Install dependencies
```bash
npm install
```

#### 3. Configure API endpoint (optional)
Edit `.env.local` to change the backend URL:
```env
VITE_API_URL=http://localhost:8000/api
```

#### 4. Start development server
```bash
npm run dev
```

Frontend will be available at: `http://localhost:5173`

## Project Structure

### Frontend
```
src/
├── App.jsx              (Main form component)
├── App.css              (Form styling)
├── api/
│   └── scholarshipAPI.js (Backend API service)
├── main.jsx
└── index.css
.env.local              (API configuration)
```

### Backend
```
applications/
├── models.py            (ScholarshipApplication model)
├── views.py             (ViewSet with API logic)
├── serializers.py       (Data validation)
├── urls.py              (API routes)
├── admin.py             (Django admin interface)
├── apps.py              (App configuration)
└── migrations/          (Database migrations)
```

## API Integration Flow

### 1. Form Submission
```javascript
// Frontend: src/App.jsx
handleSubmit async (formData) → submitScholarshipApplication(formData)
```

### 2. Data Transformation
```javascript
// Frontend: src/api/scholarshipAPI.js
convertFormDataToBackend(formData) // Convert camelCase to snake_case
```

### 3. API Request
```
POST http://localhost:8000/api/applications/
Content-Type: application/json
{
  "student_name": "...",
  "phone_number": "...",
  ...
}
```

### 4. Backend Processing
```python
# Backend: applications/views.py
ScholarshipApplicationViewSet.create() → Validate → Save → Send Email
```

### 5. Response
```json
{
  "message": "Application submitted successfully",
  "data": {
    "id": 1,
    "student_name": "...",
    ...
  },
  "status": "success"
}
```

## Data Field Mapping

Frontend (camelCase) → Backend (snake_case)

| Frontend | Backend |
|----------|---------|
| studentName | student_name |
| phoneNumber | phone_number |
| dateOfBirth | date_of_birth |
| aadharNumber | aadhar_number |
| fatherName | father_name |
| fatherNumber | father_number |
| motherName | mother_name |
| motherNumber | mother_number |
| addressLine1 | address_line1 |
| addressLine2 | address_line2 |
| departmentName | department_name |

## Error Handling

### Frontend
- Network errors are caught and displayed to the user
- Loading state prevents duplicate submissions
- Error messages appear above the submit button

### Backend
- Form validation at serializer level
- Phone numbers: Must be 10 digits
- Aadhar numbers: Must be 12 digits
- Pincodes: Must be 6 digits
- Email addresses: Must be valid format

## Testing the Integration

### 1. Manual Testing
1. Open http://localhost:5173 in browser
2. Fill in all form fields
3. Click "Submit Form"
4. Check if success modal appears
5. Verify data in Django admin: http://localhost:8000/admin/

### 2. Admin Dashboard
- Login to http://localhost:8000/admin/
- Navigate to "Scholarship Applications"
- View all submitted applications
- Use bulk actions to update status (Approve/Reject/Under Review)

### 3. Test API Directly
```bash
# Using curl
curl -X POST http://localhost:8000/api/applications/ \
  -H "Content-Type: application/json" \
  -d '{
    "student_name": "Test User",
    "phone_number": "9876543210",
    "date_of_birth": "2005-01-15",
    "email": "test@example.com",
    "aadhar_number": "123456789012",
    "father_name": "Father Name",
    "father_number": "9876543200",
    "mother_name": "Mother Name",
    "address_line1": "123 Street",
    "district": "City",
    "pincode": "600001",
    "course": "Engineering",
    "department_name": "Computer Science",
    "college": "Dhanalakshmi Srinivasan University"
  }'
```

## CORS Configuration

The backend is configured to accept requests from:
- `http://localhost:5173` (Default Vite port)
- `http://localhost:3000` (Alternative port)
- `http://127.0.0.1:5173`
- `http://127.0.0.1:3000`

To add production domains, update `CORS_ALLOWED_ORIGINS` in `settings.py`.

## Email Configuration

Currently set to **console backend** (emails print to console in development).

To enable real email sending:
```python
# In settings.py
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'your-email-provider.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = 'your-email@example.com'
EMAIL_HOST_PASSWORD = 'your-app-password'
```

## Troubleshooting

### "No such table: scholarship_applications"
**Solution:** Run migrations
```bash
cd backend/myproject
python manage.py makemigrations applications
python manage.py migrate
```

### CORS Error in Console
**Solution:** Ensure backend is running at `http://localhost:8000` and CORS middleware is enabled in `settings.py`.

### "Failed to fetch" error
**Solution:** 
1. Check if backend server is running
2. Verify API URL in `.env.local`
3. Check browser console for specific error

### Form won't submit
**Solution:**
1. Check browser console for validation errors
2. Ensure all required fields are filled
3. Check data format (phone numbers must be digits only, etc.)

## Production Deployment

### Backend (Django)
1. Set `DEBUG = False` in settings.py
2. Configure allowed hosts
3. Use a production database (PostgreSQL recommended)
4. Set up environment variables for secrets
5. Use Gunicorn/uWSGI for production server
6. Configure CORS for production domain

### Frontend (React)
1. Build for production: `npm run build`
2. Deploy to hosting (Vercel, Netlify, etc.)
3. Update `VITE_API_URL` to production backend URL

## API Endpoints Reference

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/applications/` | Public | Submit application |
| GET | `/api/applications/` | Admin | List all applications |
| GET | `/api/applications/{id}/` | Admin | Get specific application |
| PATCH | `/api/applications/{id}/` | Admin | Update application |
| DELETE | `/api/applications/{id}/` | Admin | Delete application |
| GET | `/api/applications/statistics/` | Admin | Get stats |
| GET | `/api/applications/export_csv/` | Admin | Export as CSV |

## Support & Documentation

- Django Documentation: https://docs.djangoproject.com/
- Django REST Framework: https://www.django-rest-framework.org/
- React Documentation: https://react.dev/
- Vite Documentation: https://vitejs.dev/
