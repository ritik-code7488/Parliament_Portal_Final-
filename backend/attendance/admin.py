from django.contrib import admin
from .models import Attendance


@admin.register(Attendance)
class AttendanceAdmin(admin.ModelAdmin):

    list_display = (
        "member_id",
        "member_name",
        "house",
        "attendance_date",
        "status",
        "remarks",
    )

    list_filter = (
        "house",
        "status",
        "attendance_date",
    )

    search_fields = (
        "member_id",
        "member_name",
        "remarks",
    )

    ordering = (
        "-attendance_date",
    )