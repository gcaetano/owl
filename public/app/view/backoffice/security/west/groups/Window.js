
Ext.define('Owl.view.backoffice.security.west.groups.Window',{
    
    extend: 'Ext.window.Window',
    itemId : 'groupWindow',
    alias: 'widget.backoffice-security-group-window',

    requires: [
        'Owl.view.backoffice.security.west.groups.WindowController',
        'Owl.view.backoffice.security.west.groups.WindowModel',
        'Owl.util.Glyphs'        
    ],

    controller: 'backoffice-security-west-groups-window',
    
    viewModel: {
        type: 'backoffice-security-west-groups-window'
    },
    
    layout: {
        type: 'fit'
    },

    title : $.t('app.group'),
    height: 180, 
    width: 350,
    modal : true,
    glyph: Owl.util.Glyphs.getGlyph('group'),


    items: [
        {
            bodyPadding: 15, //#15
            reference: 'form', // for this "me.lookupReference('form')"
            xtype: 'form',
            items: [{
                xtype: 'textfield',
                name: 'alias',
                anchor: '100%',
                fieldLabel: $.t('app.group'),
                allowBlank: false
            }]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            items: [
                {
                    xtype: 'tbfill' //#25
                },
                {
                    xtype: 'button',
                    text: $.t('app.cancel'),
                    reference: 'buttonCancel',
                    glyph: Owl.util.Glyphs.getGlyph('cancel'),
                    listeners: {
                        click: 'onCancel'
                    }
                },
                {
                    xtype: 'button',
                    text: $.t('app.save'),
                    reference: 'buttonSave',
                    glyph: Owl.util.Glyphs.getGlyph('save'),
                    listeners: {
                        click: 'onSave'
                    }
                }
            ]
        }
    ]
});
