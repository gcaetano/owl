Ext.define('Owl.view.backoffice.security.west.groups.PanelController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.backoffice-security-west-groups-panel',

    requires: [
        'Owl.util.Windows',
        'Owl.util.TreeGroup'
    ],


    onAddGroup : function(menu, item, e, eOpts) {
        var me = this;
        var window = Owl.util.Windows.getGroupWindow();
        var title = $.t('app.new group');
        var glyph = Owl.util.Glyphs.getGlyph('group');
        window.setTitle(title);
        window.setGlyph(glyph);
        
        Owl.util.Windows.hideButtons(window);
        var button = window.lookupReference('buttonSave');
        if (button) button.show();

        window.show();
    },

    onRefreshGroups: function(menu, item, e, eOpts) {
        Ext.getBody().mask('Please whait!');
        var window = Owl.util.TreeGroup.reload();
        Ext.getBody().unmask();
    }    
});
