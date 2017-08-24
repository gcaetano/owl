
Ext.define('Owl.view.user.User',{
    extend: 'Ext.window.Window',
    alias: 'widget.user',

    requires: [
        'Owl.view.user.UserController',
        'Owl.view.user.UserModel'
    ],

    controller: 'user',
    viewModel: {
        type: 'user'
    },

    height: 230,
    width: 430,
    layout: {
        type: 'fit'
    },
    autoShow: true,

    title: $.t('app.user'),
    glyph: Owl.util.Glyphs.getGlyph('user'),

    closable: true,
    resizable: false,
    items: [
        {
            xtype: 'user-host-tabs'
        }
    ],

    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            layout: {
                pack: 'end', //#22
                type: 'hbox'
            },
            items: [
                {
                    xtype: 'button',
                    text: 'Save',
                    glyph: Owl.util.Glyphs.getGlyph('save'),
                    listeners: {
                        click: 'onSave'
                    }
                },
                {
                    xtype: 'button',
                    text: 'Cancel',
                    glyph: Owl.util.Glyphs.getGlyph('cancel'),
                    listeners: {
                        click: 'onCancel'
                    }
                }
            ]
        }
    ]
});
