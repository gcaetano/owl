
Ext.define('Owl.view.backoffice.security.center.permission.mobiles.Mobiles',{
    extend: 'Ext.panel.Panel',
    alias: 'widget.permission-security-mobiles',
    title: $.t('app.mobiles'),
    requires: [
        'Owl.view.backoffice.security.center.permission.mobiles.MobilesController',
        'Owl.view.backoffice.security.center.permission.mobiles.MobilesModel'
    ],

    controller: 'backoffice-security-permission-mobiles-mobiles',
    viewModel: {
        type: 'backoffice-security-permission-mobiles-mobiles'
    },

    glyph: 'xf0d1@FontAwesome',

    html: 'Mobiles!!'
});
