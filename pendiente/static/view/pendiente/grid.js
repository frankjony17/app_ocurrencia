
Ext.define('etecsa.view.pendiente.grid', {
    extend: 'Ext.grid.Panel',
    xtype: 'pendiente-grid',
    width: '100%',
    frame: true,
    selModel: 'checkboxmodel',
    features: [{
        ftype: 'grouping',
        startCollapsed: false,
        groupHeaderTpl: '{name} ({rows.length})'
    }],
    scrollable: true,
    columnLines: true,

    initComponent: function() {
        var me = this;
        me.store = Ext.create('etecsa.store.pendiente');
        me.columns = [{
            text: 'Id',
            dataIndex: 'id',
            width: 35,
            hidden: true
        },{
            text: 'Fecha / Hora',
            menuDisabled: true,
            columns: [{
                text: 'Fecha',
                dataIndex: 'fecha',
                sortable: false,
                menuDisabled: true,
                renderer: function (value) {
                    return '<b>'+ value +'</b>'
                },
                align: 'center',
                width: 90
            },{
                text: 'Hora',
                dataIndex: 'hora',
                sortable: false,
                menuDisabled: true,
                renderer: function (value) {
                    return '<b>'+ value +'</b>'
                },
                align: 'center',
                width: 65
            }]
        },{
            text: 'Echo H.',
            dataIndex: 'numero_he',
            sortable: false,
            menuDisabled: true,
            renderer: function (value) {
                return '<span style="color: green"><b>'+ value +'</b></span>'
            },
            align: 'center',
            width: 130
        },{
            text: 'Descripción',
            dataIndex: 'descripcion',
            tdCls: 'wrap',
            flex: 7
        },{
            text: 'Pendiente',
            dataIndex: 'pendiente_pronostico',
            tdCls: 'wrap',
            flex: 2
        },{
            text: '<img src="../static/../static/images/paw.png"/>',
            dataIndex: 'color',
            sortable: false,
            menuDisabled: true,
            renderer: function (value, metaData) {
                metaData.tdStyle = 'background-color:'+ value +';';
            },
            align: 'center',
            width: 50
        },{
            text: 'Pen.',
            dataIndex: 'pendiente',
            width: 100,
            hidden: true
        },{
            text: 'Pro.',
            dataIndex: 'pronostico',
            width: 100,
            hidden: true
        },{
            text: 'FeHo.',
            dataIndex: 'fecha_hora',
            width: 100,
            hidden: true
        },{
            text: 'Col.',
            dataIndex: 'color_name',
            width: 70,
            hidden: true
        },{
            text: 'Pen.',
            dataIndex: 'pendiente_all',
            width: 300,
            hidden: true
        }];
        me.lbar = [{
            iconCls: 'fa fa-plus',
            xtype: 'button',
            action: 'add'
        },'-',{
            iconCls: 'x-fa fa-edit',
            xtype: 'button',
            action: 'edit'
        },{
            iconCls: 'trash',
            xtype: 'button',
            action: 'remove'
        },'->',{
            xtype: 'button',
            iconCls: 'logout',
            id: 'id-pendiente-logout-id'
        }];
        me.callParent(arguments);
    }
});