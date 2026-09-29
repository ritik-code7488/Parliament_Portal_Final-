from django.contrib import admin
from .models import Notification


@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):

    list_display = (
        "member_id",
        "title",
        "notification_type",
        "priority",
        "is_read",
        "created_at",
    )

    list_filter = (
        "notification_type",
        "priority",
        "is_read",
        "created_at",
    )

    search_fields = (
        "member_id",
        "title",
        "message",
    )

    ordering = (
        "-created_at",
    )