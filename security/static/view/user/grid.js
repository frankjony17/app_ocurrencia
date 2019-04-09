
Ext.define('etecsa.view.user.grid', {
    extend: 'Ext.grid.Panel',
    xtype: 'user-grid',
    width: '100%',
    border: false,
    plugins: {
        gridfilters: true
    },
    selType: 'checkboxmodel',
    columnLines: true,
    animCollapse: true,

    initComponent: function() { var me = this;
        me.viewConfig = {
            getRowClass: function(record) {
                if(record.get('is_active') === false) {
                    return 'x-grid-row-red';
                }
            }
        };
        me.store = Ext.create('etecsa.store.user');
        me.columns = [{
            text: 'Id',
            dataIndex: 'id',
            width: 35,
            hidden: true
        },{
            text: 'Usuario',
            dataIndex: 'username',
            filter: {
                type: 'string',
                itemDefaults: {
                    emptyText: 'Buscar por...'
                }
            },
            flex: 2
        },{
            text: 'Email',
            dataIndex: 'email',
            flex: 3
        },{
            text: 'Permisos',
            dataIndex: 'permission',
            flex: 4,
            filter: 'list'
        },{
            text: 'Ultimo acceso',
            dataIndex: 'last_login',
            align: 'center',
            filter: true,
            width: 200
        },{
            xtype: 'booleancolumn',
            text: 'Activo',
            trueText: '<img src=\"/../static/images/users-activo.png\"/>&nbsp;&nbsp;&nbsp;&nbsp;<b>Si</b>',
            falseText: '<img src=\"/../static/images/user-inactivo.png\"/>&nbsp;&nbsp;&nbsp;&nbsp;<b>No</b>',
            dataIndex: 'is_active',
            filter: 'boolean',
            flex: 1
        }];
        me.tbar = [{
            text: 'Adicionar',
            tooltip: 'Adicionar usuario',
            iconCls: 'x-fa fa-user-plus'
        },{
            text: 'Eliminar',
            tooltip: 'Eliminar usuario',
            iconCls: 'x-fa fa-user-times'
        }];
        me.callParent(arguments);
    }
});