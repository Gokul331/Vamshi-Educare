from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ScholarshipApplicationViewSet

router = DefaultRouter()
router.register(r'applications', ScholarshipApplicationViewSet, basename='scholarship-application')

app_name = 'applications'

urlpatterns = [
    path('', include(router.urls)),
]
