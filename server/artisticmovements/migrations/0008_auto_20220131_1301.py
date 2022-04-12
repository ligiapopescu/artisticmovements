# Generated by Django 3.2.5 on 2022-01-31 11:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('artisticmovements', '0007_auto_20220131_1259'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='artist',
            name='created_at',
        ),
        migrations.RemoveField(
            model_name='artwork',
            name='created_at',
        ),
        migrations.AddField(
            model_name='artist',
            name='created_on',
            field=models.DateTimeField(auto_now_add=True, default='2022-01-31 12:00'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='artwork',
            name='created_on',
            field=models.DateTimeField(auto_now_add=True, default='2022-01-31 12:00'),
            preserve_default=False,
        ),
    ]