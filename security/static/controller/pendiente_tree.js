
Ext.define('etecsa.controller.pendiente_tree', {
    extend: 'Ext.app.Controller',
    control: {
        'tree-pendiente': {
            itemclick: "item_click"
        }
    },
    item_click: function (sender, info) {
        var center_area = Ext.getCmp('center-region-id');
        switch (info.node.data.index) {
            case 0:
                center_area.removeAll();
                center_area.add(Ext.create('etecsa.view.tipo.grid'));
                break;
            case 1:
                center_area.removeAll();
                center_area.add(Ext.create('etecsa.view.pendiente_estado.grid'));
                break;
            case 2:
                center_area.removeAll();
                center_area.add(Ext.create('etecsa.view.elemento.grid'));
                break;
        }
    }
});