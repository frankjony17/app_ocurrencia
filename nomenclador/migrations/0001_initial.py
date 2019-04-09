# Generated by Django 2.0.1 on 2018-03-23 00:58

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Cargo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=45, unique=True)),
                ('descripcion', models.CharField(max_length=74)),
            ],
            options={
                'default_permissions': (),
            },
        ),
        migrations.CreateModel(
            name='DepartamentoUoTpl',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=80, unique=True)),
                ('acronimo', models.CharField(max_length=15, unique=True)),
                ('telefonos', models.CharField(max_length=45)),
                ('email', models.EmailField(blank=True, max_length=70)),
            ],
            options={
                'db_table': 'nomenclador_departamento_uo_tpl',
                'default_permissions': (),
            },
        ),
        migrations.CreateModel(
            name='Estado',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=45, unique=True)),
                ('descripcion', models.CharField(max_length=74)),
            ],
            options={
                'default_permissions': (),
            },
        ),
        migrations.CreateModel(
            name='InformadoATpl',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('persona_grupo', models.CharField(max_length=45, unique=True)),
            ],
            options={
                'db_table': 'nomenclador_informado_a_tpl',
                'default_permissions': (),
            },
        ),
        migrations.CreateModel(
            name='MincomPersonaTpl',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=45, unique=True)),
                ('cargo', models.CharField(max_length=74)),
            ],
            options={
                'db_table': 'nomenclador_mincom_persona_tpl',
                'default_permissions': (),
            },
        ),
        migrations.CreateModel(
            name='Trabajador',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=23)),
                ('apellidos', models.CharField(max_length=23)),
                ('cargo', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='nomenclador.Cargo')),
            ],
            options={
                'default_permissions': (),
            },
        ),
        migrations.CreateModel(
            name='UnidadOrganizativa',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=80, unique=True)),
                ('acronimo', models.CharField(max_length=15, unique=True)),
            ],
            options={
                'db_table': 'nomenclador_unidad_organizativa',
                'default_permissions': (),
            },
        ),
        migrations.AddField(
            model_name='trabajador',
            name='unidad_organizativa',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='nomenclador.UnidadOrganizativa'),
        ),
    ]
