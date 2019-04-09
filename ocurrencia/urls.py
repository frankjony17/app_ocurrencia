from django.conf.urls import url
from ocurrencia.views import turno_guardia, ocurrencia

urlpatterns = [
    url(r'^$', ocurrencia.index),

    url(r'^turno_guardia/list', turno_guardia.listar),
    url(r'^turno_guardia/add', turno_guardia.add),
    url(r'^turno_guardia/year', turno_guardia.list_year),

    url(r'^ocu/turno_guardia', ocurrencia.get_turno_guardia),
    url(r'^ocu/composicion_turno', ocurrencia.composicion_turno),
    url(r'^ocu/ocurrencia_list', ocurrencia.ocurrencia_list),
    url(r'^ocu/ocurrencia_add', ocurrencia.ocurrencia_add),
    url(r'^ocu/ocurrencia_edit', ocurrencia.ocurrencia_edit),
    url(r'^ocu/remove', ocurrencia.ocurrencia_remove)
]
