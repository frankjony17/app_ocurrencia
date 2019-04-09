from django.db import models


class Tipo(models.Model):
    nombre = models.TextField(max_length=120)
    descripcion = models.TextField(max_length=120)

    class Meta:
        default_permissions = ()
        db_table = 'pendiente_tipo'


class Estado(models.Model):
    nombre = models.TextField(max_length=120)
    color = models.TextField(max_length=10)

    class Meta:
        default_permissions = ()
        db_table = 'pendiente_estado'


class Elemento(models.Model):
    descripcion = models.TextField(max_length=120)

    class Meta:
        default_permissions = ()
        db_table = 'pendiente_elemento'


class Pendiente(models.Model):
    fecha_hora = models.DateTimeField()
    numero_he = models.TextField(max_length=17)
    descripcion = models.TextField()
    pronostico = models.DateField(null=True)
    tipo = models.ForeignKey(Tipo, on_delete=models.CASCADE)
    estado = models.ForeignKey(Estado, on_delete=models.CASCADE)

    class Meta:
        default_permissions = ()
        db_table = 'pendiente'


class PendienteElemento(models.Model):
    elemento = models.ForeignKey(Elemento, on_delete=models.CASCADE)
    pendiente = models.ForeignKey(Pendiente, on_delete=models.CASCADE)

    class Meta:
        default_permissions = ()
        db_table = 'pendiente_pendiente'


