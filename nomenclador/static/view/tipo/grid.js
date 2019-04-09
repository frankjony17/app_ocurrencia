
Ext.define('etecsa.view.tipo.grid', {
    extend: 'Ext.grid.Panel',
    xtype: 'tipo-grid',
    width: '100%',
    border: false,
    selType: 'checkboxmodel',
    scrollable: true,
    
    initComponent: function() { var me = this;
        me.store = Ext.create('etecsa.store.pendiente_tipo');
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
                maxLength: 117,
                allowBlank: false
            },
            flex: 3
        },{
            text: 'Descripción',
            dataIndex: 'descripcion',
            editor: {
                xtype: 'textfield',
                maxLength: 117,
                allowBlank: false
            },
            flex: 2
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