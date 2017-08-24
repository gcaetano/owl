Ext.define('Owl.view.backoffice.security.west.groups.TreeGroupsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.backoffice-security-tree-groups',
    requires: [
        'Owl.view.backoffice.security.west.groups.menu.ContextMenuGroups'
    ],

    showContextMenu : function (view, record, item, index, event, eOpts){
        var contextMenu =  Ext.create({xtype: 'permission-security-context-menu-groups'});
        contextMenu.showAt(event.getXY());
        event.stopEvent();
    }

});
