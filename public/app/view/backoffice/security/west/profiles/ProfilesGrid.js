
Ext.define('Owl.view.backoffice.security.west.profiles.ProfilesGrid',{
    extend: 'Ext.grid.Panel',
    alias: 'widget.permission-security-profiles',
    title: $.t('app.profiles'),

    requires: [
        'Owl.view.backoffice.security.west.profiles.ProfilesGridController',
        'Owl.view.backoffice.security.west.profiles.ProfilesGridModel'
    ],

    controller: 'backoffice-security-west-profiles-profiles',
    viewModel: {
        type: 'backoffice-security-west-profiles-profiles'
    },
    bind: {
        store: '{Profiles}'
    },
    columns: [
        {
            xtype: 'gridcolumn',
            dataIndex: 'alias',
            text: $.t('app.profile'),
            flex: 1, // to stretch the column to the all available space
            headerAlign: 'center',
            align: 'left'
        },
        {
            xtype: 'gridcolumn',
            dataIndex: 'level',
            text: $.t('app.level'),
            width: 50
        }
    ]
});
