Ext.define('Owl.view.backoffice.security.user.WindowController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.backoffice-security-user-window',

    onSave: function(button, e, options){
        console.log('onSave not implemented');
    },

    onCancel : function(button, e, options){
        this.getView().destroy();
    }
});
