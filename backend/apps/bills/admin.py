from django.contrib import admin
from .models import Bill


@admin.register(Bill)
class BillAdmin(admin.ModelAdmin):

    list_display = (
        'bill_number',
        'title',
        'house',
        'introduced_by',
        'introduction_date',
        'status',
    )

    search_fields = (
        'bill_number',
        'title',
        'introduced_by',
    )

    list_filter = (
        'house',
        'status',
        'introduction_date',
    )