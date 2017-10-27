
Ext.define('Owl.view.backoffice.security.user.Window', {
    
    config: {
        mode : 'unnamed'
    },

    itemId : 'userWindow',
    extend: 'Ext.window.Window',
    alias: 'widget.backoffice-security-user-window',
    requires: [
        'Owl.view.backoffice.security.user.WindowController',
        'Owl.view.backoffice.security.user.WindowModel',
        'Owl.util.Glyphs',
        'Owl.util.Util',
        'Owl.view.backoffice.security.user.tabs.Basic'
    ],
    controller: 'backoffice-security-user-window',
    viewModel: {
        type: 'backoffice-security-user-window'
    },
    layout: {
        type: 'fit'
    },
    title: $.t('app.add user'),
    glyph: Owl.util.Glyphs.getGlyph('add_user'),
    resizable: false,
    closable: false,
    height: 350,
    width: 600,
    modal: true,
    items: [
        {
            xtype: 'tabpanel',
            items: [
                {
                    xtype: 'backoffice-security-user-tabs-basic'
                }
            ]
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
                    text: $.t('app.save'),
                    hidden: true,
                    reference: 'buttonSave',
                    glyph: Owl.util.Glyphs.getGlyph('save'),
                    listeners: {
                        click: 'onSave'
                    }
                }, {
                    xtype: 'button',
                    text: $.t('app.edit'),
                    hidden: true,
                    reference: 'buttonEdit',
                    glyph: Owl.util.Glyphs.getGlyph('save'),
                    listeners: {
                        click: 'onEdit'
                    }
                },
                {
                    xtype: 'button',
                    text: $.t('app.cancel'),
                    reference: 'buttonCancel',
                    glyph: Owl.util.Glyphs.getGlyph('cancel'),
                    listeners: {
                        click: 'onCancel'
                    }
                }
            ]
        }
    ]
});
