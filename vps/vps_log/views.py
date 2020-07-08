# -*- coding: utf-8 -*-
from decimal import Decimal
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView

from vps_log.serializer import LogRecordSerializer
from vps_log.models import LogRecord

def baseView(request):
    return render(request, 'index.html')


class LogRecordListCreate(APIView):    
    def get(self, request):
        records = LogRecord.objects.all()
        serializer = LogRecordSerializer(records, many=True)
        return Response({'records': serializer.data})

    def post(self, request):
        records = LogRecord.objects.all()
        if len(records) == 100:
            records[0].delete()
        record = request.data.get('record')
        serializer = LogRecordSerializer(data=record)
        if serializer.is_valid(raise_exception=True):
            record_saved = serializer.save()
        return Response({'success': 'LogRecord {} created successfully'.format(record_saved.name)})
