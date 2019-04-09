
Ext.define('etecsa.store.cargo', {
    extend: 'Ext.data.Store',
    fields: ['id', 'nombre', 'descripcion'],
    autoLoad: true,
    proxy : {
        url: '/nomenclador/cargo/list',
        type : 'ajax'
    }
});