Ext.define('Owl.view.backoffice.security.west.groups.TreeGroupsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.backoffice-security-tree-groups',
    requires: [
        'Owl.view.backoffice.security.west.groups.menu.ContextMenuGroups',
        'Owl.store.Groups',
        'Owl.util.TreeGroup'
    ],

    init: function(application) {
        this.control({
            'permission-security-tree-groups': {
                render: this.onTreeRender
            }
        });
    },

    onTreeRender: function(view, options) {
        Owl.util.TreeGroup.load(view);
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
