from rest_framework import serializers

from .models import Committee
from apps.members.serializers import MemberSerializer


class CommitteeSerializer(serializers.ModelSerializer):

    members = MemberSerializer(
        many=True,
        read_only=True
    )

    class Meta:
        model = Committee
        fields = '__all__'