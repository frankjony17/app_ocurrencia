
Ext.define('etecsa.view.personal_mincom_tpl.form', {
    extend: 'Ext.window.Window',
    xtype: 'personal-mincom-tpl-win',

    title: 'Adicionar Cargo',
    iconCls: 'x-fa fa-user-secret',
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
            url: '/nomenclador/personal_mincom_tpl/add',
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
                maxLength: 42
            },{
                xtype: 'textareafield',
                grow: true,
                fieldLabel: 'Cargo',
                emptyText: 'CARGO',
                name: 'cargo',
                maxLength: 71
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