
Ext.define('etecsa.store.ocurrencia', {
    extend: 'Ext.data.Store',
    fields: ['id', 'hora', 'fecha', 'reporta', 'ocurrencia', 'informado_a', 'estado'],
    groupField: 'fecha',
    sorters: ['fecha','hora'],
    proxy : {
        url: '/ocurrencia/ocu/ocurrencia_list',
        type : 'ajax'
    },
    autoLoad: true
});