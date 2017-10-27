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

    onEditGroup: function (nenu, item, e, eOpts) {
        var me = this;
        var group = Owl.util.TreeGroup.getSelectedItem();
        if (group) {
            var data = group.getData();

            var window = Owl.util.Windows.getGroupWindow();
            var title = Ext.String.format('{0} [{1}]', $.t('app.edit group'), data.text);
            var glyph = Owl.util.Glyphs.getGlyph('edit');
            window.setTitle(title);
            window.setGlyph(glyph);

            Owl.util.Windows.hideButtons(window);
            var button = window.lookupReference('buttonEdit');
            if (button) button.show();

            var form = window.down('form').getForm();
            var selection = me.getTreeSelectedItem();
            debugger;
            form.loadRecord(selection);

            window.show();
        }
    },

    onAddSubGroup: function (menu, item, e, eOpts) {
        console.log('onAddSubGroup not implemented');
    },

    onDeleteGroup: function (menu, item, e, eOpts) {
        var me = this;
        var group = Owl.util.TreeGroup.getSelectedItem();
        if (group) {
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
        var window = Owl.util.Windows.getUserWindow(title, glyph);

        me.hideButtons(window);
        var save = window.lookupReference('buttonSave');
        if (save) save.show();

        // set the selected group to combo
        var selection = me.getTreeSelectedItem();
        var tab = window.lookupReference('userBasicPanel');
        if (selection && tab) {
            var cbxGroup = tab.lookupReference('group');
            cbxGroup.setValue(selection.get("_id"));

            var title = Ext.String.format("{0} [{1}]", $.t('app.add user'), selection.get("alias"));

            window.setTitle(title);
            window.setGlyph(glyph);
            window.show();
        }
    },

    onEditUser: function (menu, item, e, eOpts) {
        var me = this;
        var glyph = Owl.util.Glyphs.getGlyph('edit');
        var title = $.t('app.edit user')
        var window = Owl.util.Windows.getUserWindow();

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
                    var user = Owl.util.TreeGroup.getSelectedItem(); // here is the group   
                    if (user) {
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
            }
        });
    },

    onRemoveUserSuccess: function (conn, response, options, eOpts) {
        me = this;
        Ext.getBody().unmask();
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
