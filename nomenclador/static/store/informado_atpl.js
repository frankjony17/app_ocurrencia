
Ext.define('etecsa.store.informado_atpl', {
    extend: 'Ext.data.Store',
    fields: ['id', 'persona_grupo'],
    autoLoad: true,
    proxy : {
        url: '/nomenclador/informado_atpl/list',
        type : 'ajax'
    }
});