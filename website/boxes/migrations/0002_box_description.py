# Generated by Django 5.0.3 on 2024-03-10 21:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('boxes', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='box',
            name='description',
            field=models.CharField(default='None', max_length=1000),
            preserve_default=False,
        ),
    ]
