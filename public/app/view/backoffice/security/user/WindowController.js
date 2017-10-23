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

        //reload tree..
        var groupId = form.findField("group").getValue();
        var trees = Ext.ComponentQuery.query('permission-security-tree-groups');     
        if(trees.length > 0) {
            var tree = trees[0];
            tree.getView().refresh(); //to refresh all nodes
            
            // var node = tree.getStore().getNodeById(groupId);        
            // var store = tree.getStore();
            // if (node){
            //     store.load({node:node});
            // }
    
            me.onCancel();
        }
    },

    onSaveFailure: function(form, action) {
        Owl.util.Util.handleFormFailure(action);
    }
});
