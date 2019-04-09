
Ext.define('etecsa.store.trabajador', {
    extend: 'Ext.data.Store',
    fields: ['id', 'nombre', 'apellidos', 'cargo', 'full-name', 'unidad_organizativa', 'cargo_id', 'unidad_organizativa_id'],
    groupField: 'unidad_organizativa',
    sorters: ['nombre','apellidos'],
    proxy : {
        url: '/nomenclador/trabajador/list',
        type : 'ajax'
    },
    autoLoad: true
});