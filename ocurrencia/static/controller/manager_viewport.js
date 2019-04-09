
Ext.define('etecsa.controller.manager_viewport', {
    extend: 'Ext.app.Controller',
    control: {
        'manager-viewport': {
            afterrender: "afterrender"
        },
        '#turno-guardia-button-save': {
            click: "is_valid"
        },
        '#manager-logout': {
            click: "logout"
        }
    },
    afterrender: function (viewport) {
        this.viewport = viewport;
        this.form = viewport.down('[name=form-turno-guardia]');
        this.grid = viewport.down('[xtype=grid]');
    },
    is_valid: function () {
        var me = this;
        if (me.form.getForm().isValid()) {
            var ids = [];
            me.grid.store.each(function(rec) {
                ids.push(rec.get('id'));
            });
            if (ids.length > 0) {
                var record = me.form.getForm().getValues();
                me.form.setDisabled(true);
                this.add_turno_guardia(record, ids)
            } else {
                Me.msg.question('<b><span style="color:red;">Formulario no válido</span></b>, verifique la <b><span style="color:red;">composición del turno</span></b>.')
            }
        } else {
            Me.msg.question('<b><span style="color:red;">Formulario no válido</span></b>, verifique las casillas en <b><span style="color:red;">rojo</span></b>.')
        }
    },
    add_turno_guardia: function (record, ids) {
        Ext.Ajax.request({
            url: '/ocurrencia/turno_guardia/add',
            params: {
                fecha_inicio: record['fecha_inicio'],
                fecha_cierre: record['fecha_cierre'],
                frente_empresa: record['frente_empresa'],
                jefe_turno: record['jefe_turno'],
                supervisor_guardia: record['supervisor_guardia'],
                trabajador_guardia: Ext.encode(ids)
            },
            success: function(response) {
                if (response.responseText === '') {
                    location.href = '/ocurrencia/';
                } else {
                    Me.msg.warning(response.responseText);
                }
            },
            failure: function(response){
                Me.msg.error(response.responseText);
            }
        });
    },
    logout: function () {
        location.href = '/security/logout';
    }
});


