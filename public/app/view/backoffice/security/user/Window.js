
Ext.define('Owl.view.backoffice.security.user.Window',{
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
    height: 340,
    width: 450,
    autoShow: true,
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
