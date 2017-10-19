Ext.define('Owl.view.backoffice.security.west.groups.menu.ContextMenuGroupsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.backoffice-security-west-groups-menu-contextmenugroups',

    requires: [
        'Owl.view.backoffice.security.user.Window',
        'Owl.util.Util'
    ],

    onAddSubGroup : function (menu, item, e, eOpts ){
        console.log('onAddSubGroup not implemented');
    },

    onAddUser : function (menu, item, e, eOpts ){
        var me = this;
        var glyph = Owl.util.Glyphs.getGlyph('add_user');
        var title = $.t('app.add user')
        var window = me.showWindow(title, glyph);
    },

    onEditUser : function (menu, item, e, eOpts){
        var me = this;
        var glyph = Owl.util.Glyphs.getGlyph('edit');
        var title = $.t('app.add user')
        var window = me.showWindow(title, glyph);
    },

    onDelUser : function (menu, item, e, eOpts){
        var me = this;
        var glyph = Owl.util.Glyphs.getGlyph('del_user');
        var title = $.t('app.delete user')
        var window = me.showWindow(title, glyph);
    },

    showWindow: function(title, glyph){
        var me = this;
        var ref = Ext.ComponentQuery.query('window#userWindow');
        var window = ref.lenght > 0 ? ref[0] : Ext.create({xtype: 'backoffice-security-user-window'});
        window.setTitle(title);
        window.setGlyph(glyph);
        window.show();
    }
});
