
Ext.define('etecsa.view.estado.form', {
    extend: 'Ext.window.Window',
    xtype: 'estado-win',

    title: 'Adicionar Estado',
    iconCls: 'x-fa fa-mortar-board',
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
            url: '/nomenclador/estado/add',
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
                maxLength: 32
            },{
                xtype: 'textareafield',
                grow: true,
                fieldLabel: 'Descripción',
                emptyText: 'DESCRIPCIÓN',
                name: 'descripcion',
                maxLength: 120
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