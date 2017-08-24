Ext.define('Owl.view.backoffice.security.west.groups.PanelController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.backoffice-security-west-groups-panel',

    requires: [
        'Owl.store.Groups',
        'Owl.util.Glyphs'
    ],

    init: function(application) {
        this.control({ // #1
            "permission-security-group-panel": {
                render: this.onTreeGroupsRender // #4
            }
        });
    },

    onTreeGroupsRender: function(view, options) {
        var tree = view.down('panel');
        var store = Ext.create('Owl.store.Groups');
        if (store !== undefined) {
            store.load(function (records, op, success) { //#3
                Ext.each(records, function (item) { //#4
                    var node = { //#11
                        text: item.get('text'),
                        leaf: false, //#12
                        glyph: Owl.util.Glyphs.getGlyph('group'),
                        id: item.get('id')
                    };
                    tree.getRootNode().appendChild(node); //#14
                });
            });
        }
    }
});
