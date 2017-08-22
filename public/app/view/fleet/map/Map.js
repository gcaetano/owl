
Ext.define('Owl.view.fleet.map.Map',{
    extend: 'Ext.ux.GMapPanel',
    alias: 'widget.fleet-map',
    requires: [
        'Ext.button.Button',
        'Ext.layout.container.Fit',
        'Owl.view.fleet.map.MapController',
        'Owl.view.fleet.map.MapModel'
    ],

    controller: 'fleet-map-map',
    viewModel: {
        type: 'fleet-map-map'
    },
    border: '0 0 0 0',
    center: {
        lat: 15,
        lng: 10
    },

    mapOptions: {
        mapTypeId: google.maps.MapTypeId.TERRAIN,
        zoom: 3
    }
});
