
Ext.define( 'etecsa.view.ocurrencia_viewport', {
    extend: 'Ext.container.Viewport',
    xtype : 'ocurrencia-viewport',
    layout: 'border',
    id: 'id-ocurrencia-viewport-id',

    initComponent: function() {
        var me = this;
        me.items = [{
            region: 'north',
            collapsible: true,
            collapsed: true,
            border: false,
            title: '<div style="text-align: center;">COMPOSICIÓN DEL TURNO DE GUARDIA</div>',
            items: {
                xtype: 'grid',
                width: '100%',
                columnLines: true,
                store: Ext.create('etecsa.store.ocurrencia_turno_guardia'),
                columns: [{
                    text: 'Id',
                    dataIndex: 'id',
                    hidden: true
                },{
                    text: 'Inicio',
                    dataIndex: 'fecha_inicio',
                    flex: 1
                },{
                    text: 'Cierre',
                    dataIndex: 'fecha_cierre',
                    flex: 1
                }],
                plugins: [{
                    ptype: 'rowwidget',
                    widget: {
                        xtype: 'grid',
                        border: true,
                        features: [{
                            groupHeaderTpl: '{name}',
                            ftype: 'grouping',
                            collapsible: false
                        }],
                        store: Ext.create('etecsa.store.composicion_turno'),
                        columns: [
                            { text: 'Cargo',dataIndex: 'cargo', flex: 1 },
                            { text: 'Nombre',dataIndex: 'nombre', flex: 2 }
                        ]
                    }
                }]
            }
        },{
            region: 'center',
            xtype: 'tabpanel',
            iconAlign: 'right',
            titleAlign: 'right',
            headerPosition: 'bottom',
            tabBarHeaderPosition: 0,
            defaults: {
                scrollable: false,
                closable: false,
                border: true
            },
            listeners: {
                render: {
                    fn: function(tabpanel) {
                        Ext.TaskManager.start({
                            run: function(){
                                tabpanel.setTitle('<b>'+ me.user +'.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+ Ext.Date.format(new Date(), 'Y/m/d H:i:s')+'</b>');
                            },
                            interval: 1000
                        });
                    },
                    delay: 100
                }
            },
            items: [{
                title: '<b>Ocurrencias</b>',
                iconCls: 'x-fa fa-calendar',
                items: Ext.create('etecsa.view.ocurrencia.grid')
            },{
                title: '<b>Pendientes</b>',
                iconCls: 'x-fa fa-eye-slash',
                items: Ext.create('etecsa.view.pendiente.grid'),
            }],
            id: 'id-center-region-id'
        }];
        me.callParent(arguments);
    }
});