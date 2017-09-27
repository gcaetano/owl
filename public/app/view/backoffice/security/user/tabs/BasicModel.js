Ext.define('Owl.view.backoffice.security.user.tabs.BasicModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.backoffice-security-user-tabs-basic',
    request : [
        'Owl.model.Profiles'
    ],

    stores: {
        Profiles: {
            autoLoad: true,
            model: 'Owl.model.Profiles'
        },
        Locales: {
            autoLoad: true,
            model: 'Owl.model.Locales'
        }
    }
});
