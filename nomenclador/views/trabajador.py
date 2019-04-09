from nomenclador.models import Trabajador, Cargo, UnidadOrganizativa
from django.contrib.auth.decorators import permission_required
from django.core.exceptions import ValidationError
from django.http import JsonResponse, HttpResponse
import json


@permission_required('nomenclador.NOMENCLADOR_PERMISSION')
def listar(request):
    data = []
    for t in Trabajador.objects.all():
        data.append({
            'id': t.id,
            'nombre': t.nombre,
            'apellidos': t.apellidos,
            'full-name': t.nombre + " " + t.apellidos,
            'cargo': t.cargo.nombre,
            'unidad_organizativa': t.unidad_organizativa.nombre,
            'cargo_id': t.cargo.id,
            'unidad_organizativa_id': t.unidad_organizativa.id,
        })
    return JsonResponse(data, safe=False)


@permission_required('nomenclador.NOMENCLADOR_PERMISSION')
def add(request):
    try:
        t = Trabajador()
        t.nombre = request.POST['nombre']
        t.apellidos = request.POST['apellidos']
        t.cargo = Cargo.objects.get(nombre=request.POST['cargo'])
        t.unidad_organizativa = UnidadOrganizativa.objects.get(nombre=request.POST['unidad_organizativa'])
        t.full_clean()
        t.save()
        return HttpResponse()
    except ValidationError as e:
        return HttpResponse(e.messages)


@permission_required('nomenclador.NOMENCLADOR_PERMISSION')
def edit(request):
    try:
        t = Trabajador.objects.get(pk=request.POST['trabajador_id'])
        t.nombre = request.POST['nombre']
        t.apellidos = request.POST['apellidos']
        t.cargo = Cargo.objects.get(nombre=request.POST['cargo'])
        t.unidad_organizativa = UnidadOrganizativa.objects.get(nombre=request.POST['unidad_organizativa'])
        t.full_clean()
        t.save()
        return HttpResponse()
    except ValidationError as e:
        return HttpResponse(e.messages)


@permission_required('nomenclador.NOMENCLADOR_PERMISSION')
def remove(request):
    for pk in json.loads(request.POST['ids']):
        Trabajador.objects.get(pk=pk).delete()
    return HttpResponse('')
