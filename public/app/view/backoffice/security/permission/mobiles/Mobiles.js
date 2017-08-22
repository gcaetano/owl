
Ext.define('Owl.view.backoffice.security.permission.mobiles.Mobiles',{
    extend: 'Ext.panel.Panel',
    alias: 'widget.permission-security-mobiles',
    title: $.t('app.mobiles'),
    requires: [
        'Owl.view.backoffice.security.permission.mobiles.MobilesController',
        'Owl.view.backoffice.security.permission.mobiles.MobilesModel'
    ],

    controller: 'backoffice-security-permission-mobiles-mobiles',
    viewModel: {
        type: 'backoffice-security-permission-mobiles-mobiles'
    },

    glyph: 'xf0d1@FontAwesome',

    html: 'Mobiles!!'
});
