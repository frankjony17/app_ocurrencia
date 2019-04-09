
Ext.define('etecsa.store.personal_mincom_tpl', {
    extend: 'Ext.data.Store',
    fields: ['id', 'nombre', 'cargo'],
    autoLoad: true,
    proxy : {
        url: '/nomenclador/personal_mincom_tpl/list',
        type : 'ajax'
    }
});