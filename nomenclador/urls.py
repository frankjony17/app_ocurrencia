from django.conf.urls import url
from nomenclador.views import cargo, unidad_organizativa, trabajador, estado, informado_atpl, departamento_uotpl, personal_mincom_tpl


urlpatterns = [
    # CARGO
    url(r'^cargo/list', cargo.listar),
    url(r'^cargo/add', cargo.add),
    url(r'^cargo/edit', cargo.edit),
    url(r'^cargo/remove', cargo.remove),
    # UO
    url(r'^unidad_organizativa/list', unidad_organizativa.listar),
    url(r'^unidad_organizativa/add', unidad_organizativa.add),
    url(r'^unidad_organizativa/edit', unidad_organizativa.edit),
    url(r'^unidad_organizativa/remove', unidad_organizativa.remove),
    # TRA
    url(r'^trabajador/list', trabajador.listar),
    url(r'^trabajador/add', trabajador.add),
    url(r'^trabajador/edit', trabajador.edit),
    url(r'^trabajador/remove', trabajador.remove),
    # ESTADO
    url(r'^estado/list', estado.listar),
    url(r'^estado/add', estado.add),
    url(r'^estado/edit', estado.edit),
    url(r'^estado/remove', estado.remove),
    # INFORMADO-A-TPL
    url(r'^informado_atpl/list', informado_atpl.listar),
    url(r'^informado_atpl/add', informado_atpl.add),
    url(r'^informado_atpl/edit', informado_atpl.edit),
    url(r'^informado_atpl/remove', informado_atpl.remove),
    # DEP
    url(r'^departamento_uotpl/list', departamento_uotpl.listar),
    url(r'^departamento_uotpl/add', departamento_uotpl.add),
    url(r'^departamento_uotpl/edit', departamento_uotpl.edit),
    url(r'^departamento_uotpl/remove', departamento_uotpl.remove),
    # PERSONAL-MINCOM
    url(r'^personal_mincom_tpl/list', personal_mincom_tpl.listar),
    url(r'^personal_mincom_tpl/add', personal_mincom_tpl.add),
    url(r'^personal_mincom_tpl/edit', personal_mincom_tpl.edit),
    url(r'^personal_mincom_tpl/remove', personal_mincom_tpl.remove),
]

