
Ext.define('etecsa.view.user.menu', {
    extend: 'Ext.menu.Menu',
    xtype: 'user-menu',
    width: 240,
    plain: true,
    margin: '10 10 10 10',
    closeAction: 'destroy',
    showSeparator: true,
    stateEvents: ['edit_user','active_inactive_user','show_permission_window'],

    initComponent: function (me_controller) { var me = this;
        me.items = [{
            text: 'Editar <b>(USUARIO)</b>',
            iconCls: 'x-fa fa-user-md',
            listeners: {
                click: function () {
                    me.fireEvent('edit_user', me.me_record);
                }
            }
        },'-',{
            text: 'Activar/Desactivar <b>(ACTIVO)</b>',
            iconCls: 'x-fa fa-eye-slash',
            listeners: {
                click: function () {
                    me.fireEvent('active_inactive_user', me.me_record);
                }
            }
        },{
            text: 'Añadir/Quitar <b>(PERMISOS)</b>',
            iconCls: 'x-fa fa-sliders',
            listeners: {
                click: function () {
                    me.fireEvent('show_permission_window', me.me_record);
                }
            }
        }];
        me.callParent(arguments);
    }
});