# Generated by Django 2.0.1 on 2018-05-12 16:59

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ocurrencia', '0003_ocurrenciainformadoa'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='ocurrencia',
            name='informado_a',
        ),
    ]
