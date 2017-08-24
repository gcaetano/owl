
Ext.define('Owl.view.backoffice.Layout',{
    extend: 'Ext.tab.Panel',
    alias: 'widget.backoffice',

    requires: [
        'Owl.view.backoffice.security.Layout',
        'Owl.view.backoffice.make.Make',
        'Owl.util.Glyphs'
    ],

    border: false,

    items: [
        {
            xtype: 'backoffice-security-layout',
            glyph: Owl.util.Glyphs.getGlyph('shield')
        }, {
            xtype: 'backoffice-make',
            glyph: Owl.util.Glyphs.getGlyph('registered')
        }
    ]
});
