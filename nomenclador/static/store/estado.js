
Ext.define('etecsa.store.estado', {
    extend: 'Ext.data.Store',
    fields: ['id', 'nombre', 'descripcion'],
    proxy : {
        url: '/nomenclador/estado/list',
        type : 'ajax'
    },
    autoLoad: true
});