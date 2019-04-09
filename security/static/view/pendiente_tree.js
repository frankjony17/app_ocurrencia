
Ext.define('etecsa.view.pendiente_tree', {
    extend: 'Ext.list.Tree',
    xtype: 'tree-pendiente',
    store: {
        root: {
            expanded: true,
            children: [{
                text: '<b>Tipo</b>',
                iconCls: 'x-fa fa-tag',
                leaf: true
            },{
                text: '<b>Estado</b>',
                iconCls: 'x-fa fa-thumb-tack',
                leaf: true
            },{
                text: '<b>Elemento</b>',
                iconCls: 'x-fa fa-exclamation-triangle',
                leaf: true
            }]
        }
    }
});