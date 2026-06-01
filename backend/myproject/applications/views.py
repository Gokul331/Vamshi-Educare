from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.core.mail import send_mail
from django.conf import settings
from .models import ScholarshipApplication
from .serializers import ScholarshipApplicationSerializer


class ScholarshipApplicationViewSet(viewsets.ModelViewSet):
    """
    ViewSet for handling scholarship application submissions.
    
    Endpoints:
    - POST /api/applications/ : Submit a new application
    - GET /api/applications/ : List all applications (admin only)
    - GET /api/applications/{id}/ : Retrieve a specific application (admin only)
    - PATCH /api/applications/{id}/ : Update an application (admin only)
    """
    
    queryset = ScholarshipApplication.objects.all()
    serializer_class = ScholarshipApplicationSerializer
    permission_classes = [AllowAny]  # Allow public submission
    
    def get_permissions(self):
        """
        Override permissions: Allow anyone to create, 
        but restrict list/retrieve to authenticated users.
        """
        if self.action == 'create':
            return [AllowAny()]
        elif self.action in ['list', 'retrieve', 'update', 'partial_update', 'destroy']:
            from rest_framework.permissions import IsAdminUser
            return [IsAdminUser()]
        return super().get_permissions()
    
    def create(self, request, *args, **kwargs):
        """
        Handle application submission with validation and email notification.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        
        # Send confirmation email
        self.send_confirmation_email(serializer.validated_data)
        
        return Response(
            {
                'message': 'Application submitted successfully',
                'data': serializer.data,
                'status': 'success'
            },
            status=status.HTTP_201_CREATED
        )
    
    def perform_create(self, serializer):
        """Save the application."""
        serializer.save()
    
    @staticmethod
    def send_confirmation_email(data):
        """
        Send confirmation email to the applicant.
        """
        try:
            subject = "Scholarship Application Received - Vamshi Edu Care"
            message = f"""
Dear {data['student_name']},

Thank you for submitting your scholarship application for the {data['course']} course at {data['college']}.

Application Details:
- Student Name: {data['student_name']}
- Email: {data['email']}
- Phone: {data['phone_number']}
- Course: {data['course']}
- Department: {data['department_name']}
- College: {data['college']}

We have received your application and will review it shortly. You will be notified of the outcome via email.

Best regards,
Vamshi Edu Care Team
            """
            
            send_mail(
                subject,
                message,
                settings.DEFAULT_FROM_EMAIL,
                [data['email']],
                fail_silently=True,
            )
        except Exception as e:
            print(f"Error sending confirmation email: {str(e)}")
    
    @action(detail=False, methods=['get'])
    def statistics(self, request):
        """Get application statistics."""
        total = ScholarshipApplication.objects.count()
        by_course = ScholarshipApplication.objects.values('course').count()
        by_college = ScholarshipApplication.objects.values('college').count()
        by_status = dict(
            ScholarshipApplication.objects
            .values('status')
            .annotate(count=models.Count('id'))
            .values_list('status', 'count')
        )
        
        return Response({
            'total_applications': total,
            'by_course': by_course,
            'by_college': by_college,
            'by_status': by_status,
        })
    
    @action(detail=False, methods=['get'])
    def export_csv(self, request):
        """Export all applications as CSV."""
        import csv
        from django.http import HttpResponse
        
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="scholarship_applications.csv"'
        
        writer = csv.writer(response)
        writer.writerow([
            'Student Name', 'Email', 'Phone', 'Date of Birth', 'Aadhar',
            'Father Name', 'Father Phone', 'Mother Name', 'Mother Phone',
            'Address Line 1', 'Address Line 2', 'District', 'Pincode',
            'Course', 'Department', 'College', 'Status', 'Submitted At'
        ])
        
        applications = ScholarshipApplication.objects.all()
        for app in applications:
            writer.writerow([
                app.student_name, app.email, app.phone_number, app.date_of_birth,
                app.aadhar_number, app.father_name, app.father_number, app.mother_name,
                app.mother_number, app.address_line1, app.address_line2, app.district,
                app.pincode, app.course, app.department_name, app.college,
                app.status, app.submitted_at
            ])
        
        return response


# Import models for statistics
from django.db import models
