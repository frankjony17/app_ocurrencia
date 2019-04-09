from django.contrib.auth.decorators import permission_required
from django.http import JsonResponse, HttpResponse
from django.core.exceptions import ValidationError
from nomenclador.models import DepartamentoUoTpl
import json


@permission_required('nomenclador.NOMENCLADOR_PERMISSION')
def listar(request):
    data = []
    for de in DepartamentoUoTpl.objects.all():
        data.append({
            'id': de.id,
            'nombre': de.nombre,
            'acronimo': de.acronimo,
            'telefonos': de.telefonos,
            'email': de.email
        })
    return JsonResponse(data, safe=False)


@permission_required('nomenclador.NOMENCLADOR_PERMISSION')
def add(request):
    try:
        de = DepartamentoUoTpl()
        de.nombre = request.POST['nombre']
        de.acronimo = request.POST['acronimo']
        de.telefonos = request.POST['telefonos']
        de.email = request.POST['email']
        de.validate_unique()
        de.save()
        return HttpResponse()
    except ValidationError as e:
        return HttpResponse(e.messages)


@permission_required('nomenclador.NOMENCLADOR_PERMISSION')
def edit(request):
    try:
        de = DepartamentoUoTpl.objects.get(pk=request.POST['id'])
        de.nombre = request.POST['nombre']
        de.acronimo = request.POST['acronimo']
        de.telefonos = request.POST['telefonos']
        de.email = request.POST['email']
        de.validate_unique()
        de.save()
        return HttpResponse('ok')
    except ValidationError as e:
        return HttpResponse(e.messages)


@permission_required('nomenclador.NOMENCLADOR_PERMISSION')
def remove(request):
    for pk in json.loads(request.POST['ids']):
        DepartamentoUoTpl.objects.get(pk=pk).delete()
    return HttpResponse('')
