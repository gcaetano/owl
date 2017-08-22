
Ext.define('Owl.view.backoffice.security.west.Layout', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.backoffice-security-west-layout',

    requires: [
        'Owl.view.backoffice.security.west.groups.Groups',
        'Owl.view.backoffice.security.west.profiles.ProfilesGrid',
        'Owl.util.Glyphs'
    ],

    width: 300,
    split: true,
    region: 'west',

    layout: {
        type: 'border'
    },

    border: false,

    items: [
        {
            glyph: Owl.util.Glyphs.getGlyph('group'),
            xtype: 'permission-security-group-panel'
        },
        {
            glyph: Owl.util.Glyphs.getGlyph('user'),
            xtype: 'permission-security-profiles'
        }
    ]
});
