
Ext.define('etecsa.view.trabajador.grid', {
    extend: 'Ext.grid.Panel',
    xtype: 'trabajador-grid',
    width: '100%',
    selType: 'checkboxmodel',
    columnLines: true,
    features: [{
        ftype: 'grouping',
        startCollapsed: false,
        groupHeaderTpl: '{name} ({rows.length})'
    }],
    initComponent: function() { var me = this;
        me.store = Ext.create('etecsa.store.trabajador');
        me.columns = [{
            text: 'Id',
            dataIndex: 'id',
            width: 35,
            hidden: true
        },{
            text: 'Nombre',
            dataIndex: 'nombre',
            flex: 3
        },{
            text: 'Apellidos',
            dataIndex: 'apellidos',
            flex: 3
        },{
            text: 'Cargo',
            dataIndex: 'cargo',
            flex: 3
        },{
            text: 'cargo_id',
            dataIndex: 'cargo_id',
            flex: 1,
            hidden: true
        },{
            text: 'unidad_organizativa',
            dataIndex: 'unidad_organizativa',
            flex: 1,
            hidden: true
        },{
            text: 'unidad_organizativa_id',
            dataIndex: 'unidad_organizativa_id',
            flex: 1,
            hidden: true
        }];
        me.tbar = [{
            text: 'Adicionar',
            iconCls: 'x-fa fa-plus',
            tooltip: 'Adicionar Trabajador'
        },{
            text: 'Editar',
            iconCls: 'x-fa fa-edit',
            tooltip: 'Editar Trabajador'
        },'-',{
            text: 'Eliminar',
            iconCls: 'trash',
            tooltip: 'Eliminar Trabajador'
        }];
        me.callParent(arguments);
    }
});