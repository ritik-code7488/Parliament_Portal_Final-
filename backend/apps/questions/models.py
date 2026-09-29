from django.db import models


class Question(models.Model):

    HOUSE_CHOICES = [
        ('Lok Sabha', 'Lok Sabha'),
        ('Rajya Sabha', 'Rajya Sabha'),
    ]

    TYPE_CHOICES = [
        ('Starred', 'Starred'),
        ('Unstarred', 'Unstarred'),
    ]

    STATUS_CHOICES = [
        ('Answered', 'Answered'),
        ('Pending', 'Pending'),
    ]

    question_number = models.CharField(
        max_length=50,
        unique=True
    )

    subject = models.CharField(
        max_length=255
    )

    question_text = models.TextField()

    asked_by = models.CharField(
        max_length=150
    )

    house = models.CharField(
        max_length=30,
        choices=HOUSE_CHOICES
    )

    question_type = models.CharField(
        max_length=30,
        choices=TYPE_CHOICES
    )

    date = models.DateField()

    status = models.CharField(
        max_length=30,
        choices=STATUS_CHOICES
    )

    answer = models.TextField(
        blank=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return f"{self.question_number} - {self.subject}"
