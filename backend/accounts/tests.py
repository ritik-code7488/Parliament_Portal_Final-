from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.test import APIClient
from rest_framework import status


class AccountAuthAPITest(TestCase):

    def setUp(self):
        self.client = APIClient()
        self.username = "test_mp"
        self.password = "SecurePassword123"
        self.user = User.objects.create_user(
            username=self.username,
            password=self.password,
            email="test_mp@parliament.nic.in"
        )

    def test_jwt_login_success(self):
        payload = {
            "username": self.username,
            "password": self.password
        }
        response = self.client.post('/api/auth/login/', payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data.get("success"))
        self.assertIn("access", response.data)
        self.assertIn("refresh", response.data)

    def test_jwt_login_invalid_password(self):
        payload = {
            "username": self.username,
            "password": "WrongPassword"
        }
        response = self.client.post('/api/auth/login/', payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertFalse(response.data.get("success"))
