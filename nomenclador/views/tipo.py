from django.contrib.auth.decorators import permission_required
from django.core.exceptions import ValidationError
from django.http import JsonResponse, HttpResponse
from pendiente.models import Tipo
import json


@permission_required('nomenclador.NOMENCLADOR_PERMISSION')
def listar(request):
    data = []
    for ti in Tipo.objects.all():
        data.append({
            'id': ti.id,
            'nombre': ti.nombre,
            'descripcion': ti.descripcion
        })
    return JsonResponse(data, safe=False)


@permission_required('nomenclador.NOMENCLADOR_PERMISSION')
def add(request):
    try:
        ti = Tipo()
        ti.nombre = request.POST['nombre']
        ti.descripcion = request.POST['descripcion']
        ti.validate_unique()
        ti.save()
        return HttpResponse()
    except ValidationError as e:
        return HttpResponse(e.messages)


@permission_required('nomenclador.NOMENCLADOR_PERMISSION')
def edit(request):
    try:
        ti = Tipo.objects.get(pk=request.POST['id'])
        ti.nombre = request.POST['nombre']
        ti.descripcion = request.POST['descripcion']
        ti.validate_unique()
        ti.save()
        return HttpResponse('ok')
    except ValidationError as e:
        return HttpResponse(e.messages)


@permission_required('nomenclador.NOMENCLADOR_PERMISSION')
def remove(request):
    for pk in json.loads(request.POST['ids']):
        Tipo.objects.get(pk=pk).delete()
    return HttpResponse('')
