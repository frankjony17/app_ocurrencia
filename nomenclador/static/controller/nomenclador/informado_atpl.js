
Ext.define('etecsa.controller.nomenclador.informado_atpl', {
    extend: 'Ext.app.Controller',
    control: {
        'informado-atpl-grid': {
            edit: "edit",
            resize: "resize",
            afterrender: "after_render_grid"
        },
        'informado-atpl-grid [text=Adicionar]': {
            click: "show_form"
        },
        'informado-atpl-win': {
            afterrender: "after_render_window"
        },
        'informado-atpl-win [text=Salvar]': {
            click: "is_valid"
        },
        'informado-atpl-grid [text=Eliminar]': {
            click: "confirm_remove"
        }
    },
    resize: function (grid) {
        var center = Ext.getCmp('center-region-id');
        grid.setHeight(center.getHeight());
    },
    after_render_grid: function (grid) {
        this.grid = grid;
        this.store = grid.getStore();
    },
    after_render_window: function (window) {
        this.window = window;
        this.form = window.down('form');
    },
    show_form: function () { var me = this;
        Ext.create('etecsa.view.informado_atpl.form', {
            store: me.store
        });
    },
    is_valid: function () {
        if (this.form.getForm().isValid()) {
            this.submit_form();
        } else {
            Me.msg.question('<b><span style="color:red;">Formulario no válido</span></b>, verifique las casillas en <b><span style="color:red;">rojo</span></b>.')
        }
    },
    submit_form: function () { var me = this;
        this.form.submit({
            success: function() {
                me.store.reload();
                me.form.up('window').close();
                Me.show_toast('Operación realizada exitosamente.');
            },
            failure: function(form, action) {
                Me.msg.warning(action.response.responseText);
            }
        });
    },
    edit: function (editor, context){ var me = this;
        Ext.Ajax.request({
            url: '/nomenclador/informado_atpl/edit',
            params: {
                id: context.record.get('id'),
                persona_grupo: context.record.get('persona_grupo')
            },
            success: function(response) {
                if (response.responseText === 'ok') {
                    me.store.reload();
                    Me.show_toast('Operación realizada exitosamente.');
                } else {
                    Me.msg.warning(response.responseText);
                    me.store.reload();
                }
            },
            failure: function(response) {
                Me.msg.warning(response.responseText);
            }
        });
    },
    confirm_remove: function () {
        if (this.grid.selModel.getCount() >= 1) {
            Ext.MessageBox.confirm('Confirmación', 'Desea eliminar los registro seleccionado?', confirm, this);
        } else {
             Me.msg.question('Seleccione los registro que desea eliminar.');
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
            url: '/nomenclador/informado_atpl/remove',
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


