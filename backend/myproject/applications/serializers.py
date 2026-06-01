from rest_framework import serializers
from .models import ScholarshipApplication


class ScholarshipApplicationSerializer(serializers.ModelSerializer):
    """Serializer for ScholarshipApplication model."""
    
    class Meta:
        model = ScholarshipApplication
        fields = [
            'id',
            'student_name',
            'phone_number',
            'date_of_birth',
            'email',
            'aadhar_number',
            'father_name',
            'father_number',
            'mother_name',
            'mother_number',
            'address_line1',
            'address_line2',
            'district',
            'pincode',
            'course',
            'department_name',
            'college',
            'status',
            'submitted_at',
            'updated_at',
        ]
        read_only_fields = ['id', 'submitted_at', 'updated_at', 'status']
    
    def validate_phone_number(self, value):
        """Validate phone number is 10 digits."""
        if not value.isdigit() or len(value) != 10:
            raise serializers.ValidationError("Phone number must be 10 digits.")
        return value
    
    def validate_aadhar_number(self, value):
        """Validate Aadhar number is 12 digits."""
        if not value.isdigit() or len(value) != 12:
            raise serializers.ValidationError("Aadhar number must be 12 digits.")
        return value
    
    def validate_pincode(self, value):
        """Validate pincode is 6 digits."""
        if not value.isdigit() or len(value) != 6:
            raise serializers.ValidationError("Pincode must be 6 digits.")
        return value
    
    def validate_father_number(self, value):
        """Validate father phone number is 10 digits."""
        if not value.isdigit() or len(value) != 10:
            raise serializers.ValidationError("Father's phone number must be 10 digits.")
        return value
    
    def validate_mother_number(self, value):
        """Validate mother phone number is 10 digits if provided."""
        if value and (not value.isdigit() or len(value) != 10):
            raise serializers.ValidationError("Mother's phone number must be 10 digits.")
        return value
