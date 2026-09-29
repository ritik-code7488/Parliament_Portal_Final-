from rest_framework import viewsets
from .models import Proceeding
from .serializers import ProceedingSerializer


class ProceedingViewSet(viewsets.ModelViewSet):
    queryset = Proceeding.objects.all().order_by('-proceeding_date')
    serializer_class = ProceedingSerializer