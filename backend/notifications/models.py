from django.db import models


class Notification(models.Model):

    member_id = models.CharField(
        max_length=50,
        blank=True,
        default=''
    )

    title = models.CharField(
        max_length=200
    )

    message = models.TextField()

    notification_type = models.CharField(
        max_length=30,
        choices=[
            ('General', 'General'),
            ('Attendance', 'Attendance'),
            ('Bill', 'Bill'),
            ('Question', 'Question'),
            ('Proceeding', 'Proceeding'),
        ],
        default='General'
    )

    priority = models.CharField(
        max_length=20,
        choices=[
            ('Normal', 'Normal'),
            ('Important', 'Important'),
            ('Urgent', 'Urgent'),
        ],
        default='Normal'
    )

    is_read = models.BooleanField(
        default=False
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.title