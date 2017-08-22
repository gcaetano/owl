
Ext.define('Owl.view.locale.Translation',{
    extend: 'Ext.button.Split',
    xtype: 'translation',
    requires: [
        'Owl.view.locale.TranslationController',
        'Owl.view.locale.TranslationModel'
    ],

    controller: 'locale-translation',
    viewModel: {
        type: 'locale-translation'
    },

    menu: { //#3
        xtype: 'menu', //#4
        defaults:{
            listeners: {
                click: 'onMenuItemClick'
            }
        },
        items: [
            {
                xtype: 'menuitem', //#5
                iconCls: 'gb',
                text: $.t('app.english')
            },
            {
                xtype: 'menuitem', //#6
                iconCls: 'es',
                text: $.t('app.spanish') //'Español'
            },
            {
                xtype: 'menuitem', //#7
                iconCls: 'pt',
                text: $.t('app.portuguese')// 'Português'
            }
        ]
    }
});
