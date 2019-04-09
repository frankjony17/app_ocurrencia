from django.contrib.auth.decorators import permission_required
from ocurrencia.models import TurnoGuardia, ComposicionTurno
from nomenclador.models import Trabajador, MincomPersonaTpl
from django.http import JsonResponse, HttpResponse
from django.core.exceptions import ValidationError
from datetime import datetime
import json


@permission_required('ocurrencia.OCURRENCIA_PERMISSION')
def listar(request):
    now = datetime.now()
    data = []
    turno_g = TurnoGuardia.objects.exclude(
        fecha_inicio__year=now.year, fecha_inicio__month=now.month, fecha_inicio__day=now.day
    )
    if 'year' in request.GET and request.GET['year'] is not '':
        turno_g = turno_g.filter(
            fecha_inicio__year=request.GET['year']
        )
    if 'month' in request.GET and request.GET['month'] is not '':
        turno_g = turno_g.filter(
            fecha_inicio__month=request.GET['month']
        )
    if 'day' in request.GET and request.GET['day'] is not '':
        turno_g = turno_g.filter(
            fecha_inicio__day=request.GET['day']
        )
    for tg in turno_g:
        nombre = tg.directivo_frente_empresa.nombre + " " + tg.directivo_frente_empresa.apellidos
        nombre += " (" + tg.directivo_frente_empresa.cargo.nombre + ")"
        superior_mincom = tg.superior_mincom.nombre + " (" + tg.superior_mincom.cargo + ")"
        jefe_turno_mincom = tg.jefe_turno_mincom.nombre + " (" + tg.superior_mincom.cargo + ")"
        data.append({
            'id': tg.id,
            'fecha_inicio': tg.fecha_inicio.strftime("%Y-%m-%d %H:%I"),
            'fecha_cierre': tg.fecha_cierre.strftime("%Y-%m-%d %H:%I"),
            'superior_mincom': "SUPERIOR DE GUARDIA DEL MINCOM: " + superior_mincom,
            'jefe_turno_mincom': "JEFE DE TURNO CD MINCOM: " + jefe_turno_mincom,
            'directivo_frente_empresa': "AL FRENTE DE LA EMPRESA: " + nombre
        })
    return JsonResponse(data, safe=False)


@permission_required('ocurrencia.OCURRENCIA_PERMISSION')
def list_year(request):
    data = []
    for tg in TurnoGuardia.objects.filter().distinct():
        data.append({
            'year': tg.fecha_inicio.strftime("%Y")
        })
    return JsonResponse(data, safe=False)


@permission_required('ocurrencia.OCURRENCIA_MANAGER_PERMISSION')
def add(request):
    tg = TurnoGuardia()
    tg.fecha_inicio = request.POST['fecha_inicio']
    tg.fecha_cierre = request.POST['fecha_cierre']
    tg.directivo_frente_empresa = Trabajador.objects.get(pk=request.POST['frente_empresa'])
    tg.jefe_turno_mincom = MincomPersonaTpl.objects.get(pk=request.POST['jefe_turno'])
    tg.superior_mincom = MincomPersonaTpl.objects.get(pk=request.POST['supervisor_guardia'])
    try:
        tg.validate_unique()
        tg.save()
        for pk in json.loads(request.POST['trabajador_guardia']):
            ct = ComposicionTurno()
            ct.turno_guardia = tg
            ct.trabajador = Trabajador.objects.get(pk=pk)
            ct.validate_unique()
            ct.save()
        return HttpResponse()
    except ValidationError as e:
        return HttpResponse(e.messages)


# @permission_required('security.ADMIN_PERMISSION')
# def edit(request):
#     try:
#         c = Cargo.objects.get(pk=request.POST['id'])
#         c.nombre = request.POST['nombre']
#         c.descripcion = request.POST['descripcion']
#         c.validate_unique()
#         c.save()
#         return HttpResponse('ok')
#     except ValidationError as e:
#         return HttpResponse(e.messages)
#
#
# @permission_required('security.ADMIN_PERMISSION')
# def remove(request):
#     for pk in json.loads(request.POST['ids']):
#         Cargo.objects.get(pk=pk).delete()
#     return HttpResponse('')
