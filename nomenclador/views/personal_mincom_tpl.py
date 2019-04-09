from django.contrib.auth.decorators import permission_required
from django.core.exceptions import ValidationError
from django.http import JsonResponse, HttpResponse
from nomenclador.models import MincomPersonaTpl
import json


@permission_required('nomenclador.NOMENCLADOR_PERMISSION')
def listar(request):
    data = []
    for pm in MincomPersonaTpl.objects.all():
        data.append({
            'id': pm.id,
            'nombre': pm.nombre,
            'cargo': pm.cargo
        })
    return JsonResponse(data, safe=False)


@permission_required('nomenclador.NOMENCLADOR_PERMISSION')
def add(request):
    try:
        pm = MincomPersonaTpl()
        pm.nombre = request.POST['nombre']
        pm.cargo = request.POST['cargo']
        pm.validate_unique()
        pm.save()
        return HttpResponse()
    except ValidationError as e:
        return HttpResponse(e.messages)


@permission_required('nomenclador.NOMENCLADOR_PERMISSION')
def edit(request):
    try:
        pm = MincomPersonaTpl.objects.get(pk=request.POST['id'])
        pm.nombre = request.POST['nombre']
        pm.cargo = request.POST['cargo']
        pm.validate_unique()
        pm.save()
        return HttpResponse('ok')
    except ValidationError as e:
        return HttpResponse(e.messages)


@permission_required('nomenclador.NOMENCLADOR_PERMISSION')
def remove(request):
    for pk in json.loads(request.POST['ids']):
        MincomPersonaTpl.objects.get(pk=pk).delete()
    return HttpResponse('')
