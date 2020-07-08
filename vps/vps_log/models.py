# -*- coding: utf-8 -*-
from django.db import models

class LogRecord(models.Model):
    name = models.CharField(max_length=30, verbose_name=('Time'))
    load = models.DecimalField(max_digits=6, decimal_places=2, verbose_name=('CPU load'))

    def __str__(self):
        return self.name