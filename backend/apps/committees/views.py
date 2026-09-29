from rest_framework import viewsets

from .models import Committee
from .serializers import CommitteeSerializer


class CommitteeViewSet(viewsets.ModelViewSet):

    queryset = Committee.objects.all().order_by('name')

    serializer_class = CommitteeSerializer