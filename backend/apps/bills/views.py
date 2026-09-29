from rest_framework import viewsets
from .models import Bill
from .serializers import BillSerializer


class BillViewSet(viewsets.ModelViewSet):
    queryset = Bill.objects.all().order_by('-introduction_date')
    serializer_class = BillSerializer