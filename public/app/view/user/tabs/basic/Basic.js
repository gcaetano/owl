
Ext.define('Owl.view.user.tabs.basic.Basic',{
    extend: 'Ext.tab.Tab',
    alias: 'widget.user-tabs-basic',

    requires: [
        'Owl.view.user.tabs.basic.BasicController',
        'Owl.view.user.tabs.basic.BasicModel'
    ],

    controller: 'user-tabs-basic-basic',
    viewModel: {
        type: 'user-tabs-basic-basic'
    },
    closable: false,
    title: "Foo"
});
