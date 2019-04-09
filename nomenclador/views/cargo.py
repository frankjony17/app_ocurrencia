from django.contrib.auth.decorators import permission_required
from django.core.exceptions import ValidationError
from django.http import JsonResponse, HttpResponse
from nomenclador.models import Cargo
import json


@permission_required('nomenclador.NOMENCLADOR_PERMISSION')
def listar(request):
    data = []
    for c in Cargo.objects.all():
        data.append({
            'id': c.id,
            'nombre': c.nombre,
            'descripcion': c.descripcion
        })
    return JsonResponse(data, safe=False)


@permission_required('nomenclador.NOMENCLADOR_PERMISSION')
def add(request):
    try:
        c = Cargo()
        c.nombre = request.POST['nombre']
        c.descripcion = request.POST['descripcion']
        c.validate_unique()
        c.save()
        return HttpResponse()
    except ValidationError as e:
        return HttpResponse(e.messages)


@permission_required('nomenclador.NOMENCLADOR_PERMISSION')
def edit(request):
    try:
        c = Cargo.objects.get(pk=request.POST['id'])
        c.nombre = request.POST['nombre']
        c.descripcion = request.POST['descripcion']
        c.validate_unique()
        c.save()
        return HttpResponse('ok')
    except ValidationError as e:
        return HttpResponse(e.messages)


@permission_required('nomenclador.NOMENCLADOR_PERMISSION')
def remove(request):
    for pk in json.loads(request.POST['ids']):
        Cargo.objects.get(pk=pk).delete()
    return HttpResponse('')
