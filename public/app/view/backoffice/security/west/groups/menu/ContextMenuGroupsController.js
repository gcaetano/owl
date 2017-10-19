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
        var window = me.showWindow('add');
    },

    onEditUser : function (menu, item, e, eOpts){
        var window = Ext.ComponentQuery.query('backoffice-security-user-window');
        if(window.lenght > 0){
            userWindow = window[0];
            userWindow.setMode('edit');
        }
    },

    onDelUser : function (menu, item, e, eOpts){
        var window = Ext.ComponentQuery.query('backoffice-security-user-window');
        if(window.lenght > 0){
            userWindow = window[0];
            userWindow.setMode('edit');
        }
    },

    showWindow: function(mode){
        var me = this;
        var ref = Ext.ComponentQuery.query('window#userWindow');
        var window = ref.lenght > 0 ? ref[0] : Ext.create({xtype: 'backoffice-security-user-window'});
        window.getView().setTitle(mode);
    }
});
