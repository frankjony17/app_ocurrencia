
Ext.define('etecsa.store.pendiente_elemento', {
    extend: 'Ext.data.Store',
    fields: ['id', 'descripcion'],
    autoLoad: true,
    proxy : {
        url: '/pendiente/elemento/list',
        type : 'ajax'
    }
});