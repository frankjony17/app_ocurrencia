
Ext.define( 'etecsa.view.another_user_viewport', {
    extend: 'Ext.container.Viewport',
    xtype: 'another-user-viewport',
    layout: 'border',

    initComponent: function() {
        var me = this;
        me.turno_guardia_store = Ext.create('etecsa.store.turno_guardia');
        me.items = [{
            region: 'center',
            xtype: 'panel',
            bodyStyle: 'background-image:url(/../static/images/square.gif);',
            items: {
                xtype: "window",
                layout: 'fit',
                autoShow: true,
                header: false,
                width: 1000,
                height: 245,
                resizable: false,
                y: 50,
                items: [{
                    xtype: 'form',
                    padding: '5 5 5 5',
                    bodyPadding: 5,
                    style: 'background-color: #fff;',
                    items: [{
                        xtype: 'fieldset',
                        layout: 'hbox',
                        padding: '5 5 5 5',
                        title: 'FILTRAR POR (Año / Mes / Día)',
                        items: [{
                            xtype: 'combobox',
                            store: Ext.create('etecsa.store.turno_guardia_year_db'),
                            queryMode: 'local',
                            displayField: 'year',
                            emptyText: 'AÑO',
                            editable: false,
                            margin: '0 5 0 0',
                            listeners: {
                                select: function (combo, record) {
                                    me.turno_guardia_store.load({
                                        params: {
                                            'year': combo.value,
                                            'month': Ext.getCmp('another-user-combo-month').getValue(),
                                            'day': Ext.getCmp('another-user-combo-day').getValue()
                                        }
                                    });
                                }
                            },
                            width: 305,
                            id: 'another-user-combo-year'
                        },{
                            xtype: 'combobox',
                            store: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
                            queryMode: 'local',
                            emptyText: 'MES',
                            editable: false,
                            margin: '0 5 0 0',
                            listeners: {
                                select: function (combo) {
                                    me.turno_guardia_store.load({
                                        params: {
                                            'year': Ext.getCmp('another-user-combo-year').getValue(),
                                            'month': combo.value,
                                            'day': Ext.getCmp('another-user-combo-day').getValue()
                                        }
                                    });
                                }
                            },
                            width: 307,
                            id: 'another-user-combo-month'
                        },{
                            xtype: 'combobox',
                            store: [
                                '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12',
                                '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24',
                                '25', '26', '27', '28', '29', '30', '31'
                            ],
                            queryMode: 'local',
                            emptyText: 'DÍA',
                            editable: false,
                            listeners: {
                                select: function (combo) {
                                    me.turno_guardia_store.load({
                                        params: {
                                            'year': Ext.getCmp('another-user-combo-year').getValue(),
                                            'month': Ext.getCmp('another-user-combo-month').getValue(),
                                            'day': combo.value
                                        }
                                    });
                                }
                            },
                            width: 305,
                            margin: '0 5 0 0',
                            id: 'another-user-combo-day'
                        },{
                            xtype: 'button',
                            iconCls: 'x-fa fa-undo',
                            listeners: {
                                click: function () {
                                    Ext.getCmp('another-user-combo-year').setValue();
                                    Ext.getCmp('another-user-combo-month').setValue();
                                    Ext.getCmp('another-user-combo-day').setValue();
                                    me.turno_guardia_store.load();
                                }
                            }
                        }]
                    },{
                        xtype: 'fieldset',
                        layout: 'anchor',
                        padding: '5 5 5 5',
                        title: 'SELECCIONE TURNO DE GUARDIA',
                        items: {
                            xtype: 'combobox',
                            emptyText: 'TURNO DE GUARDIA',
                            store: me.turno_guardia_store,
                            queryMode: 'local',
                            displayField: 'fecha_inicio',
                            valueField: 'id',
                            editable: false,
                            listeners: {
                                select: function (combo) {
                                    location.href = '/ocurrencia?id='+ combo.value;
                                }
                            },
                            listConfig: {
                                itemTpl: [
                                    '<div data-qtip="{fecha_inicio}: {fecha_cierre}">{fecha_inicio} <b>({fecha_cierre})</b></div>'
                                ]
                            },
                            margin: '0 5 0 0',
                            width: '100%'
                        }
                    }]
                }],
                buttons: [{
                    text: 'Salir',
                    iconCls: 'logout',
                    listeners: {
                        click: function () {
                            location.href = '/security/logout';
                        }
                    }
                }]
            }
        }];
        me.callParent(arguments);
    }
});