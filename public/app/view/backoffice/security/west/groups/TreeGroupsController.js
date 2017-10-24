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
                render: this.onTreeRender
            }
        });
    },

    onTreeRender: function(view, options) {
        var store = Ext.create('Owl.store.Groups');
        if (store !== undefined) {
            store.load(function (records, op, success) { //#3
                Ext.each(records, function (item) { //#4
                    var node = { 
                        user: false,
                        text: $.t('app.' + item.get('text')),
                        leaf: item.data.users === undefined, //#12
                        glyph: Owl.util.Glyphs.getGlyph('group'),
                        id: item.get('id')
                    };

                    if(item.data.users !== undefined) {                        
                        node.children = [];
                        Ext.each(item.data.users, function (user) { //#4
                            node.children.push({
                                user: true,
                                leaf: true, //#12
                                text: Ext.String.format("{0} {1}", user.first_name, user.last_name),
                                _id : user._id,

                                username  : user.username,
                                first_name : user.first_name,
                                last_name : user.last_name,
                                email : user.email,
                                timezone : user.timezone,
                                profile : user.profile,
                                culture : user.culture,

                                glyph: Owl.util.Glyphs.getGlyph('user')
                            });
                        });
                    }
                    view.getRootNode().appendChild(node); //#14
                });
            });
        }
    },

    showContextMenu : function (view, record, item, index, event, eOpts){
        var menu =  Ext.create({xtype: 'permission-security-context-menu-groups'});
        var isUser = record.get('user');

        //not implemented.
        var addSubGroupItem =  menu.lookupReference('addSubGroup');
        addSubGroupItem.setDisabled(true);
        
        // It's supose to add a user inner a group.
        var addUserItem =  menu.lookupReference('addUser');
        addUserItem.setDisabled(isUser);

        // It's supose to edit an specific user
        var editUserItem =  menu.lookupReference('editUser');
        editUserItem.setDisabled(!isUser);

        // It's supose to delete an specific user
        var deleteUserItem =  menu.lookupReference('delUser');
        deleteUserItem.setDisabled(!isUser);

        menu.showAt(event.getXY());
        event.stopEvent();
    }
});
