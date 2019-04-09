
Ext.define('etecsa.view.informado_atpl.grid', {
    extend: 'Ext.grid.Panel',
    xtype: 'informado-atpl-grid',
    width: '100%',
    border: false,
    selType: 'checkboxmodel',
    scrollable: true,
    
    initComponent: function() { var me = this;
        me.store = Ext.create('etecsa.store.informado_atpl');
        me.columns = [{
            text: 'Id',
            dataIndex: 'id',
            width: 35,
            hidden: true
        },{
            text: 'Persona / Grupo',
            dataIndex: 'persona_grupo',
            editor: {
                xtype: 'textfield',
                maxLength: 42,
                allowBlank: false
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