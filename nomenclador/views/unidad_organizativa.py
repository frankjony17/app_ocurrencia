from django.contrib.auth.decorators import permission_required
from django.http import JsonResponse, HttpResponse
from django.core.exceptions import ValidationError
from nomenclador.models import UnidadOrganizativa
import json


@permission_required('nomenclador.NOMENCLADOR_PERMISSION')
def listar(request):
    data = []
    for uo in UnidadOrganizativa.objects.all():
        data.append({
            'id': uo.id,
            'nombre': uo.nombre,
            'acronimo': uo.acronimo
        })
    return JsonResponse(data, safe=False)


@permission_required('nomenclador.NOMENCLADOR_PERMISSION')
def add(request):
    try:
        uo = UnidadOrganizativa()
        uo.nombre = request.POST['nombre']
        uo.acronimo = request.POST['acronimo']
        uo.validate_unique()
        uo.save()
        return HttpResponse()
    except ValidationError as e:
        return HttpResponse(e.messages)


@permission_required('nomenclador.NOMENCLADOR_PERMISSION')
def edit(request):
    try:
        uo = UnidadOrganizativa.objects.get(pk=request.POST['id'])
        uo.nombre = request.POST['nombre']
        uo.acronimo = request.POST['acronimo']
        uo.validate_unique()
        uo.save()
        return HttpResponse('ok')
    except ValidationError as e:
        return HttpResponse(e.messages)


@permission_required('nomenclador.NOMENCLADOR_PERMISSION')
def remove(request):
    for pk in json.loads(request.POST['ids']):
        UnidadOrganizativa.objects.get(pk=pk).delete()
    return HttpResponse('')
