from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from .models import Member


class MemberModelAndAPITest(TestCase):

    def setUp(self):
        self.client = APIClient()
        self.member = Member.objects.create(
            member_id="MP100",
            name="Test Member",
            house="Lok Sabha",
            state="Delhi",
            constituency="New Delhi",
            party="Independent",
            status="Active"
        )

    def test_member_str_representation(self):
        self.assertEqual(str(self.member), "Test Member")
        self.assertEqual(self.member.member_id, "MP100")

    def test_member_list_api(self):
        response = self.client.get('/api/members/members/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(len(response.data) >= 1)
