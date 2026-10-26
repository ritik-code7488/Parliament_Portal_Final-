from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from datetime import date
from .models import Question


class QuestionModelAndAPITest(TestCase):

    def setUp(self):
        self.client = APIClient()
        self.question = Question.objects.create(
            question_number="Q-999",
            subject="Infrastructure in Rural Areas",
            question_text="What are the latest progress reports on road development?",
            asked_by="Hon'ble Member",
            house="Lok Sabha",
            question_type="Starred",
            date=date(2026, 9, 1),
            status="Pending"
        )

    def test_question_str_representation(self):
        self.assertIn("Q-999", str(self.question))

    def test_question_list_api(self):
        response = self.client.get('/api/questions/questions/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(len(response.data) >= 1)

    def test_question_create_api(self):
        payload = {
            "question_number": "Q-888",
            "subject": "Solar Energy Deployment",
            "question_text": "What steps are taken to promote rooftop solar panels?",
            "asked_by": "Test MP",
            "house": "Rajya Sabha",
            "question_type": "Unstarred",
            "date": "2026-09-05",
            "status": "Pending"
        }
        response = self.client.post('/api/questions/questions/', payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
