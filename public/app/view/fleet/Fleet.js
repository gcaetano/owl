
Ext.define('Owl.view.fleet.Fleet',{
    extend: 'Ext.panel.Panel',
    alias: 'widget.fleet',
    itemId: 'fleet',

    requires: [
        'Owl.view.fleet.FleetController',
        'Owl.view.fleet.FleetModel',
        'Owl.view.fleet.grid.Grid',
        'Owl.view.fleet.map.Map'
    ],

    controller: 'fleet-fleet',
    viewModel: {
        type: 'fleet-fleet'
    },
    layout: {
        type: 'border'
    },
    border: false,
    items:[
        {
            xtype: 'fleet-map',
            //xtype: 'panel',
            region: 'center'
        },
        {
            xtype: 'fleet-grid',
            split: true,         // enable resizing
            id: 'south-region-container',
            region: 'south'
        }
    ]
});
