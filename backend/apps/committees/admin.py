from django.contrib import admin
from .models import Committee


@admin.register(Committee)
class CommitteeAdmin(admin.ModelAdmin):

    list_display = (
        'name',
        'chairperson',
        'department',
        'house',
        'member_count',
        'status',
        'established_date',
    )

    search_fields = (
        'name',
        'chairperson',
        'department',
    )

    list_filter = (
        'house',
        'status',
        'established_date',
    )

    ordering = (
        'name',
    )