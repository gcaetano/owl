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
                    var firstName = form.findField("first_name").getValue();
                    var lastname = form.findField("last_name").getValue();
                    var node = {
                        id : id,
                        user: true,
                        leaf: true, 
                        text: Ext.String.format('{0} {1}', firstName, lastname),
                        glyph: Owl.util.Glyphs.getGlyph('user')
                    }
                    group.appendChild(node);
                }
            }
        }
    }
});
