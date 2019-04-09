
Ext.define('etecsa.view.departamento_uotpl.grid', {
    extend: 'Ext.grid.Panel',
    xtype: 'departamento-uotpl-grid',
    width: '100%',
    border: false,
    selType: 'checkboxmodel',
    scrollable: true,
    
    initComponent: function() { var me = this;
        me.store = Ext.create('etecsa.store.departamento_uotpl');
        me.columns = [{
            xtype: 'rownumberer',
            text: 'No',
            width: 40,
            align: 'center'
        },{
            text: 'Id',
            dataIndex: 'id',
            width: 35,
            hidden: true
        },{
            text: 'Nombre',
            dataIndex: 'nombre',
            editor: {
                xtype: 'textfield',
                maxLength: 80,
                allowBlank: false
            },
            flex: 3
        },{
            text: 'Acronimo',
            dataIndex: 'acronimo',
            editor: {
                xtype: 'textfield',
                maskRe: /[A-Z]/,
                regex: /[A-Z]/,
                maxLength: 13,
                allowBlank: false
            },
            flex: 1
        },{
            text: 'Teléfonos',
            dataIndex: 'telefonos',
            editor: {
                xtype: 'textfield',
                maxLength: 45
            },
            flex: 1
        },{
            text: 'Emil',
            dataIndex: 'emil',
            editor: {
                xtype: 'textfield',
                vtype:'email',
                maxLength: 70
            },
            flex: 1
        }];
        me.tbar = [{
            text: 'Adicionar',
            iconCls: 'fa fa-plus'
        },'-',{
            text: 'Eliminar',
            iconCls: 'trash'
        }];
        me.plugins = Ext.create('Ext.grid.plugin.RowEditing', {
            saveBtnText: 'Editar',
            cancelBtnText: 'Cancelar'
        }); 
        me.callParent(arguments);
    }
});