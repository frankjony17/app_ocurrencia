
Ext.define('etecsa.view.pendiente_estado.form', {
    extend: 'Ext.window.Window',
    xtype: 'pendiente-estado-window',

    title: 'Adicionar Estado (PENDIENTE)',
    iconCls: 'x-fa fa-thumb-tack',
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
            url: '/pendiente/estado/add',
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
                xtype: 'combobox',
                fieldLabel: 'Color',
                emptyText: 'COLOR',
                store: [
                    { nombre: "Amarillo", color: "#ffff00" },
                    { nombre: "Verde lima", color: "#00ff00" },
                    { nombre: "Turquesa", color: "#00ffff" },
                    { nombre: "Fucsia", color: "#ff00ff" },
                    { nombre: "Azul", color: "#0000ff" },
                    { nombre: "Rojo", color: "#ff0000" }
                ],
                queryMode: 'local',
                displayField: 'nombre',
                valueField: 'color',
                tpl: [
                    '<ul class="x-list-plain">',
                        '<tpl for=".">',
                         '<li class="x-boundlist-item listItmes"style="background-color:{color}">{nombre}</li>',
                        '</tpl>',
                    '</ul>'
                ],
                name: 'color'
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