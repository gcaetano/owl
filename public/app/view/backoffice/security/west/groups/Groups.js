
Ext.define('Owl.view.backoffice.security.west.groups.Groups',{
    extend: 'Ext.tree.Panel',
    alias: 'widget.permission-security-tree-groups',
    itemId: 'treeGroups',
    requires: [
        'Owl.view.backoffice.security.west.groups.GroupsController',
        'Owl.view.backoffice.security.west.groups.GroupsModel'
    ],

    controller: 'backoffice-security-groups-groups',
    viewModel: {
        type: 'backoffice-security-groups-groups'
    },
    rootVisible: false,
    border: 0,
    autoScroll: true
});
