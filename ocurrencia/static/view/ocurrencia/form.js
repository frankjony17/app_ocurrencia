
Ext.define('etecsa.view.ocurrencia.form', {
    extend: 'Ext.window.Window',
    xtype: 'ocurrencia-window',
    iconCls: 'x-fa fa-calendar',
    layout: 'fit',
    width: 920,
    autoShow: true,
    resizable: false,
    modal: true,

    initComponent: function () {
        var me = this;
        me.items = [{
            xtype: 'form',
            url: me.url,
            padding: '5 5 0 5',
            bodyPadding: '3',
            border: false,
            style: 'background-color: #fff;',
            fieldDefaults: {
                labelAlign: 'top',
                allowBlank: false
            },
            items: [{
                xtype: 'fieldset',
                layout: 'hbox',
                padding: '5 5 5 5',
                items: [{
                    xtype: 'timefield',
                    fieldLabel: 'Hora',
                    emptyText: 'HORA',
                    format: 'H:i',
                    value: new Date(),
                    name: 'hora',
                    margin: '0 5 0 0',
                    flex: 1
                },{
                    xtype: 'combobox',
                    fieldLabel: 'Reporta',
                    emptyText: 'REPORTA',
                    store: Ext.create('etecsa.store.departamento_uotpl'),
                    displayField: 'acronimo',
                    editable: false,
                    margin: '0 5 0 0',
                    name: 'reporta',
                    flex: 1
                },{
                    xtype: 'combobox',
                    fieldLabel: 'Estado',
                    emptyText: 'ESTADO',
                    store: Ext.create('etecsa.store.estado'),
                    displayField: 'nombre',
                    value: 'INCIDENCIA',
                    editable: false,
                    name: 'estado',
                    flex: 1
                }]
            },{
                xtype: 'fieldset',
                layout: 'anchor',
                title: 'Ocurrencia',
                padding: '5 5 0 5',
                items: [{
                    xtype: 'htmleditor',
                    emptyText: 'OCURRENCIA',
                    name: 'ocurrencia',
                    anchor: '100%',
                    height: 120
                }]
            },{
                xtype: 'fieldset',
                layout: 'anchor',
                title: 'Informado A',
                padding: '5 5 0 5',
                items: [{
                    xtype: 'tagfield',
                    emptyText: 'INFORMADO A',
                    name: 'informado_a',
                    store: Ext.create('etecsa.store.informado_atpl'),
                    displayField: 'persona_grupo',
                    valueField: 'persona_grupo',
                    queryMode: 'local',
                    encodeSubmitValue: true,
                    selectOnFocus: false,
                    editable: false,
                    anchor: '100%'
                }]
            },{
                xtype: 'hiddenfield',
                value: me.ocurrencia_id,
                name: 'id'
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