
Ext.define('etecsa.view.trabajador.form', {
    extend: 'Ext.window.Window',
    xtype: 'trabajador-win',
    iconCls: 'x-fa fa-university',
    layout: 'fit',
    buttonAlign: 'center',
    width: 700,
    resizable: false,
    modal: true,

    initComponent: function () {
        var me = this;
        me.items = [{
            xtype: 'form',
            url: me.url,
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
                    maskRe: /[aA-zZ\ \áéíóúñÁÉÍÓÚÑ]/,
                    regex: /[aA-zZ]/,
                    maxLength: 21,
                    allowBlank: false,
                    margin: '0 5 0 0',
                    flex: 3
                },{
                    xtype: 'textfield',
                    fieldLabel: 'Apellidos',
                    emptyText: 'APELLIDOS',
                    name: 'apellidos',
                    maskRe: /[aA-zZ\ \áéíóúñÁÉÍÓÚÑ]/,
                    regex: /[aA-zZ]/,
                    maxLength: 21,
                    allowBlank: false,
                    flex: 3
                }]
            },{
                xtype: 'fieldset',
                layout: 'hbox',
                anchor: '99%',
                items: [{
                    xtype: 'combobox',
                    fieldLabel: 'Cargo',
                    emptyText: 'CARGO',
                    store: Ext.create('etecsa.store.cargo'),
                    editable: false,
                    allowBlank: false,
                    displayField: 'nombre',
                    margin: '0 5 0 0',
                    name: 'cargo',
                    flex: 1
                },{
                    xtype: 'combobox',
                    fieldLabel: 'Unidad Organizativa',
                    emptyText: 'UNIDAD ORGANIZATIVA',
                    store: Ext.create('etecsa.store.unidad_organizativa'),
                    editable: false,
                    allowBlank: false,
                    displayField: 'nombre',
                    listConfig: {
                        itemTpl: [
                            '<div data-qtip="{nombre}: {acronimo}">{nombre}</b></div>'
                        ]
                    },
                    name: 'unidad_organizativa',
                    flex: 1
                }]
            },{
                xtype: 'hiddenfield',
                value: me.trabajador_id,
                name: 'trabajador_id'
            }]
        }];
        me.buttons = [{
            text: me.button_text,
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