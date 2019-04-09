
Ext.define('etecsa.view.nomenclador_tree', {
    extend: 'Ext.list.Tree',
    xtype: 'tree-nomenclador',
    store: {
        root: {
            expanded: true,
            children: [{
                text: '<b>Cargo</b>',
                iconCls: 'x-fa fa-mortar-board',
                leaf: true
            },{
                text: '<b>Unidad Organizativa</b>',
                iconCls: 'x-fa fa-building',
                leaf: true
            },{
                text: '<b>Trabajador</b>',
                iconCls: 'x-fa fa-user',
                leaf: true
            },{
                text: '<b>Estado</b>',
                iconCls: 'x-fa fa-certificate',
                leaf: true
            },{
                text: '<b>Informado A (TPL)</b>',
                iconCls: 'x-fa fa-list-ul',
                leaf: true
            },{
                text: '<b>Departamento / UO (TPL)</b>',
                iconCls: 'x-fa fa-university',
                leaf: true
            },{
                text: '<b>Personal MINCOM (TPL)</b>',
                iconCls: 'x-fa fa-user-secret',
                leaf: true
            }]
        }
    }
});