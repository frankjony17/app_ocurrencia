
Ext.define('etecsa.view.ocurrencia.grid', {
    extend: 'Ext.grid.Panel',
    xtype: 'ocurrencia-grid',
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
        me.store = Ext.create('etecsa.store.ocurrencia');
        me.columns = [{
            text: 'Id',
            dataIndex: 'id',
            width: 35,
            hidden: true
        },{
            text: 'Hora',
            dataIndex: 'hora',
            sortable: false,
            menuDisabled: true,
            renderer: function (value) {
                return '<b>'+ value +'</b>'
            },
            width: 70
        },{
            text: 'Reporta',
            dataIndex: 'reporta',
            sortable: false,
            menuDisabled: true,
            renderer: function (value) {
                return '<span style="color: red"><b>'+ value +'</b></span>'
            },
            width: 70
        },{
            text: 'Ocurrencia',
            dataIndex: 'ocurrencia',
            tdCls: 'wrap',
            flex: 7
        },{
            text: 'Informado a',
            dataIndex: 'informado_a',
            tdCls: 'wrap',
            flex: 2
        },{
            text: 'Estado',
            dataIndex: 'estado',
            sortable: false,
            menuDisabled: true,
            renderer: function (value, metaData) {
                if (value=='ATENCION'){
                    metaData.tdStyle = 'background-color: rgba(255, 26, 14, 0.73);color: rgba(255, 255, 0, 0.79);border:1px solid rgb(255, 255, 0);font-weight: bold;';
                }
                if (value=='CERRADO-(HE)' || value=='ANALISIS-OP-(HE)'){
                    metaData.tdStyle = 'background-color: rgba(0, 255, 255, 0.59);color: red;border:1px solid red;font-weight: bold;';
                }
                if (value=='ABIERTO-(HE)'){
                    metaData.tdStyle = 'background-color: rgba(201, 201, 201, 0.59);color: red;border:1px solid red;font-weight: bold;';
                }
                if (value=='INCIDENCIA'){
                    metaData.tdStyle = 'background-color: rgba(17, 88, 255, 0.2);color: rgb(57, 205, 16);border:1px solid rgb(62, 221, 17);font-weight: bold;';
                }
                return value
            },
            align: 'center',
            width: 140
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
            id: 'id-ocurrencia-logout-id'
        }];
        me.callParent(arguments);
    }
});