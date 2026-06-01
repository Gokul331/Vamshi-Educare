# Django Backend Setup

## Project Structure

```
backend/
├── myproject/
│   ├── manage.py
│   ├── db.sqlite3
│   ├── myproject/           (Main project config)
│   │   ├── settings.py
│   │   ├── urls.py
│   │   ├── asgi.py
│   │   └── wsgi.py
│   └── applications/        (Scholarship apps)
│       ├── models.py        (Database models)
│       ├── views.py         (API views)
│       ├── urls.py          (API routes)
│       ├── serializers.py   (DRF serializers)
│       ├── admin.py         (Django admin)
│       ├── apps.py          (App config)
│       └── __init__.py
└── requirements.txt
```

## Installation & Setup

### 1. Activate Virtual Environment
```bash
cd backend
# On Windows
myenv\Scripts\activate

# On macOS/Linux
source myenv/bin/activate
```

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

> Note: `Pillow` is not required by this backend and has been removed from `requirements.txt` to avoid build failures on newer Python versions during deployment.

### 3. Run Migrations
```bash
cd myproject
python manage.py makemigrations
python manage.py migrate
```

### 4. Create Superuser (for Admin Access)
```bash
python manage.py createsuperuser
# Follow prompts to create admin user
```

### 5. Start Development Server
```bash
python manage.py runserver
```

Server runs on: `http://localhost:8000`

## API Endpoints

### Base URL
```
http://localhost:8000/api/
```

### Endpoints

#### 1. Submit Scholarship Application (Public)
```
POST /api/applications/
```
**Request Body:**
```json
{
  "student_name": "John Doe",
  "phone_number": "9876543210",
  "date_of_birth": "2005-01-15",
  "email": "john@example.com",
  "aadhar_number": "123456789012",
  "father_name": "Father Name",
  "father_number": "9876543200",
  "mother_name": "Mother Name",
  "mother_number": "9876543201",
  "address_line1": "123 Main Street",
  "address_line2": "Apt 4B",
  "district": "Chennai",
  "pincode": "600001",
  "course": "Engineering",
  "department_name": "Computer Science",
  "college": "Dhanalakshmi Srinivasan University"
}
```

**Response (201 Created):**
```json
{
  "message": "Application submitted successfully",
  "data": {
    "id": 1,
    "student_name": "John Doe",
    ...
  },
  "status": "success"
}
```

#### 2. List All Applications (Admin Only)
```
GET /api/applications/
```
Requires authentication. Login via Django admin.

#### 3. Get Application Statistics (Admin Only)
```
GET /api/applications/statistics/
```

#### 4. Export Applications as CSV (Admin Only)
```
GET /api/applications/export_csv/
```

#### 5. Retrieve Specific Application (Admin Only)
```
GET /api/applications/{id}/
```

#### 6. Update Application (Admin Only)
```
PATCH /api/applications/{id}/
```

## Database Model: ScholarshipApplication

### Fields
- `student_name` (CharField, max 255)
- `phone_number` (CharField, 10 digits)
- `date_of_birth` (DateField)
- `email` (EmailField)
- `aadhar_number` (CharField, 12 digits)
- `father_name` (CharField, max 255)
- `father_number` (CharField, 10 digits)
- `mother_name` (CharField, max 255)
- `mother_number` (CharField, 10 digits, optional)
- `address_line1` (CharField, max 255)
- `address_line2` (CharField, optional)
- `district` (CharField, max 100)
- `pincode` (CharField, 6 digits)
- `course` (CharField, choices from 8 options)
- `department_name` (CharField, max 255)
- `college` (CharField, 2 college options)
- `status` (CharField, default='pending', choices: pending, under_review, approved, rejected)
- `submitted_at` (DateTimeField, auto_now_add)
- `updated_at` (DateTimeField, auto_now)

## Django Admin Interface

Access the admin panel at: `http://localhost:8000/admin/`

Features:
- View all submitted applications
- Filter by course, college, status, and date
- Search by name, email, phone, Aadhar
- Bulk actions: Approve, Reject, Set Under Review
- Export data (admin dashboard provides links)

## Frontend Integration

Update your React frontend API base URL in `src/App.jsx` or create an API config file:

```javascript
const API_BASE_URL = 'http://localhost:8000/api';

// Submit application
const submitApplication = async (formData) => {
  const response = await fetch(`${API_BASE_URL}/applications/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });
  return response.json();
};
```

## CORS Configuration

The backend is configured to accept requests from:
- `http://localhost:5173` (Vite default)
- `http://localhost:3000` (Alternative frontend port)

To add more origins, update `CORS_ALLOWED_ORIGINS` in `settings.py`.

## Production Deployment Checklist

- [ ] Set `DEBUG = False` in settings.py
- [ ] Configure `ALLOWED_HOSTS`
- [ ] Update `SECRET_KEY` to a secure value
- [ ] Configure a production database (PostgreSQL recommended)
- [ ] Set up environment variables for sensitive data
- [ ] Configure email backend for notifications
- [ ] Use a production WSGI server (Gunicorn, uWSGI)
- [ ] Set up HTTPS/SSL
- [ ] Configure proper CORS origins

## Troubleshooting

### Port Already in Use
```bash
# Find process on port 8000
lsof -i :8000

# Kill process (Linux/macOS)
kill -9 <PID>

# Or use a different port
python manage.py runserver 8001
```

### Migration Errors
```bash
python manage.py showmigrations
python manage.py migrate --fake-initial  # If needed
```

### Import Errors
Ensure `applications` is in `INSTALLED_APPS` in `settings.py`.

## Support

For API issues, check:
1. Django admin panel for submitted data
2. Console output from `python manage.py runserver`
3. Browser DevTools Network tab (frontend)
4. CORS settings if frontend can't reach backend
