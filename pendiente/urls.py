from django.conf.urls import url
from nomenclador.views import tipo, pendiente_estado, elemento
from pendiente.views import pendiente


urlpatterns = [
    # TIPO
    url(r'^tipo/list', tipo.listar),
    url(r'^tipo/add', tipo.add),
    url(r'^tipo/edit', tipo.edit),
    url(r'^tipo/remove', tipo.remove),
    # ESTADO
    url(r'^estado/list', pendiente_estado.listar),
    url(r'^estado/add', pendiente_estado.add),
    url(r'^estado/edit', pendiente_estado.edit),
    url(r'^estado/remove', pendiente_estado.remove),
    # OBSERVACION
    url(r'^elemento/list', elemento.listar),
    url(r'^elemento/add', elemento.add),
    url(r'^elemento/edit', elemento.edit),
    url(r'^elemento/remove', elemento.remove),
    # PENDIENTE
    url(r'^pdt/list', pendiente.listar),
    url(r'^pdt/add', pendiente.add),
    url(r'^pdt/edit', pendiente.edit),
    url(r'^pdt/cell_edit_color', pendiente.cell_edit_color),
    url(r'^pdt/remove', pendiente.remove),
]
