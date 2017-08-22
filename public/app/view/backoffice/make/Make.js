
Ext.define('Owl.view.backoffice.make.Make',{
    extend: 'Ext.panel.Panel',
    alias: 'widget.backoffice-make',
    title: $.t('app.make'),

    requires: [
        'Owl.view.backoffice.make.MakeController',
        'Owl.view.backoffice.make.MakeModel'
    ],

    controller: 'backoffice-make-make',
    viewModel: {
        type: 'backoffice-make-make'
    },

    html: 'Make!!'
});
