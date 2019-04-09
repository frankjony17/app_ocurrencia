
Ext.define('etecsa.store.pendiente_estado', {
    extend: 'Ext.data.Store',
    fields: ['id', 'nombre', 'color'],
    autoLoad: true,
    proxy : {
        url: '/pendiente/estado/list',
        type : 'ajax'
    }
});