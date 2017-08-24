Ext.define('Owl.view.backoffice.security.user.WindowController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.backoffice-security-user-window',

    onSave: function(button, e, options) {
        var form = button.up('panel').down('form');
        var me = this;
        debugger;
        if (form && form.isValid()) {
            form.submit({
                clientValidation: true,
                url: '/security/user/save',
                scope: me,
                success: 'onSaveSuccess',
                failure: 'onSaveFailure'
            });
        }
    },

    onCancel : function(button, e, options){
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
