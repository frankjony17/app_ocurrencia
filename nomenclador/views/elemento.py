from django.contrib.auth.decorators import permission_required
from django.core.exceptions import ValidationError
from django.http import JsonResponse, HttpResponse
from pendiente.models import Elemento
import json


@permission_required('nomenclador.NOMENCLADOR_PERMISSION')
def listar(request):
    data = []
    for ob in Elemento.objects.all():
        data.append({
            'id': ob.id,
            'descripcion': ob.descripcion
        })
    return JsonResponse(data, safe=False)


@permission_required('nomenclador.NOMENCLADOR_PERMISSION')
def add(request):
    try:
        ob = Elemento()
        ob.descripcion = request.POST['descripcion']
        ob.validate_unique()
        ob.save()
        return HttpResponse()
    except ValidationError as e:
        return HttpResponse(e.messages)


@permission_required('nomenclador.NOMENCLADOR_PERMISSION')
def edit(request):
    try:
        ob = Elemento.objects.get(pk=request.POST['id'])
        ob.descripcion = request.POST['descripcion']
        ob.validate_unique()
        ob.save()
        return HttpResponse('ok')
    except ValidationError as e:
        return HttpResponse(e.messages)


@permission_required('nomenclador.NOMENCLADOR_PERMISSION')
def remove(request):
    for pk in json.loads(request.POST['ids']):
        Elemento.objects.get(pk=pk).delete()
    return HttpResponse('')
