from django.contrib.auth import authenticate
from django.contrib.auth.models import User

from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny

from rest_framework_simplejwt.tokens import RefreshToken


@api_view(["POST"])
@permission_classes([AllowAny])
def login_view(request):
    username = request.data.get("username")
    password = request.data.get("password")

    if not username or not password:
        return Response(
            {
                "success": False,
                "message": "Username and password are required."
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    user = authenticate(
        username=username,
        password=password
    )

    if user is None:
        return Response(
            {
                "success": False,
                "message": "Invalid username or password."
            },
            status=status.HTTP_401_UNAUTHORIZED
        )

    if not user.is_active:
        return Response(
            {
                "success": False,
                "message": "This account is inactive."
            },
            status=status.HTTP_403_FORBIDDEN
        )

    refresh = RefreshToken.for_user(user)

    u_role = "admin" if (user.is_staff or user.is_superuser or "admin" in user.username.lower()) else ("mp" if user.username.upper().startswith("MP") else "citizen")

    return Response(
        {
            "success": True,
            "message": "Login successful.",
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "user": {
                "id": user.id,
                "username": user.username,
                "full_name": f"{user.first_name} {user.last_name}".strip() or user.username,
                "email": user.email,
                "role": u_role,
                "is_staff": user.is_staff,
                "is_superuser": user.is_superuser,
            }
        },
        status=status.HTTP_200_OK
    )


@api_view(["POST"])
@permission_classes([AllowAny])
def register_view(request):
    username = request.data.get("username", "").strip()
    password = request.data.get("password", "")
    email = request.data.get("email", "").strip()
    full_name = request.data.get("full_name", "").strip()
    role = request.data.get("role", "citizen").strip().lower()
    state = request.data.get("state", "").strip()
    constituency = request.data.get("constituency", "").strip()
    phone = request.data.get("phone", "").strip()

    if not username or not password:
        return Response(
            {
                "success": False,
                "message": "Username and password are required for registration."
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    if User.objects.filter(username__iexact=username).exists():
        return Response(
            {
                "success": False,
                "message": f"User ID '{username}' is already registered."
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    # Split full name into first and last name
    name_parts = full_name.split(" ", 1)
    first_name = name_parts[0] if name_parts else ""
    last_name = name_parts[1] if len(name_parts) > 1 else ""

    user = User.objects.create_user(
        username=username,
        email=email,
        password=password,
        first_name=first_name,
        last_name=last_name
    )

    if role == "admin":
        user.is_staff = True
        user.save()

    refresh = RefreshToken.for_user(user)

    return Response(
        {
            "success": True,
            "message": "Account created successfully.",
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "user": {
                "id": user.id,
                "username": user.username,
                "full_name": full_name or user.username,
                "email": user.email,
                "role": role,
                "state": state,
                "constituency": constituency,
                "phone": phone,
                "date_joined": user.date_joined.strftime("%Y-%m-%d"),
                "is_active": user.is_active,
            }
        },
        status=status.HTTP_201_CREATED
    )


@api_view(["GET"])
@permission_classes([AllowAny])
def users_list_view(request):
    """
    Returns list of registered users for Admin Management Registry.
    """
    users = User.objects.all().order_by("-date_joined")
    users_data = []
    for u in users:
        u_role = "admin" if (u.is_staff or u.is_superuser or "admin" in u.username.lower()) else ("mp" if u.username.upper().startswith("MP") else "citizen")
        users_data.append({
            "id": u.id,
            "username": u.username,
            "full_name": f"{u.first_name} {u.last_name}".strip() or u.username,
            "email": u.email or "—",
            "role": u_role,
            "is_active": u.is_active,
            "date_joined": u.date_joined.strftime("%Y-%m-%d"),
        })

    return Response(
        {
            "success": True,
            "count": len(users_data),
            "users": users_data
        },
        status=status.HTTP_200_OK
    )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def protected_test_view(request):
    return Response(
        {
            "success": True,
            "message": "You are authenticated.",
            "user": {
                "id": request.user.id,
                "username": request.user.username,
                "email": request.user.email,
            }
        },
        status=status.HTTP_200_OK
    )