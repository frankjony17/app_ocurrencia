
Ext.define('etecsa.store.pendiente_tipo', {
    extend: 'Ext.data.Store',
    fields: ['id', 'nombre', 'descripcion'],
    autoLoad: true,
    proxy : {
        url: '/pendiente/tipo/list',
        type : 'ajax'
    }
});