from django.db import models
from apps.members.models import Member


class Committee(models.Model):

    STATUS_CHOICES = [
        ('Active', 'Active'),
        ('Inactive', 'Inactive'),
    ]

    name = models.CharField(
        max_length=200
    )

    chairperson = models.CharField(
        max_length=150
    )

    department = models.CharField(
        max_length=200
    )

    house = models.CharField(
        max_length=30,
        choices=[
            ('Lok Sabha', 'Lok Sabha'),
            ('Rajya Sabha', 'Rajya Sabha'),
            ('Both Houses', 'Both Houses'),
        ]
    )

    description = models.TextField(
        blank=True
    )

    members = models.ManyToManyField(
        Member,
        blank=True,
        related_name='committees'
    )

    member_count = models.PositiveIntegerField(
        default=0
    )

    status = models.CharField(
        max_length=30,
        choices=STATUS_CHOICES,
        default='Active'
    )

    established_date = models.DateField(
        null=True,
        blank=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.name
