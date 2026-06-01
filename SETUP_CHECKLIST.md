# Quick Setup Checklist

## Prerequisites
- [ ] Python 3.10+ installed
- [ ] Node.js 18+ and npm installed
- [ ] Git (optional)

## Backend Setup (Django)

### Step 1: Install Python Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### Step 2: Create Database Tables
```bash
cd myproject
python manage.py makemigrations applications
python manage.py migrate
```

### Step 3: Create Admin User (Optional)
```bash
python manage.py createsuperuser
```

### Step 4: Start Backend Server
```bash
python manage.py runserver
```

✅ Backend running at: `http://localhost:8000`
✅ Admin panel at: `http://localhost:8000/admin/`

---

## Frontend Setup (React/Vite)

### Step 1: Install Node Dependencies
```bash
cd my-react-app
npm install
```

### Step 2: Verify API Configuration
Check `.env.local` contains:
```env
VITE_API_URL=http://localhost:8000/api
```

### Step 3: Start Frontend Server
```bash
npm run dev
```

✅ Frontend running at: `http://localhost:5173`

---

## Integration Test

### Test 1: Submit a Test Application
1. Open http://localhost:5173 in your browser
2. Fill in all form fields with test data
3. Click "Submit Form"
4. You should see a success message
5. Page redirects after 5 seconds

### Test 2: Verify in Admin
1. Open http://localhost:8000/admin/ in your browser
2. Login with the superuser credentials you created
3. Navigate to "Scholarship Applications"
4. You should see your test submission
5. Application status should be "Pending"

### Test 3: Check Email Output
1. During backend startup in terminal, look for email output:
```
Content-Type: text/plain; charset="utf-8"
MIME-Version: 1.0
Content-Transfer-Encoding: 7bit
Subject: Scholarship Application Confirmation
From: noreply@vamshieducare.com
To: [your-email@example.com]
...
```

---

## Troubleshooting Quick Fix

### Issue: "ModuleNotFoundError: No module named 'rest_framework'"
```bash
pip install djangorestframework==3.14.0
```

### Issue: "Table 'scholarship_applications' doesn't exist"
```bash
cd backend/myproject
python manage.py migrate
```

### Issue: "Connection refused" when submitting form
- Check if backend is running at `http://localhost:8000`
- Verify `.env.local` has correct `VITE_API_URL`
- Check browser console for CORS errors

### Issue: Submit button won't disable
- Ensure `.env.local` exists in frontend root
- Clear browser cache (Ctrl+Shift+Del)
- Restart Vite dev server

---

## File Structure Reference

```
Vamshi Educare/
├── backend/
│   ├── myproject/
│   │   ├── applications/
│   │   │   ├── models.py ✅ ScholarshipApplication model
│   │   │   ├── views.py ✅ API ViewSet
│   │   │   ├── serializers.py ✅ Validation
│   │   │   ├── urls.py ✅ Routes
│   │   │   └── admin.py ✅ Admin interface
│   │   ├── myproject/
│   │   │   ├── settings.py ✅ CORS configured
│   │   │   └── urls.py ✅ API included
│   │   ├── manage.py
│   │   └── db.sqlite3 (created after migration)
│   └── requirements.txt ✅ All packages listed
├── my-react-app/
│   ├── src/
│   │   ├── App.jsx ✅ Form submission integrated
│   │   ├── App.css ✅ Error & loading styles added
│   │   ├── api/
│   │   │   └── scholarshipAPI.js ✅ Backend integration
│   │   └── main.jsx
│   ├── .env.local ✅ API URL configured
│   ├── package.json
│   └── vite.config.js
└── INTEGRATION_GUIDE.md ✅ This documentation
```

---

## Environment Variables

### Frontend (.env.local)
```env
VITE_API_URL=http://localhost:8000/api
```

### Backend (settings.py - already configured)
```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
```

---

## Next Steps

1. ✅ Run backend setup
2. ✅ Run frontend setup
3. ✅ Test form submission
4. ✅ Verify data in admin
5. (Optional) Configure real email sending
6. (Optional) Deploy to production

---

## Command Reference

| Command | Purpose |
|---------|---------|
| `cd backend && pip install -r requirements.txt` | Install backend packages |
| `cd backend/myproject && python manage.py migrate` | Create database tables |
| `cd backend/myproject && python manage.py createsuperuser` | Create admin user |
| `cd backend/myproject && python manage.py runserver` | Start backend |
| `cd my-react-app && npm install` | Install frontend packages |
| `cd my-react-app && npm run dev` | Start frontend (dev mode) |
| `cd my-react-app && npm run build` | Build frontend (production) |

---

**Status:** All components are ready. Frontend + Backend integration is complete. ✅
