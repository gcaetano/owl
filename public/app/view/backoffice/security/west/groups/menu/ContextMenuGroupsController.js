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

        Ext.Msg.show({
            title : 'Remove',
            width : 320,
            height : 120,
            msg : 'Removing user, do you confirm?',
            closable : false,
            buttons : Ext.Msg.YESCANCEL,
            buttonText :  { yes : 'Yes', cancel : 'Cancel' },
            fn : function(btn, inputText, showConfig){
                if(btn === 'yes'){
                    Ext.getBody().mask('Please whait!')
                    var trees = Ext.ComponentQuery.query('treepanel#treeGroups');
                     if(trees && trees.length > 0) {
                        var treeGroups = trees[0];
                        var items = treeGroups.getSelectionModel().selected.items;
                        if(items.length > 0) {
                            var idUser = items[0].data.id;
                            var idGroup = items[0].parentNode.data.id;
                            Ext.Ajax.request({
                                url: Ext.String.format('/users/{0}/{1}', idUser, idGroup),
                                method: 'DELETE',
                                scope: me,                  
                                success: 'onRemoveUserSuccess', 
                                failure: 'onRemoveUserFailure'  
                            });
                        }
                    }
                }
            }
        });
    },

    showWindow: function(title, glyph){
        var me = this;
        var ref = Ext.ComponentQuery.query('window#userWindow');
        var window = ref.lenght > 0 ? ref[0] : Ext.create({xtype: 'backoffice-security-user-window'});
        window.setTitle(title);
        window.setGlyph(glyph);
        window.show();
    },

    onRemoveUserSuccess: function(conn, response, options, eOpts){
        me = this;
        Ext.getBody().unmask();        
        // var result = Ext.JSON. decode(response.responseText, true); //"{"success":true,"message":{"user":"59ee0cc86e670539a8f2c5b2","group":"59df82bdc638ae293c1c62b9"}}"
        me.detachUserFromGroup();
        Owl.util.Util.showToast('The user was removed!');
    },

    onRemoveUserFailure: function(conn, response, options, eOpts) {
        // this.getView().unmask();
        Owl.util.showErrorMsg('There was a server error!');
    },

    detachUserFromGroup : function() {
        var trees = Ext.ComponentQuery.query('treepanel#treeGroups');
        if(trees && trees.length > 0) {
            var treeGroups = trees[0];
            var items = treeGroups.getSelectionModel().selected.items;
            
            if(items.length > 0) {
                var user = items[0];
                var group = items[0].parentNode;
                group.removeChild(user);
           }
        }
    }
});
