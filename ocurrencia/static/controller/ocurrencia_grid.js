
Ext.define('etecsa.controller.ocurrencia_grid', {
    extend: 'Ext.app.Controller',
    control: {
        // Grid
        'ocurrencia-grid': {
            resize: "resize",
            afterrender: "after_render_grid",
            itemdblclick: "grid_dbl_click"
        },
        'ocurrencia-grid button[action=add]': {
            click: "show_form"
        },
        'ocurrencia-grid button[action=edit]': {
            click: "confirm_edit"
        },
        'ocurrencia-grid button[action=remove]': {
            click: "confirm_remove"
        },
        // Form
        'ocurrencia-window': {
            afterrender: "after_render_window"
        },
        'ocurrencia-window [text=Salvar]': {
            click: "is_valid"
        },
        'ocurrencia-window [text=Editar]': {
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
    },
    grid_dbl_click: function () {
        this.show_form({action:'edit'})
    },
    show_form: function (button) {
        var me = this,
            title = 'Adicionar Ocurrencia.',
            button_text = 'Salvar',
            url = '/ocurrencia/ocu/ocurrencia_add';
        if (button.id==='edit') {
            title = 'Editar Ocurrencia.';
            button_text = 'Editar';
            url = '/ocurrencia/ocu/ocurrencia_edit';
        }
        Ext.create('etecsa.view.ocurrencia.form', {
            url: url,
            title: title,
            store: me.store            ,
            button_text: button_text
        });
        if (button.action==='edit') {
            var record = me.grid.selModel.getSelection()[0];
            me.window.ocurrencia_id = record.get('id');
            me.form.loadRecord(record);
            me.form.down('[xtype=tagfield]').setValue(record.get('informado_a').split(', '))
        }
    },
    confirm_edit: function (button) {
        if (this.grid.selModel.getCount()===1) {
            this.show_form(button);
        } else {
             Me.msg.question('Seleccione la ocurrencia que desee editar <b>(SOLO UNA)</b>.');
        }
    },
    is_valid: function () {
        if (this.form.getForm().isValid()) {
            this.submit_form();
        } else {
            Me.msg.question('<b><span style="color:red;">Formulario no válido</span></b>, verifique las casillas en <b><span style="color:red;">rojo</span></b>.')
        }
    },
    submit_form: function () {
        var me = this;
        this.form.submit({
            success: function () {
                me.store.reload();
                me.form.up('window').close();
                Me.show_toast('Operación realizada exitosamente.');
            },
            failure: function (form, action) {
                Me.msg.warning(action.response.responseText);
            }
        });
    },
    confirm_remove: function () {
        if (this.grid.selModel.getCount() >= 1) {
            Ext.MessageBox.confirm('Confirmación', 'Desea eliminar las <b>('+ this.grid.selModel.getCount() +') OCURRENCIAS</b> seleccionadas?', confirm, this);
        } else {
             Me.msg.question('Seleccione las <b>OCURRENCIAS</b> que desea eliminar.');
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
            url: '/ocurrencia/ocu/remove',
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
    }
});