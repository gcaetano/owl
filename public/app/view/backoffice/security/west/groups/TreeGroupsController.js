Ext.define('Owl.view.backoffice.security.west.groups.TreeGroupsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.backoffice-security-tree-groups',
    requires: [
        'Owl.view.backoffice.security.west.groups.menu.ContextMenuGroups',
        'Owl.store.Groups'
    ],

    init: function(application) {
        this.control({
            'permission-security-tree-groups': {
                render: this.onTreeRender,
                itemexpand: this.onItemExpand
            }
        });
    },

    onTreeRender: function(view, options) {
        var store = Ext.create('Owl.store.Groups');
        if (store !== undefined) {
            store.load(function (records, op, success) { //#3
                Ext.each(records, function (item) { //#4
                    var node = { //#11
                        text: $.t('app.' + item.get('text')),
                        leaf: item.data.users === undefined, //#12
                        glyph: Owl.util.Glyphs.getGlyph('group'),
                        id: item.get('id')
                    };

                    if(item.data.users !== undefined) {                        
                        node.children = [];
                        Ext.each(item.data.users, function (user) { //#4
                            node.children.push({
                                leaf: true, //#12
                                text: user,
                                id : user,
                                glyph: Owl.util.Glyphs.getGlyph('user')
                            });
                        });
                    }
                    view.getRootNode().appendChild(node); //#14
                });
            });
        }
    },

    onItemExpand: function (view, eOpt ) {
        var nodeId = view.get('id');
    },

    showContextMenu : function (view, record, item, index, event, eOpts){
        var contextMenu =  Ext.create({xtype: 'permission-security-context-menu-groups'});
        contextMenu.showAt(event.getXY());
        event.stopEvent();
    }
});
