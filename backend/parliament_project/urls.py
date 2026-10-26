from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse


def api_root_view(request):
    return JsonResponse({
        "status": "online",
        "message": "Parliament Portal Backend API is running successfully.",
        "endpoints": {
            "admin": "/admin/",
            "members": "/api/members/members/",
            "bills": "/api/bills/bills/",
            "questions": "/api/questions/questions/",
            "committees": "/api/committees/committees/",
            "proceedings": "/api/proceedings/proceedings/",
            "attendance": "/api/attendance/attendance/",
            "documents": "/api/documents/documents/",
            "notifications": "/api/notifications/notifications/",
            "auth_login": "/api/auth/login/",
        }
    })


urlpatterns = [

    # API Root Status
    path('', api_root_view),

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