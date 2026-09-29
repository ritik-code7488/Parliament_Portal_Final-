from django.db import models


class Attendance(models.Model):
    member_id = models.CharField(max_length=50)
    member_name = models.CharField(max_length=200)
    house = models.CharField(max_length=50)
    attendance_date = models.DateField()
    status = models.CharField(
        max_length=20,
        choices=[
            ('Present', 'Present'),
            ('Absent', 'Absent'),
            ('Leave', 'Leave'),
        ]
    )
    remarks = models.TextField(blank=True, default='')

    def __str__(self):
        return f"{self.member_name} - {self.attendance_date}"