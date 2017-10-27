
Ext.define('Owl.view.backoffice.security.center.permission.Layout',{
    extend: 'Ext.tab.Panel',
    alias: 'widget.permission-layout',
    requires: [
        'Owl.view.backoffice.security.center.permission.mobiles.Mobiles',
        'Owl.view.backoffice.security.center.permission.reports.Reports'
    ],
    region: 'center',
    border: false,
    items: [
        {
            xtype: 'permission-security-mobiles'
        },
        {
            xtype: 'permission-security-reports'
        }
    ]
});
