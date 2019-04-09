
Ext.define('etecsa.controller.nomenclador_tree', {
    extend: 'Ext.app.Controller',
    control: {
        'tree-nomenclador': {
            itemclick: "item_click"
        }
    },
    item_click: function (sender, info) {
        var center_area = Ext.getCmp('center-region-id');
        switch (info.node.data.index) {
            case 0:
                center_area.removeAll();
                center_area.add(Ext.create('etecsa.view.cargo.grid'));
                break;
            case 1:
                center_area.removeAll();
                center_area.add(Ext.create('etecsa.view.unidad_organizativa.grid'));
                break;
            case 2:
                center_area.removeAll();
                center_area.add(Ext.create('etecsa.view.trabajador.grid'));
                break;
            case 3:
                center_area.removeAll();
                center_area.add(Ext.create('etecsa.view.estado.grid'));
                break;
            case 4:
                center_area.removeAll();
                center_area.add(Ext.create('etecsa.view.informado_atpl.grid'));
                break;
            case 5:
                center_area.removeAll();
                center_area.add(Ext.create('etecsa.view.departamento_uotpl.grid'));
                break;
            default: // 3
                center_area.removeAll();
                center_area.add(Ext.create('etecsa.view.personal_mincom_tpl.grid'));
                break;
        }
    }
});