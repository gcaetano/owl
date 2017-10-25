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
            itemId: 'addNewGroup',
            reference: 'addNewGroup',
            text: $.t('app.add new group'),
            enable: false,
            glyph: Owl.util.Glyphs.getGlyph('group'),
            listeners : {
                click: 'onAddNewGroup'
            }
        },
        {
            itemId: 'addSubGroup',
            reference: 'addSubGroup',
            text: $.t('app.add sub-group'),
            enable: false,
            glyph: Owl.util.Glyphs.getGlyph('group'),
            listeners : {
                click: 'onAddSubGroup'
            }
        }, {
            itemId: 'addUser',
            reference: 'addUser',
            text: $.t('app.add user'),
            glyph: Owl.util.Glyphs.getGlyph('add_user'),
            listeners : {
                click: 'onAddUser'
            }
        },{
            itemId: 'editUser', 
            reference: 'editUser',            
            text: $.t('app.edit user'),
            glyph: Owl.util.Glyphs.getGlyph('edit'),
            listeners : {
                click: 'onEditUser'
            }
        },{
            itemId: 'delUser',             
            reference: 'delUser',                  
            text: $.t('app.delete user'),
            glyph: Owl.util.Glyphs.getGlyph('del_user'),
            listeners : {
                    click: 'onDelUser'
            }
        }
    ]
});
