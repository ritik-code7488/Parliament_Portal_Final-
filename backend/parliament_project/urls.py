from django.contrib import admin
from django.urls import path, include


urlpatterns = [

    # Django Admin
    path('admin/', admin.site.urls),

    # Members API
    path('api/members/', include('apps.members.urls')),

    # Bills API
    path('api/bills/', include('apps.bills.urls')),

    # Questions API
    path('api/questions/', include('apps.questions.urls')),

    # Committees API
    path('api/committees/', include('apps.committees.urls')),

    # Authentication API
    path('api/auth/', include('accounts.urls')),

    # Proceedings API
    path('api/proceedings/', include('proceedings.urls')),

    # Attendance API
    path('api/attendance/', include('attendance.urls')),

    # Notifications API
    path('api/notifications/', include('notifications.urls')),

    # Documents API
    path('api/documents/', include('documents.urls')),
]