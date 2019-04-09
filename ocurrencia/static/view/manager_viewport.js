
Ext.define( 'etecsa.view.manager_viewport', {
    extend: 'Ext.container.Viewport',
    xtype: 'manager-viewport',
    layout: 'border',

    initComponent: function() {
        var me = this,
            date_1 = new Date(),
            date_2 = new Date();
        me.mincom_store = Ext.create('etecsa.store.personal_mincom_tpl');
        me.trabajador_store = Ext.create('etecsa.store.trabajador');
        me.trabajador_turno_store = Ext.create('Ext.data.ArrayStore', {
            fields: [ 'id', 'nombre', 'cargo' ],
            groupField: 'cargo'
        });
        me.items = [{
            region: 'center',
            xtype: 'panel',
            bodyStyle: 'background-image:url(/../static/images/square.gif);',
            items: [{
                xtype: "window",
                iconCls: 'x-fa fa-paperclip',
                layout: 'border',
                header: false,
                autoShow: true,
                resizable: false,
                height: 360,
                width: 1000,
                y: 50,
                items: [{
                    region: 'center',
                    xtype: 'form',
                    name: 'form-turno-guardia',
                    padding: '5 5 5 5',
                    bodyPadding: '5 5 0',
                    fieldDefaults: {
                        allowBlank: false
                    },
                    items: [{
                        xtype: 'fieldset',
                        layout: 'hbox',
                        padding: '5 5 5 5',
                        title: 'INICIAR TURNO DE GUARDIA (Desde / Hasta)',
                        items: [{
                            xtype: 'datetimefield',
                            emptyText: 'INICIO',
                            format: 'Y-m-d H:i',
                            value: new Date(),
                            maxValue: new Date(date_1.setDate(date_1.getDate() + 1)),
                            anchor: '98%',
                            editable: false,
                            allowBlank: false,
                            margin: '0 5 0 0',
                            listeners: {
                                select: function (date) {
                                    var date2 = Ext.getCmp('id-fecha-cierre-id');
                                    if (date.getValue() > date2.getValue()) {
                                        date2.setValue();
                                    }
                                }
                            },
                            flex: 1,
                            name: 'fecha_inicio',
                            id: 'id-fecha-inicio-id'
                        }, {
                            xtype: 'datetimefield',
                            emptyText: 'CIERRE',
                            anchor: '100%',
                            format: 'Y-m-d H:i',
                            value: new Date(date_2.setDate(date_2.getDate() + 1)),
                            minValue: new Date(),
                            editable: false,
                            allowBlank: false,
                            listeners: {
                                select: function (date) {
                                    var date1 = Ext.getCmp('id-fecha-inicio-id');
                                    console.log(date1.getValue());
                                    if (date.getValue() < date1.getValue()) {
                                        date1.setValue();
                                    }
                                }
                            },
                            flex: 1,
                            name: 'fecha_cierre',
                            id: 'id-fecha-cierre-id'
                        }]
                    }, {
                        xtype: 'fieldset',
                        layout: 'hbox',
                        padding: '5 5 5 5',
                        title: 'AL FRENTE DE LA EMPRESA',
                        items: [{
                            xtype: 'combobox',
                            emptyText: 'CARGO',
                            store: Ext.create('etecsa.store.cargo'),
                            queryMode: 'local',
                            displayField: 'nombre',
                            editable: false,
                            allowBlank: true,
                            listeners: {
                                select: function (combo) {
                                    me.trabajador_store.clearFilter();
                                    if (combo.value) {
                                        me.trabajador_store.filter({
                                            property: 'cargo',
                                            value: combo.value
                                        });
                                    }
                                    me.down('[emptyText=TRABAJADOR]').getValue();
                                }
                            },
                            margin: '0 5 0 0',
                            width: 200
                        }, {
                            xtype: 'combobox',
                            emptyText: 'TRABAJADOR',
                            store: me.trabajador_store,
                            queryMode: 'local',
                            displayField: 'full-name',
                            valueField: 'id',
                            typeAhead: true,
                            flex: 1,
                            name: 'frente_empresa'
                        }]
                    }, {
                        xtype: 'fieldset',
                        layout: 'anchor',
                        padding: '5 5 5 5',
                        title: 'MINCOM',
                        items: [{
                            xtype: 'combobox',
                            fieldLabel: 'Supervisor de Guardia',
                            emptyText: 'SUPERVISOR-GUARDIA',
                            store: me.mincom_store,
                            queryMode: 'local',
                            displayField: 'nombre',
                            valueField: 'id',
                            typeAhead: true,
                            listConfig: {
                                itemTpl: [
                                    '<div data-qtip="{nombre}: {cargo}">{nombre} <b>({cargo})</b></div>'
                                ]
                            },
                            name: 'supervisor_guardia',
                            width: '100%'
                        }, {
                            xtype: 'combobox',
                            fieldLabel: 'Jefe de Turno',
                            emptyText: 'JEFE-TURNO',
                            store: me.mincom_store,
                            queryMode: 'local',
                            displayField: 'nombre',
                            valueField: 'id',
                            typeAhead: true,
                            listConfig: {
                                itemTpl: [
                                    '<div data-qtip="{nombre}: {cargo}">{nombre} <b>({cargo})</b></div>'
                                ]
                            },
                            name: 'jefe_turno',
                            width: '100%'
                        }]
                    }]
                }, {
                    region: 'east',
                    xtype: 'panel',
                    width: 350,
                    items: [{
                        xtype: 'fieldset',
                        layout: 'anchor',
                        padding: '5 5 5 5',
                        items: [{
                            xtype: 'combobox',
                            emptyText: 'TRABAJADOR',
                            store: Ext.create('etecsa.store.trabajador'),
                            queryMode: 'local',
                            displayField: 'full-name',
                            valueField: 'id',
                            typeAhead: true,
                            listeners: {
                                select: function (combo, record) {
                                    var rec = {
                                        'id': record.get('id'),
                                        'nombre': record.get('full-name'),
                                        'cargo': record.get('cargo')
                                    };
                                    me.trabajador_turno_store.add(rec);
                                    combo.setValue();
                                }
                            },
                            width: '100%'
                        }, {
                            xtype: 'grid',
                            width: 338,
                            height: 305,
                            border: true,
                            padding: '5 5 5 5',
                            store: me.trabajador_turno_store,
                            columns: [
                                {text: 'Id', dataIndex: 'id', hidden: true},
                                {
                                    text: '<div style="text-align: center;">COMPOSICIÓN DEL TURNO DE GUARDIA</div>',
                                    dataIndex: 'nombre', sortable: false, menuDisabled: true, flex: 1
                                }, {
                                    xtype: 'actioncolumn',
                                    width: 25,
                                    items: [{
                                        iconCls: 'x-fa fa-trash',
                                        tooltip: 'Elimanar fila.',
                                        handler: function (view, rowIndex, colIndex, item, e, record) {
                                            me.trabajador_turno_store.remove(record);
                                        }
                                    }]
                                }
                            ],
                            features: [{
                                groupHeaderTpl: '{name}',
                                ftype: 'grouping',
                                collapsible: false
                            }],
                            bbar: [{
                                text: 'Salir',
                                iconCls: 'logout',
                                id: 'manager-logout'
                            },'->', {
                                text: 'Salvar',
                                iconCls: 'check',
                                id: 'turno-guardia-button-save'
                            }]
                        }]
                    }]
                }]
            }]
        }];
        me.callParent(arguments);
    }
});