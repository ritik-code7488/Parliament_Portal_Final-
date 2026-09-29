from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Notification
from .serializers import NotificationSerializer


class NotificationViewSet(viewsets.ModelViewSet):

    queryset = Notification.objects.all().order_by('-created_at')

    serializer_class = NotificationSerializer

    @action(detail=True, methods=['patch'])
    def mark_read(self, request, pk=None):

        notification = self.get_object()

        notification.is_read = True

        notification.save()

        return Response({
            'message': 'Notification marked as read',
            'notification': NotificationSerializer(notification).data
        })