from django.contrib import admin
from .models import Member


@admin.register(Member)
class MemberAdmin(admin.ModelAdmin):
    list_display = (
        'member_id',
        'name',
        'house',
        'state',
        'constituency',
        'party',
        'status',
    )

    search_fields = (
        'member_id',
        'name',
        'state',
        'constituency',
        'party',
    )

    list_filter = (
        'house',
        'state',
        'party',
        'status',
    )