# Generated by Django 3.0.5 on 2020-07-07 16:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('vps_log', '0006_auto_20200706_2204'),
    ]

    operations = [
        migrations.AlterField(
            model_name='logrecord',
            name='load',
            field=models.CharField(max_length=10, verbose_name='CPU load'),
        ),
    ]
