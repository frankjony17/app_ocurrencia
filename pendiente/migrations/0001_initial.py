# Generated by Django 2.0.1 on 2018-05-20 14:06

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Elemento',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('descripcion', models.TextField(max_length=120)),
            ],
            options={
                'default_permissions': (),
                'db_table': 'pendiente_elemento',
            },
        ),
        migrations.CreateModel(
            name='Estado',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.TextField(max_length=120)),
                ('color', models.TextField(max_length=10)),
            ],
            options={
                'default_permissions': (),
                'db_table': 'pendiente_estado',
            },
        ),
        migrations.CreateModel(
            name='Pendiente',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fecha_hora', models.DateTimeField()),
                ('numero_he', models.TextField(max_length=17)),
                ('descripcion', models.TextField()),
                ('pronostico', models.DateField(null=True)),
                ('estado', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='pendiente.Estado')),
            ],
            options={
                'default_permissions': (),
                'db_table': 'pendiente',
            },
        ),
        migrations.CreateModel(
            name='PendienteElemento',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('elemento', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='pendiente.Elemento')),
                ('pendiente', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='pendiente.Pendiente')),
            ],
            options={
                'default_permissions': (),
                'db_table': 'pendiente_pendiente',
            },
        ),
        migrations.CreateModel(
            name='Tipo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.TextField(max_length=120)),
                ('descripcion', models.TextField(max_length=120)),
            ],
            options={
                'default_permissions': (),
                'db_table': 'pendiente_tipo',
            },
        ),
        migrations.AddField(
            model_name='pendiente',
            name='tipo',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='pendiente.Tipo'),
        ),
    ]
