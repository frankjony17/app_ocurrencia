
Ext.define('etecsa.view.personal_mincom_tpl.grid', {
    extend: 'Ext.grid.Panel',
    xtype: 'personal-mincom-tpl-grid',
    width: '100%',
    border: false,
    selType: 'checkboxmodel',
    scrollable: true,
    
    initComponent: function() { var me = this;
        me.store = Ext.create('etecsa.store.personal_mincom_tpl');
        me.columns = [{
            text: 'Id',
            dataIndex: 'id',
            width: 35,
            hidden: true
        },{
            text: 'Nombre',
            dataIndex: 'nombre',
            editor: {
                xtype: 'textfield',
                maxLength: 42,
                allowBlank: false
            },
            flex: 1
        },{
            text: 'Cargo',
            dataIndex: 'cargo',
            editor: {
                xtype: 'textfield',
                maxLength: 71,
                allowBlank: false
            },
            flex: 4
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