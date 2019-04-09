
Ext.define('etecsa.store.turno_guardia', {
    extend: 'Ext.data.Store',
    fields: ['id', 'fecha_inicio', 'fecha_cierre', 'superior_mincom', 'jefe_turno_mincom', 'directivo_frente_empresa'],
    autoLoad: true,
    proxy : {
        url: '/ocurrencia/turno_guardia/list',
        type : 'ajax'
    }
});