from django.db import models


class UnidadOrganizativa(models.Model):
    nombre = models.CharField(max_length=80, unique=True)
    acronimo = models.CharField(max_length=15, unique=True)

    class Meta:
        db_table = 'nomenclador_unidad_organizativa'
        default_permissions = ()


class DepartamentoUoTpl(models.Model):
    nombre = models.CharField(max_length=80, unique=True)
    acronimo = models.CharField(max_length=15, unique=True)
    telefonos = models.CharField(max_length=45)
    email = models.EmailField(max_length=70, blank=True)

    class Meta:
        default_permissions = ()
        db_table = 'nomenclador_departamento_uo_tpl'


class Cargo(models.Model):
    nombre = models.CharField(max_length=45, unique=True)
    descripcion = models.CharField(max_length=74)

    class Meta:
        default_permissions = ()


class Trabajador(models.Model):
    nombre = models.CharField(max_length=23)
    apellidos = models.CharField(max_length=23)
    cargo = models.ForeignKey(Cargo, on_delete=models.CASCADE)
    unidad_organizativa = models.ForeignKey(UnidadOrganizativa, on_delete=models.CASCADE)

    class Meta:
        default_permissions = ()
        unique_together = ("nombre", "apellidos")


class Estado(models.Model):
    nombre = models.CharField(max_length=45, unique=True)
    descripcion = models.CharField(max_length=74)

    class Meta:
        default_permissions = ()


class MincomPersonaTpl(models.Model):
    nombre = models.CharField(max_length=45, unique=True)
    cargo = models.CharField(max_length=74)

    class Meta:
        default_permissions = ()
        db_table = 'nomenclador_mincom_persona_tpl'


class InformadoATpl(models.Model):
    persona_grupo = models.CharField(max_length=45, unique=True)

    class Meta:
        default_permissions = ()
        db_table = 'nomenclador_informado_a_tpl'
