from django.contrib.auth import authenticate

from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from rest_framework_simplejwt.tokens import RefreshToken


@api_view(["POST"])
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

    return Response(
        {
            "success": True,
            "message": "Login successful.",
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "is_staff": user.is_staff,
                "is_superuser": user.is_superuser,
            }
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