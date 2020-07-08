from rest_framework import serializers
from vps_log.models import LogRecord

class LogRecordSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=30)
    load = serializers.DecimalField(max_digits=6, decimal_places=2)

    def create(self, validated_data):
        return LogRecord.objects.create(**validated_data)