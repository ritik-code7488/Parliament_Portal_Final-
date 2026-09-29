from django.contrib import admin
from .models import Question


@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):

    list_display = (
        'question_number',
        'subject',
        'asked_by',
        'house',
        'question_type',
        'date',
        'status',
    )

    search_fields = (
        'question_number',
        'subject',
        'asked_by',
        'question_text',
    )

    list_filter = (
        'house',
        'question_type',
        'status',
        'date',
    )

    ordering = (
        '-date',
    )