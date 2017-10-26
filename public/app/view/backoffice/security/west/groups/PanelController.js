Ext.define('Owl.view.backoffice.security.west.groups.PanelController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.backoffice-security-west-groups-panel',

    requires: [
        'Owl.util.Windows',
        'Owl.util.TreeGroup'
    ],


    onAddGroup : function(menu, item, e, eOpts) {
        var window = Owl.util.Windows.getGroupWindow();
        window.show();
    },

    onRefreshGroups: function(menu, item, e, eOpts) {
        Ext.getBody().mask('Please whait!');
        var window = Owl.util.TreeGroup.reload();
        Ext.getBody().unmask();
    },
});
