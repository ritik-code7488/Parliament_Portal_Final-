from django.contrib import admin
from .models import Document


@admin.register(Document)
class DocumentAdmin(admin.ModelAdmin):
    list_display = (
        'document_id',
        'title',
        'document_type',
        'house',
        'document_date',
        'status',
    )

    list_filter = (
        'document_type',
        'house',
        'status',
    )

    search_fields = (
        'document_id',
        'title',
        'description',
        'file_name',
    )

    ordering = (
        '-created_at',
    )