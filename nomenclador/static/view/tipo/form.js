
Ext.define('etecsa.view.tipo.form', {
    extend: 'Ext.window.Window',
    xtype: 'tipo-window',

    title: 'Adicionar Tipo',
    iconCls: 'x-fa fa-tag',
    layout: 'fit',
    autoShow: true,
    buttonAlign: 'center',
    width: 640,
    resizable: false,
    modal: true,
    initComponent: function () {
        var me = this;
        me.items = [{
            xtype: 'form',
            url: '/pendiente/tipo/add',
            padding: '10 10 10 10',
            border: false,
            style: 'background-color: #fff;',
            fieldDefaults: {
                labelAlign: 'top', anchor: '100%', allowBlank: false
            },
            items: [{
                xtype: 'textfield',
                fieldLabel: 'Nombre',
                emptyText: 'NOMBRE',
                name: 'nombre',
                maxLength: 117
            },{
                xtype: 'textareafield',
                grow: true,
                fieldLabel: 'Descripción',
                emptyText: 'DESCRIPCIÓN',
                name: 'descripcion',
                maxLength: 117
            }]
        }];
        me.buttons = [{
            text: 'Salvar',
            iconCls: 'check'
        },{
            text: 'Cancelar',
            iconCls: 'close',
            listeners: {
                click: function(){ 
                    me.close();
                }
            }
        }];
        me.callParent(arguments);
    }
});