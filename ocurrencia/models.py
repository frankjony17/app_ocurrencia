from django.db import models
from nomenclador.models import MincomPersonaTpl, Trabajador, Estado, DepartamentoUoTpl, InformadoATpl


class TurnoGuardia(models.Model):
    fecha_inicio = models.DateTimeField()
    fecha_cierre = models.DateTimeField()
    superior_mincom = models.ForeignKey(
        MincomPersonaTpl, null=True, related_name='superior_mincom', on_delete=models.CASCADE
    )
    jefe_turno_mincom = models.ForeignKey(
        MincomPersonaTpl, null=True, related_name='jefe_turno_mincom', on_delete=models.CASCADE
    )
    directivo_frente_empresa = models.ForeignKey(Trabajador, on_delete=models.CASCADE)

    class Meta:
        default_permissions = ()
        db_table = 'ocurrencia_turno_guardia'


class EntregaGuardia(models.Model):
    hora = models.TimeField()
    fecha = models.DateField()
    elemento_entrega = models.CharField(max_length=256)
    turno_guardia = models.ForeignKey(TurnoGuardia, on_delete=models.CASCADE)

    class Meta:
        default_permissions = ()
        db_table = 'ocurrencia_entrega_guardia'


class ComposicionTurno(models.Model):
    trabajador = models.ForeignKey(Trabajador, on_delete=models.CASCADE)
    turno_guardia = models.ForeignKey(TurnoGuardia, on_delete=models.CASCADE)

    class Meta:
        default_permissions = ()
        db_table = 'ocurrencia_composicion_turno'


class Ocurrencia(models.Model):
    hora = models.TimeField()
    fecha = models.DateField()
    ocurrencia = models.TextField()
    estado = models.ForeignKey(Estado, on_delete=models.CASCADE)
    reporta = models.ForeignKey(DepartamentoUoTpl, on_delete=models.CASCADE)
    turno_guardia = models.ForeignKey(TurnoGuardia, on_delete=models.CASCADE)

    class Meta:
        default_permissions = ()
        db_table = 'ocurrencia'


class OcurrenciaInformadoA(models.Model):
    ocurrencia = models.ForeignKey(Ocurrencia, on_delete=models.CASCADE)
    informado_a = models.ForeignKey(InformadoATpl, on_delete=models.CASCADE)

    class Meta:
        default_permissions = ()
        db_table = 'ocurrencia_informado_a'


class InstruccionRelevo(models.Model):
    hora = models.TimeField()
    fecha = models.DateField()
    instruccion = models.TextField()
    estado = models.ForeignKey(Estado, on_delete=models.CASCADE)
    emitente = models.ForeignKey(Trabajador, on_delete=models.CASCADE)

    class Meta:
        default_permissions = ()
        db_table = 'ocurrencia_instruccion_relevo'
