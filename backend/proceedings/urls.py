from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProceedingViewSet


router = DefaultRouter()
router.register(r'proceedings', ProceedingViewSet, basename='proceeding')


urlpatterns = [
    path('', include(router.urls)),
]