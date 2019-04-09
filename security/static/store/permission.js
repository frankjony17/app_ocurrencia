
Ext.define('etecsa.store.permission', {
    extend: 'Ext.data.Store',
    fields: ['id', 'codigo', 'nombre', 'app_label'],
    autoLoad: true,
    proxy : {
        url: '/security/permisos/list',
        type : 'ajax'
    }
});