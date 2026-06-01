from django.contrib import admin
from .models import ScholarshipApplication

admin.site.site_header = 'Vamshi Educare Admin'
admin.site.site_title = 'Vamshi Educare Portal'
admin.site.index_title = 'Scholarship Applications Dashboard'


@admin.register(ScholarshipApplication)
class ScholarshipApplicationAdmin(admin.ModelAdmin):
    list_display = ('student_name', 'email', 'college', 'course', 'date_of_birth', 'submitted_at', 'status')
    list_filter = ('college', 'course', 'status', 'submitted_at')
    search_fields = ('student_name', 'email', 'phone_number', 'father_name', 'aadhar_number')
    readonly_fields = ('submitted_at', 'updated_at')
    
    fieldsets = (
        ('Personal Details', {
            'fields': ('student_name', 'phone_number', 'email', 'date_of_birth', 'aadhar_number')
        }),
        ('Parent Details', {
            'fields': ('father_name', 'father_number', 'mother_name', 'mother_number')
        }),
        ('Address Details', {
            'fields': ('address_line1', 'address_line2', 'district', 'pincode')
        }),
        ('Course & College', {
            'fields': ('course', 'department_name', 'college')
        }),
        ('Status & Metadata', {
            'fields': ('status', 'submitted_at', 'updated_at'),
        }),
    )
    
    actions = ['approve_applications', 'reject_applications', 'set_under_review']
    
    def approve_applications(self, request, queryset):
        updated = queryset.update(status='approved')
        self.message_user(request, f"{updated} applications marked as approved.")
    approve_applications.short_description = "Mark selected applications as approved"
    
    def reject_applications(self, request, queryset):
        updated = queryset.update(status='rejected')
        self.message_user(request, f"{updated} applications marked as rejected.")
    reject_applications.short_description = "Mark selected applications as rejected"
    
    def set_under_review(self, request, queryset):
        updated = queryset.update(status='under_review')
        self.message_user(request, f"{updated} applications set to under review.")
    set_under_review.short_description = "Set selected applications to under review"
