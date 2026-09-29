from django.db import models


class Proceeding(models.Model):
    title = models.CharField(max_length=255)
    house = models.CharField(max_length=50)
    proceeding_date = models.DateField()
    proceeding_type = models.CharField(max_length=100)
    description = models.TextField()
    status = models.CharField(max_length=50, default="Published")
    document_url = models.URLField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title