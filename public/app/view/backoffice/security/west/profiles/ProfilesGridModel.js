Ext.define('Owl.view.backoffice.security.west.profiles.ProfilesGridModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.backoffice-security-west-profiles-profiles',
    request : [
        'Owl.model.Profiles'
    ],

    stores: {
        Profiles: {
            autoLoad: true,
            model: 'Owl.model.Profiles'
        }
    }
});
