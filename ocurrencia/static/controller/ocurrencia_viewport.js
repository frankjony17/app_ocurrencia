
Ext.define('etecsa.controller.ocurrencia_viewport', {
    extend: 'Ext.app.Controller',
    control: {
        '#id-ocurrencia-logout-id': {
            click: "logout"
        },
        '#id-pendiente-logout-id': {
            click: "logout"
        }
    },
    logout: function () {
        location.href = '/security/logout';
    }
});


