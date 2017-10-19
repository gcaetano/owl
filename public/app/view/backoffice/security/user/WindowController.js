Ext.define('Owl.view.backoffice.security.user.WindowController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.backoffice-security-user-window',

    init: function(application) {
        // var me = this;

        // var mode = me.getMode().getView().getMode();

        // console.log(mode);

        // var trees = Ext.ComponentQuery.query('treepanel#treeGroups');
        // if(trees && trees.length > 0) {
        //     var treeGroups = trees[0];
        //     var items = treeGroups.getSelectionModel().selected.items;
        //     if(items.length > 0) {
        //         var group = items[0].data;
        //         // me.getView().setTitle(group.text);
        //     }
        // }        
    },

    onSave: function(button, e, options) {
        var form = button.up('panel').down('form');
        var me = this;
        if (form && form.isValid()) {
            form.submit({
                clientValidation: true,
                url: '/user',
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
        me.onCancel();
        me.refresh();
        Owl.util.Util.showToast('Success! User saved.');
    },

    onSaveFailure: function(form, action) {
        Owl.util.Util.handleFormFailure(action);
    }
});
