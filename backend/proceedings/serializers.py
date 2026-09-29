from rest_framework import serializers
from .models import Proceeding


class ProceedingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Proceeding
        fields = '__all__'