
Ext.define('etecsa.store.not_permission', {
    extend: 'Ext.data.Store',
    fields: ['id', 'codename', 'nombre', 'have_perm'],
    proxy : {
        url: '/security/user/permission_by_user',
        type : 'ajax'
    }
});