from django.contrib import admin
from .models import Proceeding


@admin.register(Proceeding)
class ProceedingAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "house",
        "proceeding_date",
        "proceeding_type",
        "status",
    )

    list_filter = (
        "house",
        "proceeding_type",
        "status",
    )

    search_fields = (
        "title",
        "description",
    )

    ordering = (
        "-proceeding_date",
    )