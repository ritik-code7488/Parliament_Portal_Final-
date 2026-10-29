from rest_framework import viewsets
from .models import Member
from .serializers import MemberSerializer


class MemberViewSet(viewsets.ModelViewSet):
    queryset = Member.objects.all().order_by('id')
    serializer_class = MemberSerializer
