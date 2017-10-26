Ext.define('Owl.view.backoffice.security.west.groups.WindowController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.backoffice-security-west-groups-window',

    requires: [
        'Owl.util.TreeGroup'
    ],

    onSave: function (button, e, options) {
        Ext.getBody().mask('Please whait!');
        var form = button.up('panel').down('form');
        var me = this;

        if (form && form.isValid()) {
            form.submit({
                clientValidation: true,
                url: '/groups',
                scope: me,
                success: 'onSaveSuccess',
                failure: 'onSaveFailure'
            });
        }
    },

    onSaveSuccess: function (form, action) {
        me = this;
        Ext.getBody().unmask();        
        Owl.util.Util.showToast('The group was created!');
        Owl.util.TreeGroup.reload();
        me.onCancel();
    },

    onSaveFailure: function(form, action) {
        Ext.getBody().unmask();        
        Owl.util.showErrorMsg('There was a server error!');
    },

    onCancel: function (button, e, options) {
        var me = this;
        me.getView().destroy();
    }
});
