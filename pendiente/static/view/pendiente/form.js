
Ext.define('etecsa.view.pendiente.form', {
    extend: 'Ext.window.Window',
    xtype: 'pendiente-window',
    iconCls: 'x-fa fa-calendar',
    layout: 'border',
    width: 1024,
    height: 420,
    autoShow: true,
    resizable: false,
    modal: true,

    initComponent: function () {
        var me = this;
        me.elemento_pendiente_store = Ext.create('Ext.data.ArrayStore', {
            fields: [ 'id', 'descripcion' ]
        });
        me.items = [{
            region: 'center',
            xtype: 'form',
            url: me.url,
            padding: '5 5 0 5',
            bodyPadding: '3',
            style: 'background-color: #fff;',
            fieldDefaults: {
                labelAlign: 'top',
                allowBlank: false
            },
            items: [{
                xtype: 'fieldset',
                layout: 'hbox',
                padding: '5 5 5 5',
                title: 'Fecha/hora - Unidad Organizativa - Número de Hecho Extraordinario',
                items: [{
                    xtype: 'datetimefield',
                    emptyText: 'FECHA / HORA',
                    name: 'fecha_hora',
                    format: 'Y-m-d H:i',
                    value: new Date(),
                    anchor: '98%',
                    editable: false,
                    margin: '0 5 0 0',
                    flex: 1
                },{
                    xtype: 'combobox',
                    emptyText: 'UNIDAD ORGANIZATIVA',
                    name: 'uo',
                    store: Ext.create('etecsa.store.unidad_organizativa'),
                    queryMode: 'local',
                    displayField: 'acronimo',
                    typeAhead: true,
                    margin: '0 5 0 0',
                    anchor: '98%',
                    flex: 1
                },{
                    xtype: 'textfield',
                    emptyText: 'NÚMERO',
                    name: 'numero',
                    maskRe: /[0-9]/,
                    regex: /[0-9]/,
                    maxLength: 4,
                    minLength: 4,
                    anchor: '100%',
                    flex: 1
                }]
            },{
                xtype: 'fieldset',
                layout: 'anchor',
                title: 'Descripción del Pendiente',
                padding: '5 5 0 5',
                items: [{
                    xtype: 'htmleditor',
                    emptyText: 'DESCRIPCIÓN',
                    name: 'descripcion',
                    allowBlank: false,
                    anchor: '100%',
                    height: 120
                }]
            },{
                xtype: 'fieldset',
                layout: 'hbox',
                padding: '5 5 5 5',
                title: 'Tipo - Pronostico - Estado',
                items: [{
                    xtype: 'combobox',
                    emptyText: 'TIPO',
                    name: 'tipo',
                    store: Ext.create('etecsa.store.pendiente_tipo'),
                    queryMode: 'local',
                    displayField: 'nombre',
                    typeAhead: true,
                    anchor: '98%',
                    margin: '0 5 0 0',
                    flex: 4
                },{
                    xtype: 'datefield',
                    emptyText: 'PRONOSTICO',
                    name: 'pronostico',
                    format: 'Y-m-d',
                    value: new Date(),
                    editable: false,
                    margin: '0 5 0 0',
                    anchor: '98%',
                    flex: 2
                },{
                    xtype: 'combobox',
                    emptyText: 'ESTADO (COLOR)',
                    name: 'color',
                    store: Ext.create('etecsa.store.pendiente_estado'),
                    queryMode: 'local',
                    displayField: 'nombre',
                    valueField: 'color',
                    editable: false,
                    tpl: [
                        '<ul class="x-list-plain">',
                            '<tpl for=".">',
                             '<li class="x-boundlist-item listItmes"style="background-color:{color}">{nombre}</li>',
                            '</tpl>',
                        '</ul>'
                    ],
                    anchor: '100%',
                    flex: 2
                }]
            }]
        },{
            region: 'east',
            xtype: 'panel',
            width: 312,
            items: [{
                xtype: 'fieldset',
                layout: 'anchor',
                padding: '5 5 5 5',
                items: [{
                    xtype: 'combobox',
                    emptyText: 'PENDIENTE',
                    store: Ext.create('etecsa.store.pendiente_elemento'),
                    queryMode: 'local',
                    displayField: 'descripcion',
                    typeAhead: true,
                    listeners: {
                        select: function (combo, record) {
                            var rec = {
                                'id': record.get('id'),
                                'descripcion': record.get('descripcion')
                            };
                            me.elemento_pendiente_store.add(rec);
                            combo.setValue();
                        }
                    },
                    padding: '5 5 0 5',
                    width: '97%'
                },{
                    xtype: 'grid',
                    width: 300,
                    height: 320,
                    border: true,
                    padding: '0 5 5 5',
                    store: me.elemento_pendiente_store,
                    columns: [
                        {text: 'Id', dataIndex: 'id', hidden: true},
                        {
                            text: 'Pendiente', dataIndex: 'descripcion', sortable: false, menuDisabled: true, flex: 1
                        }, {
                            xtype: 'actioncolumn',
                            width: 25,
                            items: [{
                                iconCls: 'x-fa fa-trash',
                                tooltip: 'Elimanar fila.',
                                handler: function (view, rowIndex, colIndex, item, e, record) {
                                    me.elemento_pendiente_store.remove(record);
                                }
                            }]
                        }
                    ],
                    bbar: ['->',{
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
                    }]
                }]
            }]
        }];
        me.callParent(arguments);
    }
});