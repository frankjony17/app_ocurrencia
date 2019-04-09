from django.contrib.auth.decorators import permission_required
from django.core.exceptions import ValidationError
from django.http import JsonResponse, HttpResponse
from nomenclador.models import InformadoATpl
import json


@permission_required('nomenclador.NOMENCLADOR_PERMISSION')
def listar(request):
    data = []
    for ia in InformadoATpl.objects.all():
        data.append({
            'id': ia.id,
            'persona_grupo': ia.persona_grupo
        })
    return JsonResponse(data, safe=False)


@permission_required('nomenclador.NOMENCLADOR_PERMISSION')
def add(request):
    try:
        ia = InformadoATpl()
        ia.persona_grupo = request.POST['persona_grupo']
        ia.validate_unique()
        ia.save()
        return HttpResponse()
    except ValidationError as ia:
        return HttpResponse(ia.messages)


@permission_required('nomenclador.NOMENCLADOR_PERMISSION')
def edit(request):
    try:
        ia = InformadoATpl.objects.get(pk=request.POST['id'])
        ia.persona_grupo = request.POST['persona_grupo']
        ia.validate_unique()
        ia.save()
        return HttpResponse('ok')
    except ValidationError as ia:
        return HttpResponse(ia.messages)


@permission_required('nomenclador.NOMENCLADOR_PERMISSION')
def remove(request):
    for pk in json.loads(request.POST['ids']):
        InformadoATpl.objects.get(pk=pk).delete()
    return HttpResponse('')
