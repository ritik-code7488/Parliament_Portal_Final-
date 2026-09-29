from django.db import models


class Member(models.Model):
    member_id = models.CharField(max_length=20, unique=True)
    name = models.CharField(max_length=100)
    house = models.CharField(max_length=20)
    state = models.CharField(max_length=100)
    constituency = models.CharField(max_length=100)
    party = models.CharField(max_length=100)
    status = models.CharField(max_length=50)
    date_of_birth = models.DateField(null=True, blank=True)
    gender = models.CharField(max_length=20, blank=True)
    education = models.CharField(max_length=200, blank=True)
    profession = models.CharField(max_length=100, blank=True)
    address = models.TextField(blank=True)
    email = models.EmailField(blank=True)
    phone = models.CharField(max_length=20, blank=True)
    joining_date = models.DateField(null=True, blank=True)
    photo = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return self.name