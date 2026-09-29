from django.db import models


class Bill(models.Model):
    bill_number = models.CharField(max_length=50, unique=True)
    title = models.CharField(max_length=255)
    description = models.TextField()

    house = models.CharField(
        max_length=30,
        choices=[
            ('Lok Sabha', 'Lok Sabha'),
            ('Rajya Sabha', 'Rajya Sabha'),
        ]
    )

    introduced_by = models.CharField(max_length=150)

    introduction_date = models.DateField()

    status = models.CharField(
        max_length=50,
        choices=[
            ('Introduced', 'Introduced'),
            ('Under Discussion', 'Under Discussion'),
            ('Passed', 'Passed'),
            ('Rejected', 'Rejected'),
            ('Withdrawn', 'Withdrawn'),
        ]
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.bill_number} - {self.title}"