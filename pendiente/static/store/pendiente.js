
Ext.define('etecsa.store.pendiente', {
    extend: 'Ext.data.Store',
    fields: ['id', 'fecha', 'hora', 'fecha_hora', 'numero_he', 'descripcion', 'pendiente_pronostico', 'pendiente', 'pronostico', 'estado', 'tipo', 'color_name', 'pendiente_all'],
    groupField: 'tipo',
    sorters: ['fecha_hora'],
    proxy : {
        url: '/pendiente/pdt/list',
        type : 'ajax'
    },
    autoLoad: true
});