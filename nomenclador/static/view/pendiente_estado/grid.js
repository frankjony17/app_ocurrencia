
Ext.define('etecsa.view.pendiente_estado.grid', {
    extend: 'Ext.grid.Panel',
    xtype: 'pendiente-estado-grid',
    width: '100%',
    border: false,
    selType: 'checkboxmodel',
    scrollable: true,
    
    initComponent: function() { var me = this;
        me.store = Ext.create('etecsa.store.pendiente_estado');
        me.columns = [{
            text: 'Id',
            dataIndex: 'id',
            width: 35,
            hidden: true
        },{
            text: 'Nombre',
            dataIndex: 'nombre',
            editor: {
                xtype: 'textfield',
                maxLength: 117,
                allowBlank: false
            },
            flex: 1
        },{
            text: 'Color',
            dataIndex: 'color',
            editor: {
                xtype: 'combobox',
                store: [
                    { nombre: "Amarillo", color: "#ffff00" },
                    { nombre: "Verde lima", color: "#00ff00" },
                    { nombre: "Turquesa", color: "#00ffff" },
                    { nombre: "Fucsia", color: "#ff00ff" },
                    { nombre: "Azul", color: "#0000ff" },
                    { nombre: "Rojo", color: "#ff0000" },
                    { nombre: "Azul marino", color: "#00008b" },
                    { nombre: "Verde", color: "#006400" }
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
                allowBlank: false
            },
            renderer: function (value, metaData) {
                metaData.tdStyle = 'background-color: '+ value +';';
                return value
            },
            align: 'center',
            flex: 1
        }];
        me.tbar = [{
            text: 'Adicionar',
            iconCls: 'fa fa-plus'
        },'-',{
            text: 'Eliminar',
            iconCls: 'trash',
            disabled: true
        }];
        me.plugins = Ext.create('Ext.grid.plugin.RowEditing', {
            saveBtnText: 'Editar',
            cancelBtnText: 'Cancelar'
        }); 
        me.callParent(arguments);
    }
});