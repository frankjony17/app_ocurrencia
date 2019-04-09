
Ext.define('etecsa.store.user', {
    extend: 'Ext.data.Store',
    fields: ['id', 'username', 'email', 'last_login', 'is_active', 'permission'],
    autoLoad: true,
    proxy : {
        url: '/security/user/list',
        type : 'ajax'
    }
});