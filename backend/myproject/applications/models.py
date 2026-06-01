from django.db import models
from django.core.validators import MinLengthValidator, MaxLengthValidator


class ScholarshipApplication(models.Model):
    """
    Model to store scholarship application form submissions.
    Corresponds to the frontend form fields in the React application.
    """
    
    # Personal Details
    student_name = models.CharField(
        max_length=255,
        help_text="Full name of the student"
    )
    phone_number = models.CharField(
        max_length=10,
        validators=[MinLengthValidator(10), MaxLengthValidator(10)],
        help_text="Student's contact phone number"
    )
    date_of_birth = models.DateField(
        help_text="Student's date of birth"
    )
    email = models.EmailField(
        help_text="Student's email address"
    )
    aadhar_number = models.CharField(
        max_length=12,
        validators=[MinLengthValidator(12), MaxLengthValidator(12)],
        help_text="Student's Aadhar number (12 digits)"
    )
    
    # Parent Details
    father_name = models.CharField(
        max_length=255,
        help_text="Father's full name"
    )
    father_number = models.CharField(
        max_length=10,
        validators=[MinLengthValidator(10), MaxLengthValidator(10)],
        help_text="Father's contact phone number"
    )
    mother_name = models.CharField(
        max_length=255,
        help_text="Mother's full name"
    )
    mother_number = models.CharField(
        max_length=10,
        validators=[MinLengthValidator(10), MaxLengthValidator(10)],
        blank=True,
        null=True,
        help_text="Mother's contact phone number (optional)"
    )
    
    # Address Details
    address_line1 = models.CharField(
        max_length=255,
        help_text="Street/House name"
    )
    address_line2 = models.CharField(
        max_length=255,
        blank=True,
        null=True,
        help_text="Area/Landmark (optional)"
    )
    district = models.CharField(
        max_length=100,
        help_text="District name"
    )
    pincode = models.CharField(
        max_length=6,
        validators=[MinLengthValidator(6), MaxLengthValidator(6)],
        help_text="6-digit postal code"
    )
    
    # Course & College Details
    course = models.CharField(
        max_length=100,
        choices=[
            ('Arts', 'Arts'),
            ('Engineering', 'Engineering'),
            ('Nursing', 'Nursing'),
            ('Pharmacy', 'Pharmacy'),
            ('Allied Health Science', 'Allied Health Science'),
            ('Polytechnic', 'Polytechnic'),
            ('Law', 'Law'),
            ('Agriculture', 'Agriculture'),
        ],
        help_text="Selected course/discipline"
    )
    department_name = models.CharField(
        max_length=255,
        help_text="Department name for the selected course"
    )
    college = models.CharField(
        max_length=255,
        choices=[
            ('Dhanalakshmi Srinivasan University', 'Dhanalakshmi Srinivasan University'),
            ('Saveetha University', 'Saveetha University'),
        ],
        help_text="Selected college"
    )
    
    # Metadata
    submitted_at = models.DateTimeField(
        auto_now_add=True,
        help_text="Timestamp when the application was submitted"
    )
    updated_at = models.DateTimeField(
        auto_now=True,
        help_text="Timestamp when the application was last updated"
    )
    status = models.CharField(
        max_length=20,
        choices=[
            ('pending', 'Pending'),
            ('under_review', 'Under Review'),
            ('approved', 'Approved'),
            ('rejected', 'Rejected'),
        ],
        default='pending',
        help_text="Application review status"
    )
    
    class Meta:
        ordering = ['-submitted_at']
        verbose_name = 'Scholarship Application'
        verbose_name_plural = 'Scholarship Applications'
        db_table = 'scholarship_applications'
    
    def __str__(self):
        return f"{self.student_name} - {self.course} ({self.college})"
    
    @property
    def full_address(self):
        """Return formatted full address."""
        address_parts = [self.address_line1]
        if self.address_line2:
            address_parts.append(self.address_line2)
        address_parts.extend([self.district, self.pincode])
        return ', '.join(address_parts)
