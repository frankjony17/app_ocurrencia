from ocurrencia.models import TurnoGuardia, ComposicionTurno, Ocurrencia, DepartamentoUoTpl, InformadoATpl, Estado, OcurrenciaInformadoA
from django.contrib.auth.decorators import permission_required
from django.http import JsonResponse, HttpResponse
from django.core.exceptions import ValidationError
from django.shortcuts import render
from datetime import datetime
import json


@permission_required('ocurrencia.OCURRENCIA_PERMISSION')
def index(request):
    now = datetime.now()
    try:
        turno_g = TurnoGuardia.objects.get(
            fecha_inicio__year=now.year, fecha_inicio__month=now.month, fecha_inicio__day=now.day
        )
        # save id turno de guardia on session
        request.session['turno_g_id'] = turno_g.id
        # user esta en turno de guardia.
        if ComposicionTurno.objects.filter(
            turno_guardia=turno_g, trabajador_id=request.user.trabajador.id
        ).exists():  # user pasa a ocurrencias del turno de guardia.
            return render(request, 'ocurrencia_index.html')
        else:  # user no pertenese a turno de guardia, entrar en otro tg.
            return render(request, 'another_user_index.html')
    # no existe turno para el dia de hoy.
    except TurnoGuardia.DoesNotExist:
        if request.user.has_perm('ocurrencia.OCURRENCIA_MANAGER_PERMISSION'):
            return render(request, 'manager_index.html')
        else:
            return render(request, 'another_users_index.html')


@permission_required('ocurrencia.OCURRENCIA_PERMISSION')
def get_turno_guardia(request):
    try:
        turno_g = TurnoGuardia.objects.get(pk=request.session['turno_g_id'])
        data = [{
            'id': turno_g.id,
            'fecha_inicio': turno_g.fecha_inicio.strftime("%Y-%m-%d %H:%I"),
            'fecha_cierre': turno_g.fecha_cierre.strftime("%Y-%m-%d %H:%I")
        }]
        return JsonResponse(data, safe=False)
    except TurnoGuardia.DoesNotExist:
        return JsonResponse([], safe=False)


@permission_required('ocurrencia.OCURRENCIA_PERMISSION')
def composicion_turno(request):
    try:
        turno_g = TurnoGuardia.objects.get(pk=request.session['turno_g_id'])
        frente_empresa = turno_g.directivo_frente_empresa.nombre + " " + turno_g.directivo_frente_empresa.apellidos
        frente_empresa += " (" + turno_g.directivo_frente_empresa.cargo.nombre + ")"
        superior_mincom = turno_g.superior_mincom.nombre + " (" + turno_g.superior_mincom.cargo + ")"
        jefe_turno_mincom = turno_g.jefe_turno_mincom.nombre + " (" + turno_g.superior_mincom.cargo + ")"
        data = []

        for ct in ComposicionTurno.objects.filter(turno_guardia=turno_g):
            data.append({
                'slug': 'COMPOSICIÓN DEL TURNO DE GUARDIA',
                'nombre': ct.trabajador.nombre.upper() + " " + ct.trabajador.apellidos.upper(),
                'cargo': ct.trabajador.cargo.nombre.upper()
            })
        data.append({
            'slug': 'MINCOM',
            'nombre': superior_mincom.upper(),
            'cargo': "SUPERIOR DE GUARDIA"
        })
        data.append({
            'slug': 'MINCOM',
            'nombre': jefe_turno_mincom.upper(),
            'cargo': "JEFE DE TURNO CD"
        })
        data.append({
            'slug': 'ETECSA',
            'nombre': frente_empresa.upper(),
            'cargo': "AL FRENTE DE LA EMPRESA"
        })
        return JsonResponse(data, safe=False)
    except TurnoGuardia.DoesNotExist:
        return JsonResponse([], safe=False)


@permission_required('ocurrencia.OCURRENCIA_PERMISSION')
def ocurrencia_list(request):
    try:
        ids = []
        data = []
        turno_g = TurnoGuardia.objects.get(pk=request.session['turno_g_id'])
        for ocu in Ocurrencia.objects.filter(turno_guardia=turno_g):
            string = ''
            informado_a = OcurrenciaInformadoA.objects.filter(ocurrencia=ocu)
            for inf in informado_a:
                string += inf.informado_a.persona_grupo + ", "
            data.append({
                'id': ocu.id,
                'hora': ocu.hora.strftime("%H:%I"),
                'fecha': ocu.fecha.strftime("%Y-%m-%d"),
                'reporta': ocu.reporta.acronimo,
                'ocurrencia': ocu.ocurrencia,
                'informado_a': string,
                'estado': ocu.estado.nombre
            })
        return JsonResponse(data, safe=False)
    except TurnoGuardia.DoesNotExist:
        return JsonResponse([], safe=False)


@permission_required('ocurrencia.OCURRENCIA_PERMISSION')
def ocurrencia_add(request):
    ocu = Ocurrencia()
    ocu.hora = request.POST['hora']
    ocu.fecha = datetime.now()
    ocu.reporta = DepartamentoUoTpl.objects.get(acronimo=request.POST['reporta'])
    ocu.ocurrencia = request.POST['ocurrencia']
    ocu.estado = Estado.objects.get(nombre=request.POST['estado'])
    ocu.turno_guardia = TurnoGuardia.objects.get(pk=request.session['turno_g_id'])
    try:
        ocu.validate_unique()
        ocu.save()
        for inf in json.loads(request.POST['informado_a']):
            ocu_info_a = OcurrenciaInformadoA()
            ocu_info_a.ocurrencia = ocu
            ocu_info_a.informado_a = InformadoATpl.objects.get(persona_grupo=inf)
            ocu_info_a.validate_unique()
            ocu_info_a.save()
        return HttpResponse()
    except ValidationError as e:
        return HttpResponse(e.messages)


@permission_required('ocurrencia.OCURRENCIA_PERMISSION')
def ocurrencia_edit(request):
    ocu = Ocurrencia.objects.get(pk=request.POST['id'])
    ocu.hora = request.POST['hora']
    ocu.reporta = DepartamentoUoTpl.objects.get(acronimo=request.POST['reporta'])
    ocu.ocurrencia = request.POST['ocurrencia']
    ocu.estado = Estado.objects.get(nombre=request.POST['estado'])
    try:
        ocu.validate_unique()
        ocu.save()
        for ocu_info_a in OcurrenciaInformadoA.objects.filter(ocurrencia=ocu):
            ocu_info_a.delete()
        for inf in json.loads(request.POST['informado_a']):
            ocu_info_a = OcurrenciaInformadoA()
            ocu_info_a.ocurrencia = ocu
            ocu_info_a.informado_a = InformadoATpl.objects.get(persona_grupo=inf)
            ocu_info_a.validate_unique()
            ocu_info_a.save()
        return HttpResponse()
    except ValidationError as e:
        return HttpResponse(e.messages)


@permission_required('ocurrencia.OCURRENCIA_PERMISSION')
def ocurrencia_remove(request):
    for pk in json.loads(request.POST['ids']):
        Ocurrencia.objects.get(pk=pk).delete()
    return HttpResponse('')

