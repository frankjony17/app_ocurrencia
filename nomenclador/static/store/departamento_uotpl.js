
Ext.define('etecsa.store.departamento_uotpl', {
    extend: 'Ext.data.Store',
    fields: ['id', 'nombre', 'acronimo', 'telefonos', 'email'],
    autoLoad: true,
    proxy : {
        url: '/nomenclador/departamento_uotpl/list',
        type : 'ajax'
    }
});