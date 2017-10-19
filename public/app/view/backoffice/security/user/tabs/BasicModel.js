Ext.define('Owl.view.backoffice.security.user.tabs.BasicModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.backoffice-security-user-tabs-basic',
    request : [
        'Owl.model.Profiles',
        'Owl.model.Cultures'
    ],

    stores: {
        Profiles: {
            autoLoad: true,
            model: 'Owl.model.Profiles'
        },
        Cultures: {
            autoLoad: true,
            model: 'Owl.model.Cultures'
        }
    }
});
