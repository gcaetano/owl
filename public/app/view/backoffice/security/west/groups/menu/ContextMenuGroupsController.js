Ext.define('Owl.view.backoffice.security.west.groups.menu.ContextMenuGroupsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.backoffice-security-west-groups-menu-contextmenugroups',

    requires: [
        'Owl.view.backoffice.security.user.Window',
        'Owl.view.backoffice.security.west.groups.Window',
        'Owl.util.Util',
        'Owl.util.TreeGroup',
        'Owl.util.Windows'
    ],

    onAddGroup: function (menu, item, e, eOpts) {
        var me = this;
        var window = Owl.util.Windows.getGroupWindow();
        window.show();
    },

    onAddSubGroup: function (menu, item, e, eOpts) {
        console.log('onAddSubGroup not implemented');
    },

    onDeleteGroup: function (menu, item, e, eOpts) {
        var me = this;
        var group = Owl.util.TreeGroup.getSelectedItem();
        if(group){
            var data = group.getData();
            Ext.Msg.show({
                title: 'Remove',
                msg: Ext.String.format('Removing group "{0}", do you confirm?', data.text),
                closable: false,
                buttons: Ext.Msg.YESCANCEL,
                buttonText: { yes: 'Yes', cancel: 'Cancel' },
                fn: function (btn, inputText, showConfig) {
                    if (btn === 'yes') {
                        Ext.getBody().mask('Please whait!');
                        Ext.Ajax.request({
                            url: Ext.String.format('/groups/{0}', data.id),
                            method: 'DELETE',
                            scope: me,
                            success: 'onRemoveGroupSuccess',
                            failure: 'onRemoveGroupFailure'
                        });
                    }
                }
            });
        }
    },

    onAddUser: function (menu, item, e, eOpts) {
        var me = this;
        var glyph = Owl.util.Glyphs.getGlyph('add_user');
        var title = $.t('app.add user')
        var window = Owl.util.Windows.getUserWindow(title, glyph);

        window.setTitle(title);
        window.setGlyph(glyph);
        window.show();


        me.hideButtons(window);
        var save = window.lookupReference('buttonSave');
        if (save) save.show();

        // set the selected group to combo
        var selection = me.getTreeSelectedItem();
        var tab = window.lookupReference('userBasicPanel');

        var cbxGroup = tab.lookupReference('group');
        cbxGroup.setValue(selection.get("_id"));
    },

    onEditUser: function (menu, item, e, eOpts) {
        var me = this;
        var glyph = Owl.util.Glyphs.getGlyph('edit');
        var title = $.t('app.add user')
        var window = Owl.util.Windows.getUserWindow(title, glyph);

        window.setTitle(title);
        window.setGlyph(glyph);
        window.show();

        me.hideButtons(window);
        var edit = window.lookupReference('buttonEdit');
        if (edit) edit.show();

        var form = window.down('form').getForm();
        var selection = me.getTreeSelectedItem();
        form.loadRecord(selection);
    },

    onDelUser: function (menu, item, e, eOpts) {
        var me = this;

        Ext.Msg.show({
            title: 'Remove',
            width: 320,
            height: 120,
            msg: 'Removing user, do you confirm?',
            closable: false,
            buttons: Ext.Msg.YESCANCEL,
            buttonText: { yes: 'Yes', cancel: 'Cancel' },
            fn: function (btn, inputText, showConfig) {
                if (btn === 'yes') {
                    Ext.getBody().mask('Please whait!');
                    var user = Owl.util.TreeGroup.getTreeSelectedItem(); // here is the group   
                    var idUser = user.data._id;
                    var idGroup = user.parentNode.data._id;
                    Ext.Ajax.request({
                        url: Ext.String.format('/users/{0}/{1}', idUser, idGroup),
                        method: 'DELETE',
                        scope: me,
                        success: 'onRemoveUserSuccess',
                        failure: 'onRemoveUserFailure'
                    });
                }
            }
        });
    },

    // getWindow: function (title, glyph) {
    //     var me = this;
    //     var ref = Ext.ComponentQuery.query('window#userWindow');
    //     var window = ref.lenght > 0 ? ref[0] : Ext.create({ xtype: 'backoffice-security-user-window' });
    //     return window;
    // },

    // getGroupWindow: function (title, glyph) {
    //     var me = this;
    //     var ref = Ext.ComponentQuery.query('window#groupWindow');
    //     var window = ref.lenght > 0 ? ref[0] : Ext.create({ xtype: 'backoffice-security-group-window' });
    //     return window;
    // },

    onRemoveUserSuccess: function (conn, response, options, eOpts) {
        me = this;
        Ext.getBody().unmask();
        // var result = Ext.JSON. decode(response.responseText, true); //"{"success":true,"message":{"user":"59ee0cc86e670539a8f2c5b2","group":"59df82bdc638ae293c1c62b9"}}"
        me.detachUserFromGroup();
        Owl.util.Util.showToast('The user was removed!');
    },
   
    onRemoveUserFailure: function (conn, response, options, eOpts) {
        // this.getView().unmask();
        Owl.util.showErrorMsg('There was a server error!');
    },

    onRemoveGroupSuccess: function (conn, response, options, eOpts) {
        me = this;
        Ext.getBody().unmask();
        //Owl.util.TreeGroup.reload();
        var group = Owl.util.TreeGroup.getSelectedItem();
        var parent = group.parentNode;
        parent.removeChild(group);
        Owl.util.Util.showToast('The group was removed!');
    },

    onRemoveGroupFailure: function (conn, response, options, eOpts) {
        // this.getView().unmask();
        Owl.util.showErrorMsg('There was a server error!');
    },

    detachUserFromGroup: function () {
        me = this;
        var user = Owl.util.TreeGroup.getSelectedItem();
        var group = user.parentNode;
        group.removeChild(user);
    },

    getTreeSelectedItem: function () {
        var trees = Ext.ComponentQuery.query('treepanel#treeGroups');
        var selection;
        if (trees && trees.length > 0) {
            var treeGroups = trees[0];
            var items = treeGroups.getSelectionModel().selected.items;
            selection = items[0];
        }
        return selection;
    },

    hideButtons: function (window) {
        var save = window.lookupReference('buttonSave');
        if (save) save.hide();
        var edit = window.lookupReference('buttonEdit');
        if (edit) edit.hide();
    }
});
