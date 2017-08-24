Ext.define('Owl.view.backoffice.security.west.groups.TreeGroups',{
    extend: 'Ext.tree.Panel',
    alias: 'widget.permission-security-tree-groups',
    itemId: 'treeGroups',
    requires: [
        'Owl.view.backoffice.security.west.groups.TreeGroupsController',
        'Owl.view.backoffice.security.west.groups.TreeGroupsModel'
    ],

    controller: 'backoffice-security-tree-groups',
    viewModel: {
        type: 'backoffice-security-tree-groups'
    },
    rootVisible: false,
    border: 0,
    autoScroll: true,
    listeners : {
        itemcontextmenu: 'showContextMenu'
    }
});
