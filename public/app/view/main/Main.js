/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Owl.view.main.Main', {
    extend: 'Ext.panel.Panel',
    xtype: 'app-main',

    requires: [
        'Ext.plugin.Viewport',
        'Owl.view.main.MainController',
        'Owl.view.main.MainModel',
        'Owl.view.locale.Translation',
        'Owl.view.backoffice.Layout'
    ],

    controller: 'main',
    viewModel: 'main',
    plugins: 'viewport',
    layout: 'card',
    defaults: {
        border: false
    },
    border: false,

    items: [
       {
           xtype: 'fleet'
       },{
            xtype: 'backoffice'
        }
    ],
    dockedItems: [
    {
        xtype: 'toolbar',
        dock: 'top',
        items: [
            {
                xtype: 'label',
                text: 'Owl'
            },
            '|',
            {
                xtype: 'button',
                itemId: 'fleet',
                text: 'Fleet',
                reference: 'fleet',
                glyph: 'xf278@FontAwesome',
                listeners: {
                    click: 'onMapClick'
                }
            },
            {
                xtype: 'button',
                itemId: 'reports',
                text: 'Reports',
                reference: 'reports',
                iconCls : 'icon-black',
                glyph: 'xf0f6@FontAwesome',
                listeners: {
                    click: 'onReportsClick'
                }
            },
            {
                xtype: 'button',
                itemId: 'backOffice',
                text: 'Backoffice',
                reference: 'backOffice',
                glyph: 'xf085@FontAwesome',
                listeners: {
                    click: 'onBackOfficeClick'
                }
            },
            '->',
            {
                xtype: 'button',
                itemId: 'user',
                text: 'Giuliano',
                reference: 'user',
                glyph: 'xf007@FontAwesome',
                listeners: {
                    click: 'onUserClick'
                }
            },
            {
                xtype: 'button',
                itemId: 'logout',
                reference: 'logout',
                glyph: 'xf08b@FontAwesome',
                listeners: {
                    click: 'onLogout'
                }
            }
        ]
    }
]

});
