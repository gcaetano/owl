
Ext.define('Owl.view.backoffice.security.west.groups.Panel',{
    extend: 'Ext.panel.Panel',
    alias: 'widget.permission-security-group-panel',

    requires: [
        'Owl.view.backoffice.security.west.groups.PanelController',
        'Owl.view.backoffice.security.west.groups.PanelModel'
    ],

    controller: 'backoffice-security-west-groups-panel',
    viewModel: {
        type: 'backoffice-security-west-groups-panel'
    },
    title: $.t('app.groups'),

    layout: {
        type: 'fit'
    },

    items: [
        {
            xtype: 'permission-security-tree-groups'
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            items: [
                '->',
                {
                    xtype: 'button',
                    itemId: 'addGroup',
                    reference: 'addGroup',
                    glyph: 'xf0fe@FontAwesome',
                    listeners: {
                        click: 'onAddGroupClick'
                    }
                }
            ]
        }
    ]

});
