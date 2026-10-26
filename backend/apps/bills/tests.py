from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from datetime import date
from .models import Bill


class BillModelAndAPITest(TestCase):

    def setUp(self):
        self.client = APIClient()
        self.bill = Bill.objects.create(
            bill_number="BILL-101",
            title="Digital Data Protection Bill",
            description="A bill to provide for the protection of digital personal data.",
            house="Lok Sabha",
            introduced_by="Minister of Electronics and IT",
            introduction_date=date(2026, 8, 15),
            status="Introduced"
        )

    def test_bill_str_representation(self):
        self.assertIn("BILL-101", str(self.bill))
        self.assertIn("Digital Data Protection Bill", str(self.bill))

    def test_bill_list_api(self):
        response = self.client.get('/api/bills/bills/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(len(response.data) >= 1)
