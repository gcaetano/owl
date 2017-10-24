Ext.define('Owl.view.backoffice.security.user.WindowController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.backoffice-security-user-window',

    init: function(application) {
        var me = this;
        var trees = Ext.ComponentQuery.query('treepanel#treeGroups');
        if(trees && trees.length > 0) {
            var treeGroups = trees[0];
            var items = treeGroups.getSelectionModel().selected.items;
            if(items.length > 0) {
                var group = items[0].data;
                var tab = me.lookupReference('userBasicPanel');
                var cbxGroup = tab.lookupReference('group');
                cbxGroup.setValue(group.id);
            }
        }
    },

    onSave: function(button, e, options) {
        Ext.getBody().mask('Please whait!');
        var form = button.up('panel').down('form');
        var me = this;
        if (form && form.isValid()) {
            form.submit({
                clientValidation: true,
                url: '/users',
                scope: me,
                success: 'onSaveSuccess',
                failure: 'onSaveFailure'
            });
        }
    },

    onCancel : function(button, e, options) {
        var me = this;
        me.getView().destroy();
    },

    onSaveSuccess: function(form, action) {
        var me = this;
        Owl.util.Util.showToast('Success! User saved.');
        me.attachUserToGroup(form, action);
        Ext.getBody().unmask();
        me.onCancel(); // that will cloce the form, just.
    },

    onSaveFailure: function(form, action) {
        Owl.util.Util.handleFormFailure(action);
    },

    attachUserToGroup : function(form, action) {
        var id = action.result.message.id;
        var trees = Ext.ComponentQuery.query('treepanel#treeGroups');
        if(trees && trees.length > 0) {
            var treeGroups = trees[0];
            var items = treeGroups.getSelectionModel().selected.items; 
            
            if(items.length > 0) {
                var group = items[0]; // is the group
                if(form){
                    var node = {
                        user: true,
                        leaf: true,
                        text: Ext.String.format("{0} {1}", user.first_name, user.last_name),
                        _id : id,
                        glyph: Owl.util.Glyphs.getGlyph('user'),

                        username  : form.findField("username").getValue(),
                        first_name : form.findField("first_name").getValue(),
                        last_name : form.findField("last_name").getValue(),
                        email : form.findField("email").getValue(),
                        group : form.findField("group").getValue(),
                        timezone : form.findField("timezone").getValue(),
                        profile : form.findField("profile").getValue(),
                        culture : form.findField("culture").getValue()

                    };
                    group.appendChild(node);
                }
            }
        }
    }
});
