from django.contrib.auth.decorators import permission_required
from django.core.exceptions import ValidationError
from django.http import JsonResponse, HttpResponse
from pendiente.models import Estado
import json


@permission_required('nomenclador.NOMENCLADOR_PERMISSION')
def listar(request):
    data = []
    for es in Estado.objects.all():
        data.append({
            'id': es.id,
            'nombre': es.nombre,
            'color': es.color
        })
    return JsonResponse(data, safe=False)


@permission_required('nomenclador.NOMENCLADOR_PERMISSION')
def add(request):
    try:
        es = Estado()
        es.nombre = request.POST['nombre']
        es.color = request.POST['color']
        es.validate_unique()
        es.save()
        return HttpResponse()
    except ValidationError as e:
        return HttpResponse(e.messages)


@permission_required('nomenclador.NOMENCLADOR_PERMISSION')
def edit(request):
    try:
        es = Estado.objects.get(pk=request.POST['id'])
        es.nombre = request.POST['nombre']
        es.color = request.POST['color']
        es.validate_unique()
        es.save()
        return HttpResponse('ok')
    except ValidationError as e:
        return HttpResponse(e.messages)


@permission_required('nomenclador.NOMENCLADOR_PERMISSION')
def remove(request):
    for pk in json.loads(request.POST['ids']):
        Estado.objects.get(pk=pk).delete()
    return HttpResponse('')
