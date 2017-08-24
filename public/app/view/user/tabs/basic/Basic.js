
Ext.define('Owl.view.user.tabs.basic.Basic',{
    extend: 'Ext.panel.Panel',
    alias: 'widget.user-tabs-basic',
    config: {
        securityLevel: 2 //Super Administrators
    },
    requires: [
        'Owl.view.user.tabs.basic.BasicController',
        'Owl.view.user.tabs.basic.BasicModel'
    ],

    controller: 'user-tabs-basic-basic',
    viewModel: {
        type: 'user-tabs-basic-basic'
    },
    closable: false
});
