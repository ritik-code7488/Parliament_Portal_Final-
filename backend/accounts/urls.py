from django.urls import path
from . import views


urlpatterns = [
    path("login/", views.login_view, name="login"),
    path("register/", views.register_view, name="register"),
    path("users/", views.users_list_view, name="users_list"),
    path("protected/", views.protected_test_view, name="protected"),
]
