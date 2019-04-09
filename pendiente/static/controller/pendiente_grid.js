
Ext.define('etecsa.controller.pendiente_grid', {
    extend: 'Ext.app.Controller',
    control: {
        // Grid
        'pendiente-grid': {
            resize: "resize",
            cellclick: "cell_click",
            afterrender: "after_render_grid",
            itemdblclick: "grid_dbl_click"
        },
        'pendiente-grid button[action=add]': {
            click: "show_form"
        },
        'pendiente-grid button[action=edit]': {
            click: "confirm_edit"
        },
        'pendiente-grid button[action=remove]': {
            click: "confirm_remove"
        },
        // Form
        'pendiente-window': {
            afterrender: "after_render_window",
            close: "window_close_clean_store"
        },
        'pendiente-window [text=Salvar]': {
            click: "is_valid"
        },
        'pendiente-window [text=Editar]': {
            click: "is_valid"
        }
    },
    resize: function (grid) {
        var center = Ext.getCmp('id-center-region-id');
        grid.setHeight(center.getHeight() - 45);
    },
    after_render_grid: function (grid) {
        this.grid = grid;
        this.store = grid.getStore();
    },
    after_render_window: function (window) {
        this.window = window;
        this.form = window.down('form');
        this.elemento_grid = window.down('[xtype=grid]');
        this.pendiente_id = 'NO';
    },
    grid_dbl_click: function () {
        this.show_form({action:'edit'})
    },
    show_form: function (button) {
        var me = this,
            title = 'Adicionar Pendiente.',
            button_text = 'Salvar';
        me.url = '/pendiente/pdt/add';
        if (button.action==='edit') {
            title = 'Editar Pendiente.';
            button_text = 'Editar';
            me.url = '/pendiente/pdt/edit';
        }
        Ext.create('etecsa.view.pendiente.form', {
            title: title,
            store: me.store,
            button_text: button_text
        });
        if (button.action==='edit') {
            var record = me.grid.selModel.getSelection()[0],
                num_he = record.get('numero_he').split('-'),
                rec_pe = [], i=0;
            me.pendiente_id = record.get('id');
            me.form.down('[name=uo]').setValue(num_he[0]);
            me.form.down('[name=numero]').setValue(num_he[3]);
            me.form.down('[name=color]').setValue(record.get('color_name'));
            Ext.Array.each(eval(record.get('pendiente_all')), function (rec) {
                rec_pe.push({
                    id: rec['id'],
                    descripcion: rec['descripcion']
                });
            });
            me.window.elemento_pendiente_store.add(rec_pe);
            me.form.loadRecord(record);
        }
    },
    // Add / Edit
    is_valid: function () {
        var me = this;
        if (me.form.getForm().isValid()) {
            var ids = [];
            me.elemento_grid.store.each(function(rec) {
                ids.push(rec.get('id'));
            });
            if (ids.length > 0) {
                if (me.form.down('[xtype=htmleditor]').getValue()!=="") {
                    var record = me.form.getForm().getValues();
                    this.add_edit_pendiente(record, ids)
                } else {
                    Me.msg.question('<b><span style="color:red;">Formulario no válido</span></b>, verifique la <b><span style="color:red;">descripción del pendiente</span></b>.')
                }
            } else {
                Me.msg.question('<b><span style="color:red;">Formulario no válido</span></b>, verifique los <b><span style="color:red;">elementos pendientes</span></b>.')
            }
        } else {
            Me.msg.question('<b><span style="color:red;">Formulario no válido</span></b>, verifique las casillas en <b><span style="color:red;">rojo</span></b>.')
        }
    },
    confirm_edit: function (button) {
        if (this.grid.selModel.getCount()===1) {
            this.show_form(button);
        } else {
             Me.msg.question('Seleccione el pendiente que desee editar <b>(SOLO UNO)</b>.');
        }
    },
    add_edit_pendiente: function (record, ids) {
        var me = this;
        Ext.Ajax.request({
            url: me.url,
            params: {
                id: me.pendiente_id,
                uo: record['uo'],
                numero: record['numero'],
                tipo: record['tipo'],
                color: record['color'],
                fecha_hora: record['fecha_hora'],
                pronostico: record['pronostico'],
                descripcion: record['descripcion'],
                pendiente: Ext.encode(ids)
            },
            success: function(response) {
                if (response.responseText === '') {
                    me.store.reload();
                    me.window.close();
                    Me.show_toast('Operación realizada exitosamente.');
                } else {
                    Me.msg.warning(response.responseText);
                }
            },
            failure: function(response){
                Me.msg.error(response.responseText);
            }
        });
    },
    // Remove
    confirm_remove: function () {
        if (this.grid.selModel.getCount() >= 1) {
            Ext.MessageBox.confirm('Confirmación', 'Desea eliminar las <b>('+ this.grid.selModel.getCount() +') OCURRENCIAS</b> seleccionadas?', confirm, this);
        } else {
             Me.msg.question('Seleccione los <b>PENDIENTES</b> que desea eliminar.');
        }
        function confirm (btn) {
            if (btn === 'yes') {
                this.remove();
            }
        }
    },
    remove: function () { var me = this, ids = [];
        Ext.Array.each(this.grid.selModel.getSelection(), function (row) {
            ids.push(row.get('id'));
        });
        Ext.Ajax.request({
            url: '/pendiente/pdt/remove',
            params: { ids:  Ext.encode(ids) },
            success: function(response) {
                if (response.responseText === '') {
                    Me.show_toast('Operación realizada exitosamente.');
                    me.store.reload();
                } else {
                    Me.msg.warning(response.responseText);
                }
            },
            failure: function(response){
                Me.msg.error(response.responseText);
            }
        });
    },
    // Cell color edit
    cell_click: function (view, td, cellIndex, record, tr, rowIndex, e, eOpts ) {
        var me=this;
        if (cellIndex===7) {
            var window = Ext.create('Ext.window.Window', {
                layout: 'fit',
                height: 50,
                width: 100,
                header: false,
                items: {
                    xtype: 'combobox',
                    store: [
                        { nombre: "<span style='background-color: #ffff00; color: #ffff00'>COLOR</span>", color: "#ffff00" },
                        { nombre: "<span style='background-color: #00ff00; color: #00ff00'>COLOR</span>", color: "#00ff00" },
                        { nombre: "<span style='background-color: #00ffff; color: #00ffff'>COLOR</span>", color: "#00ffff" },
                        { nombre: "<span style='background-color: #ff00ff; color: #ff00ff'>COLOR</span>", color: "#ff00ff" },
                        { nombre: "<span style='background-color: #0000ff; color: #0000ff'>COLOR</span>", color: "#0000ff" },
                        { nombre: "<span style='background-color: #ff0000; color: #ff0000'>COLOR</span>", color: "#ff0000" }
                    ],
                    queryMode: 'local',
                    displayField: 'nombre',
                    valueField: 'color',
                    value: record.get('color_name'),
                    editable: false,
                    tpl: [
                        '<ul class="x-list-plain">',
                            '<tpl for=".">',
                             '<li class="x-boundlist-item listItmes"style="background-color:{color}">{nombre}</li>',
                            '</tpl>',
                        '</ul>'
                    ],
                    listeners: {
                        select: function(combo, rec){
                            me.edit_cell_estado(record.get('id'), rec, me);
                            window.close();
                        }
                    }
                },
                listeners: {
                    focusleave: function(){
                        window.close();
                    }
                },
                x: e.getX() - 121, y: e.getY() - 23
            });
            window.show();
        }
    },
    edit_cell_estado: function (id, record, me) {
        Ext.Ajax.request({
            url: '/pendiente/pdt/cell_edit_color',
            params: {
                id: id,
                color: record.get('color')
            },
            success: function() {
                me.store.reload();
            },
            failure: function(response){
                Me.msg.error(response.responseText);
            }
        });
    },
    window_close_clean_store: function () {
        this.window.elemento_pendiente_store.removeAll()
    }
});