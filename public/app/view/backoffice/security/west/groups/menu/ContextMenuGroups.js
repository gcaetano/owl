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
            itemId: 'addGroup',
            reference: 'addGroup',
            text: $.t('app.new group'),
            glyph: Owl.util.Glyphs.getGlyph('group'),
            listeners : {
                click: 'onAddGroup'
            }
        },
        {
            itemId: 'addSubGroup',
            reference: 'addSubGroup',
            text: $.t('app.new sub-group'),
            glyph: Owl.util.Glyphs.getGlyph('group'),
            listeners : {
                click: 'onAddSubGroup'
            }
        },
        {
            itemId: 'editGroup',
            reference: 'editGroup',
            text: $.t('app.edit group'),
            glyph: Owl.util.Glyphs.getGlyph('edit'),
            listeners : {
                click: 'onEditGroup'
            }
        },
        {
            itemId: 'delGroup',
            reference: 'delGroup',
            text: $.t('app.delete group'),
            glyph: Owl.util.Glyphs.getGlyph('remove'),
            listeners : {
                click: 'onDeleteGroup'
            }
        }, {
            xtype: 'tbseparator'
        }, {
            itemId: 'addUser',
            reference: 'addUser',
            text: $.t('app.add user'),
            glyph: Owl.util.Glyphs.getGlyph('add_user'),
            listeners : {
                click: 'onAddUser'
            }
        }, {
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
