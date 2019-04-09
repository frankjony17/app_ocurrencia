from pendiente.models import Pendiente, Estado, Tipo, Elemento, PendienteElemento
from django.contrib.auth.decorators import permission_required
from django.http import JsonResponse, HttpResponse
from django.core.exceptions import ValidationError
from datetime import datetime
import json


@permission_required('ocurrencia.OCURRENCIA_PERMISSION')
def listar(request):
    data = []
    pendientes = Pendiente.objects.all().exclude(
        pendienteelemento__elemento__descripcion='ANÁLISIS OPERATIVO'
    )
    for pdt in pendientes:
        pdte_str = ''
        pdte_all = []
        pron_str = ''
        pron_dte = ''
        pdt_elemento = PendienteElemento.objects.filter(
            pendiente=pdt
        )
        for elemento in pdt_elemento:
            pdte_str += elemento.elemento.descripcion + ', '
            pdte_all.append({
                'id': elemento.elemento.id,
                'descripcion': elemento.elemento.descripcion
            })
        if pdt.pronostico:
            pron_dte = pdt.pronostico.strftime("%Y-%m-%d")
            pron_str = "<br><b>Pronostico:</b> " + pron_dte + "."
        data.append({
            'id': pdt.id,
            'fecha': pdt.fecha_hora.strftime("%Y-%m-%d"),
            'hora': pdt.fecha_hora.strftime("%H:%I"),
            'fecha_hora': pdt.fecha_hora.strftime("%Y-%m-%d %H:%I"),
            'numero_he': pdt.numero_he,
            'descripcion': pdt.descripcion,
            'pendiente_pronostico': pdte_str.rstrip(', ') + '. ' + pron_str,
            'pendiente': pdte_str.rstrip(', '),
            'pendiente_all': json.dumps(pdte_all),
            'pronostico': pron_dte,
            'color': pdt.estado.color,
            'color_name': pdt.estado.nombre,
            'tipo': pdt.tipo.nombre
        })
    return JsonResponse(data, safe=False)


@permission_required('ocurrencia.OCURRENCIA_PERMISSION')
def add(request):
    date_time = datetime.strptime(request.POST['fecha_hora'], "%Y-%m-%d %H:%M")
    numero_he = request.POST['uo'] + "-" + date_time.strftime("%m-%y") + "-" + request.POST['numero']
    pdt = Pendiente()
    pdt.numero_he = numero_he
    pdt.fecha_hora = request.POST['fecha_hora']
    pdt.descripcion = request.POST['descripcion']
    pdt.pronostico = request.POST['pronostico']
    pdt.tipo = Tipo.objects.get(nombre=request.POST['tipo'])
    pdt.estado = Estado.objects.get(color=request.POST['color'])
    try:
        pdt.validate_unique()
        pdt.save()
        for pk in json.loads(request.POST['pendiente']):
            pdt_elemento = PendienteElemento()
            pdt_elemento.pendiente = pdt
            pdt_elemento.elemento = Elemento.objects.get(pk=pk)
            pdt_elemento.save()
        return HttpResponse()
    except ValidationError as e:
        return HttpResponse(e.messages)


@permission_required('ocurrencia.OCURRENCIA_PERMISSION')
def edit(request):
    date_time = datetime.strptime(request.POST['fecha_hora'], "%Y-%m-%d %H:%M")
    numero_he = request.POST['uo'] + "-" + date_time.strftime("%m-%y") + "-" + request.POST['numero']

    pdt = Pendiente.objects.get(pk=request.POST['id'])
    pdt.numero_he = numero_he
    pdt.fecha_hora = request.POST['fecha_hora']
    pdt.descripcion = request.POST['descripcion']
    pdt.pronostico = request.POST['pronostico']
    pdt.tipo = Tipo.objects.get(nombre=request.POST['tipo'])
    pdt.estado = Estado.objects.get(color=request.POST['color'])
    try:
        pdt.validate_unique()
        pdt.save()
        for pk in json.loads(request.POST['pendiente']):
            pdt_old = PendienteElemento.objects.get(
                pendiente=pdt,
                elemento=Elemento.objects.get(pk=pk)
            )
            pdt_old.delete()
        for pk in json.loads(request.POST['pendiente']):
            pdt_new = PendienteElemento()
            pdt_new.pendiente = pdt
            pdt_new.elemento = Elemento.objects.get(pk=pk)
            pdt_new.save()
        return HttpResponse()
    except ValidationError as e:
        return HttpResponse(e.messages)


@permission_required('ocurrencia.OCURRENCIA_PERMISSION')
def cell_edit_color(request):
    pendiente = Pendiente.objects.get(pk=request.POST['id'])
    pendiente.estado = Estado.objects.get(color=request.POST['color'])
    pendiente.save()
    return HttpResponse()


@permission_required('ocurrencia.OCURRENCIA_PERMISSION')
def remove(request):
    for pk in json.loads(request.POST['ids']):
        Pendiente.objects.get(pk=pk).delete()
    return HttpResponse('')
