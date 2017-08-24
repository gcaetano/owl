Ext.define('Owl.view.backoffice.security.user.WindowModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.backoffice-security-user-window',
    request : [
        'Owl.model.security.User'
    ],

    users: {
        model: 'Owl.model.security.User',
        autoLoad: true
    }
});
