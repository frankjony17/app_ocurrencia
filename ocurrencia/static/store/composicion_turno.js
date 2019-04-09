
Ext.define('etecsa.store.composicion_turno', {
    extend: 'Ext.data.Store',
    fields: ['id', 'slug', 'nombre', 'cargo'],
    groupField: 'slug',
    sorters: ['cargo'],
    proxy : {
        url: '/ocurrencia/ocu/composicion_turno',
        type : 'ajax'
    },
    autoLoad: true
});