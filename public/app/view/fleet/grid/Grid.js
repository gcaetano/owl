
Ext.define('Owl.view.fleet.grid.Grid',{
    extend: 'Ext.grid.Panel',
    alias: 'widget.fleet-grid',

    requires: [
        'Owl.view.fleet.grid.GridController',
        'Owl.view.fleet.grid.GridModel'
    ],

    controller: 'fleet-grid-grid',
    viewModel: {
        type: 'fleet-grid-grid'
    },
    title: 'Owl',
    columns: [
        {text: "ID", width: 120, dataIndex: 'mid', sortable: true},
        {text: $.t('app.local'), flex: 1, dataIndex: 'local', sortable: true},
        {text: $.t('app.maker'), width: 125, dataIndex: 'maker', sortable: true},
        {text: $.t('app.register'), width: 125, dataIndex: 'tmx', sortable: true}
    ],
    forceFit: true,
    height:210
});
