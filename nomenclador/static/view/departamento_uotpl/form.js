
Ext.define('etecsa.view.departamento_uotpl.form', {
    extend: 'Ext.window.Window',
    xtype: 'departamento-uotpl-win',

    title: 'Adicionar Departamento',
    iconCls: 'x-fa fa-university',
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
            url: '/nomenclador/departamento_uotpl/add',
            padding: '10 10 10 10',
            border: false,
            style: 'background-color: #fff;',
            fieldDefaults: {
                labelAlign: 'top'
            },
            items: [{
                xtype: 'fieldset',
                layout: 'hbox',
                anchor: '99%',
                items: [{
                    xtype: 'textfield',
                    fieldLabel: 'Nombre',
                    emptyText: 'NOMBRE',
                    name: 'nombre',
                    anchor: '100%',
                    maxLength: 80,
                    allowBlank: false,
                    margin: '0 5 0 0',
                    flex: 3
                },{
                    xtype: 'textfield',
                    fieldLabel: 'Acronimo',
                    emptyText: 'ACRONIMO',
                    name: 'acronimo',
                    anchor: '98%',
                    maskRe: /[A-Z]/,
                    regex: /[A-Z]/,
                    maxLength: 13,
                    allowBlank: false,
                    flex: 1
                }]
            },{
                xtype: 'fieldset',
                layout: 'hbox',
                anchor: '99%',
                items: [{
                    xtype: 'textfield',
                    fieldLabel: 'Teléfonos',
                    emptyText: 'TELÉFONOS',
                    name: 'telefonos',
                    anchor: '98%',
                    maxLength: 45,
                    margin: '0 5 0 0',
                    flex: 1
                },{
                    xtype: 'textfield',
                    fieldLabel: 'Emil',
                    emptyText: 'emil',
                    vtype:'email',
                    maxLength: 70,
                    name: 'email',
                    flex: 1
                }]
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