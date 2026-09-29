from django.db import models


class Document(models.Model):
    document_id = models.CharField(max_length=50, unique=True)
    title = models.CharField(max_length=200)
    document_type = models.CharField(
        max_length=50,
        choices=[
            ('Bill', 'Bill'),
            ('Question', 'Question'),
            ('Proceeding', 'Proceeding'),
            ('Committee', 'Committee'),
            ('Report', 'Report'),
            ('Other', 'Other'),
        ],
        default='Other'
    )
    description = models.TextField(blank=True, default='')
    house = models.CharField(max_length=50, blank=True, default='')
    document_date = models.DateField(null=True, blank=True)
    file_name = models.CharField(max_length=255, blank=True, default='')
    file_url = models.URLField(blank=True, default='')
    status = models.CharField(
        max_length=30,
        choices=[
            ('Available', 'Available'),
            ('Archived', 'Archived'),
        ],
        default='Available'
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.document_id} - {self.title}"