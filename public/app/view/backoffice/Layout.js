
Ext.define('Owl.view.backoffice.Layout',{
    extend: 'Ext.tab.Panel',
    alias: 'widget.backoffice',

    requires: [
        'Owl.view.backoffice.security.Layout',
        'Owl.view.backoffice.make.Make'
    ],

    border: false,

    items: [
        {
            xtype: 'backoffice-security-layout'
        }, {
            xtype: 'backoffice-make'
        }
    ]
});
