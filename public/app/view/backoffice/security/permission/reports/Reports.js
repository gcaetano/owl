
Ext.define('Owl.view.backoffice.security.permission.reports.Reports',{
    extend: 'Ext.panel.Panel',
    alias: 'widget.permission-security-reports',
    title: $.t('app.reports'),
    requires: [
        'Owl.view.backoffice.security.permission.reports.ReportsController',
        'Owl.view.backoffice.security.permission.reports.ReportsModel'
    ],

    controller: 'backoffice-security-permission-reports-reports',
    viewModel: {
        type: 'backoffice-security-permission-reports-reports'
    },
    glyph: 'xf0f6@FontAwesome',

    html: 'Hello, World!!'
});
