
Ext.define('Owl.view.backoffice.security.west.groups.menu.ContextMenuGroups',{
    extend: 'Ext.menu.Menu',
    alias: 'widget.permission-security-context-menu-groups',
    requires: [
        'Owl.view.backoffice.security.west.groups.menu.ContextMenuGroupsController',
        'Owl.view.backoffice.security.west.groups.menu.ContextMenuGroupsModel',
        'Owl.util.Glyphs'
    ],

    controller: 'backoffice-security-west-groups-menu-contextmenugroups',
    viewModel: {
        type: 'backoffice-security-west-groups-menu-contextmenugroups'
    },

    items: [
        {
            text: $.t('app.add sub-group'),
            glyph: Owl.util.Glyphs.getGlyph('group'),
            listeners : {
                click: 'onAddSubGroup'
            }
        },{
            text: $.t('app.add user'),
            glyph: Owl.util.Glyphs.getGlyph('add_user'),
            listeners : {
                click: 'onAddUser'
            }
        },{
            text: $.t('app.edit user'),
            glyph: Owl.util.Glyphs.getGlyph('edit'),
            listeners : {
                click: 'onEditUser'
            }
        },{
            text: $.t('app.delete user'),
            glyph: Owl.util.Glyphs.getGlyph('del_user'),
            listeners : {
                    click: 'onDelUser'
            }
        }
    ]
});
