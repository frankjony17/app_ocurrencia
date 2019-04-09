from django.contrib.auth.decorators import permission_required
from django.http import JsonResponse
from django.contrib.auth.models import Permission, ContentType


@permission_required('security.ADMIN_PERMISSION')
def listar(request):
    data = []
    permission = Permission.objects.filter(codename__contains='_PERMISSION')
    if not permission.exists():
        ocurr_perm = Permission()
        ocurr_perm.codename = 'NOMENCLADOR_PERMISSION'
        ocurr_perm.name = 'Acceso a la aplicación nomenclador'
        ocurr_perm.content_type = ContentType.objects.get(model='nomenclador')
        ocurr_perm.save()

        ocurr_perm = Permission()
        ocurr_perm.codename = 'OCURRENCIA_PERMISSION'
        ocurr_perm.name = 'Acceso reducido al modulo de Ocurrencia'
        ocurr_perm.content_type = ContentType.objects.get(model='ocurrencia')
        ocurr_perm.save()

        manag_perm = Permission()
        manag_perm.codename = 'OCURRENCIA_MANAGER_PERMISSION'
        manag_perm.name = 'Acceso total al modulo de Ocurrencia'
        manag_perm.content_type = ContentType.objects.get(model='ocurrencia')
        manag_perm.save()

        admin_perm = Permission()
        admin_perm.codename = 'ADMIN_PERMISSION'
        admin_perm.name = 'Acceso total al modulo de Administración'
        admin_perm.content_type = ContentType.objects.get(app_label='security')
        admin_perm.save()
    else:
        permission = Permission.objects.filter(codename__contains='_PERMISSION')
        for perm in permission:
            data.append({
                'id': perm.id,
                'codigo': perm.codename,
                'nombre': perm.name,
                'app_label': perm.content_type.app_label
            })
    return JsonResponse(data, safe=False)


