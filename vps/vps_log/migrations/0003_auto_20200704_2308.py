# Generated by Django 3.0.8 on 2020-07-04 18:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('vps_log', '0002_logrecords_name'),
    ]

    operations = [
        migrations.CreateModel(
            name='LogRecord',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30, verbose_name='Time')),
                ('price', models.DecimalField(decimal_places=2, max_digits=9, verbose_name='CPU load')),
            ],
        ),
        migrations.DeleteModel(
            name='LogRecords',
        ),
    ]
