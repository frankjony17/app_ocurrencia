
Ext.define('etecsa.view.elemento.form', {
    extend: 'Ext.window.Window',
    xtype: 'elemento-window',

    title: 'Adicionar Observación',
    iconCls: 'x-fa fa-exclamation-triangle',
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
            url: '/pendiente/elemento/add',
            padding: '10 10 10 10',
            border: false,
            style: 'background-color: #fff;',
            fieldDefaults: {
                labelAlign: 'top', anchor: '100%', allowBlank: false
            },
            items: [{
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