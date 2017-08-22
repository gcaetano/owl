
Ext.define('Owl.view.user.User',{
    extend: 'Ext.window.Window',
    alias: 'widget.user',

    requires: [
        'Owl.view.user.UserController',
        'Owl.view.user.UserModel'
    ],

    controller: 'user-user',
    viewModel: {
        type: 'user-user'
    },

    height: 230,
    width: 430,
    layout: {
        type: 'fit'
    },
    autoShow: true,

    title: $.t('app.user'),

    closable: true,
    resizable: false,
    items: [
        {
            xtype: 'user-host-tabs'
        }
    ]
});
