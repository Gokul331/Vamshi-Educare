from django.contrib import admin
from django.urls import path, include
from django.views.generic import RedirectView

urlpatterns = [
    # Named `index` for compatibility with admin_modernize templates
    path('', RedirectView.as_view(url='/admin/', permanent=False), name='index'),
    path('admin/', admin.site.urls),
    path('api/', include('applications.urls')),
]
