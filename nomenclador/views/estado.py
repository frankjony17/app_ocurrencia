from django.contrib.auth.decorators import permission_required
from django.core.exceptions import ValidationError
from django.http import JsonResponse, HttpResponse
from nomenclador.models import Estado
import json


@permission_required('nomenclador.NOMENCLADOR_PERMISSION')
def listar(request):
    data = []
    for e in Estado.objects.all():
        data.append({
            'id': e.id,
            'nombre': e.nombre,
            'descripcion': e.descripcion
        })
    return JsonResponse(data, safe=False)


@permission_required('nomenclador.NOMENCLADOR_PERMISSION')
def add(request):
    try:
        e = Estado()
        e.nombre = request.POST['nombre']
        e.descripcion = request.POST['descripcion']
        e.validate_unique()
        e.save()
        return HttpResponse()
    except ValidationError as e:
        return HttpResponse(e.messages)


@permission_required('nomenclador.NOMENCLADOR_PERMISSION')
def edit(request):
    try:
        e = Estado.objects.get(pk=request.POST['id'])
        e.nombre = request.POST['nombre']
        e.descripcion = request.POST['descripcion']
        e.validate_unique()
        e.save()
        return HttpResponse('ok')
    except ValidationError as e:
        return HttpResponse(e.messages)


@permission_required('nomenclador.NOMENCLADOR_PERMISSION')
def remove(request):
    for pk in json.loads(request.POST['ids']):
        Estado.objects.get(pk=pk).delete()
    return HttpResponse('')
