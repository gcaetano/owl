
Ext.define('Owl.view.backoffice.security.Layout', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.backoffice-security-layout',
    title: $.t('app.security'),

    requires: [
        'Owl.view.backoffice.security.west.Layout',
        'Owl.view.backoffice.security.permission.Layout'
    ],


    layout: {
        type: 'border'
    },

    border: false,

    items: [
        {
            xtype: 'backoffice-security-west-layout'
        },
        {
            xtype: 'permission-layout'
        }
    ]
});
