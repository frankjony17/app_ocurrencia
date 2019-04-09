
Ext.define('etecsa.store.ocurrencia_turno_guardia', {
    extend: 'Ext.data.Store',
    fields: ['id', 'fecha_inicio', 'fecha_cierre'],
    sorters: ['fecha_inicio','fecha_cierre'],
    proxy : {
        url: '/ocurrencia/ocu/turno_guardia',
        type : 'ajax'
    },
    autoLoad: true
});