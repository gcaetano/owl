Ext.define('Owl.view.backoffice.security.west.groups.menu.ContextMenuGroupsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.backoffice-security-west-groups-menu-contextmenugroups',

    requires: [
        'Owl.view.backoffice.security.user.Window'
    ],

    onAddSubGroup : function (menu, item, e, eOpts ){
        console.log('onAddSubGroup not implemented');
    },

    onAddUser : function (menu, item, e, eOpts ){
        Ext.create({xtype: 'backoffice-security-user-window'});
    },

    onEditUser : function (menu, item, e, eOpts ){
        console.log('onEditUser not implemented');
    },

    onDelUser : function (menu, item, e, eOpts ){
        console.log('onDelUser not implemented');
    }
});
