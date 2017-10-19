Ext.define('Owl.view.fleet.map.MapController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.fleet-map-map',
    requires: [
        'Ext.container.Container',
        'Ext.layout.container.Border',
        'Ext.layout.container.Fit',
        'Ext.ux.GMapPanel',
        'Ext.ux.IFrame',
        'Ext.window.Window',
        'Owl.util.Map'
    ],
    config: {
        listen: {
            // The fireEvent() is coming from a component so we listen on the component event domain
            component: {
                // The component we are listening to is alias : map
                'map': {
                    // The fireEvent() from the map component
                    markerClick: function (marker) {
                        /*
                         * This will create and open a window with a zoomed in street map as well
                         * as open the WikiPedia page from the url on the marker
                         * */
                        Ext.create('Ext.window.Window', {
                            title: marker.title, // Marker title
                            height: 600,
                            width: 1000,
                            modal: true,
                            layout: 'border',
                            maximizable: true,
                            items: [
                                {
                                    xtype: 'gmappanel',
                                    region: 'west',
                                    split: true,
                                    width: 300,
                                    center: {
                                        lat: marker.lat, // Marker latitude
                                        lng: marker.lng // Marker longitude
                                    },
                                    mapOptions: {
                                        mapTypeId: google.maps.MapTypeId.ROADMAP,
                                        zoom: 10
                                    }
                                },
                                {
                                    xtype: 'container',
                                    region: 'center',
                                    layout: 'fit',
                                    items: [
                                        {
                                            xtype: 'uxiframe',
                                            src: marker.url // Marker URL
                                        }
                                    ]
                                }
                            ]
                        }).show()
                    }
                }
            }
        }
    },
    /*
     * The init method fires before the view is initialized and the markers are loaded from the store
     **/
    init: function () {
        /*
        var markers = []; // Create and empty markers array
        var client = new WebSocket('ws://127.0.0.1:8080/', 'echo-protocol');
        var me = this;
        var map = me.getView(); //Reference to map view

        Owl.map = Ext.create('Owl.util.Map'); //'Owl.util.Map' in requires is mandatory
        Owl.map.setMarkers([]);

        client.onopen = function() {
            var user = Owl.globals.getUser(); // get user information
            var auth = JSON.stringify({type: 'auth', user_id: 803, mobiles: user.uid});
            client.send(auth);
        };

        client.onerror = function() {
            console.log('error');
        };

        client.onclose = function() {
            setTimeout(function() {
                client = new WebSocket('ws://127.0.0.1:8080/', 'echo-protocol');
            }, 5000);
        };

        client.onmessage = function(e) {
            //console.log(e);
            if (e && e.data) {
                var record = JSON.parse(e.data);
                // store = map.getViewModel().getStore('Markers'), // Get the store from the ViewModel
                // data;
                // Load the store
                // store.load(function (records) {
                //     // Iterate through each record
                //     Ext.each(records, function (record) {
                //         data = record.getData(); // Get the data object from each record
                //         markers.push(data); // Push the objects onto the markers array
                //     });
                // });
                var marker = {
                    mid: record.mid,
                    lat: record.pos.loc.lat,
                    lng: record.pos.loc.lon,
                    hdg: record.pos.hdg
                };
                markers.push(marker);
                Owl.util.Map.addMarker(marker);
                Owl.util.Map.updateMap(map);
                // var pt = new google.maps.LatLng(marker.lat, marker.lng);
                // map.setCenter(pt);
                // map.setZoom(6);

                // map.addMarker(marker);
            }
        }*/
    },
    /*
     * Method to add a new marker.  This could come from a form and could also use the geocode function
     * */
    addNewMarker: function (btn) {
        var map = btn.up('map'),
            marker = {
                lat: 31.633725,
                lng: -7.993092,
                title: "Marrakesh",
                url: 'https://en.wikipedia.org/wiki/Marrakesh'
            };
        map.addMarker(marker)
    },

    addMarker: function (marker) {
        var me = this;
        marker = Ext.apply({
            map: this.gmap
        }, marker);
        if (!marker.position) {
            marker.position = new google.maps.LatLng(marker.lat, marker.lng);
        }
        var m = new google.maps.Marker(marker);
        google.maps.event.addListener(m, "click", function () {
            me.fireEvent('markerClick', m); // This fires and event that can be listened to in controllers
        });
        return m;
    }
});
