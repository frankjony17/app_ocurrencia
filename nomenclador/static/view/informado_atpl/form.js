
Ext.define('etecsa.view.informado_atpl.form', {
    extend: 'Ext.window.Window',
    xtype: 'informado-atpl-win',

    title: 'Adicionar Persona o Grupo',
    iconCls: 'x-fa fa-list-ul',
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
            url: '/nomenclador/informado_atpl/add',
            padding: '10 10 10 10',
            border: false,
            style: 'background-color: #fff;',
            fieldDefaults: {
                labelAlign: 'top', anchor: '100%', allowBlank: false
            },
            items: [{
                xtype: 'textareafield',
                grow: true,
                fieldLabel: 'Persona o Grupo',
                emptyText: 'PERSONA-GRUPO',
                name: 'persona_grupo',
                maxLength: 42
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