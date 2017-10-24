
Ext.define('Owl.view.backoffice.security.user.tabs.Basic', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.backoffice-security-user-tabs-basic',
    requires: [
        'Owl.view.backoffice.security.user.tabs.BasicController',
        'Owl.view.backoffice.security.user.tabs.BasicModel',
        'Owl.model.Profiles',
        'Owl.model.Cultures',
        'Owl.model.Timezones',
        'Owl.model.Groups'
    ],

    controller: 'backoffice-security-user-tabs-basic',
    viewModel: {
        type: 'backoffice-security-user-tabs-basic'
    },
    itemId: 'userBasicPanel',
    reference: 'userBasicPanel', // me.lookupReference('userBasicPanel')
    title: $.t('app.basic info'),
    border: false,
    items: [
        {
            xtype: 'form',
            reference: 'form',
            bodyPadding: 15,
            modelValidation: true, //#2
            layout: {
                align: 'stretch'
            },

            defaults: {
                //afterLabelTextTpl: Owl.util.Util.required,
                anchor: '100%',
                labelAlign: 'right', 
                xtype: 'textfield',
                labelWidth: 120,
                allowBlank: false
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    name: '_id', //#8
                    fieldLabel: 'Label'
                },
                {
                    fieldLabel: $.t('app.username'),
                    name: 'username'
                },
                {
                    fieldLabel: $.t('app.first name'),
                    name: 'first_name'
                },
                {
                    fieldLabel: $.t('app.last name'),
                    name: 'last_name'
                },
                {
                    fieldLabel: $.t('app.email'),
                    name: 'email',
                    vtype: 'email'
                },
                {
                    xtype: 'combo',
                    name: 'timezone',
                    fieldLabel: $.t('app.timezone'),
                    queryMode: 'local',
                    forceSelection: true,
                    editable: false,
                    width: 250,                   
                    bind: {
                        store: '{Timezones}'
                    },
                    valueField: '_id',
                    displayField: 'alias'
                },
                {
                    xtype: 'combo',
                    name: 'group',
                    itemId: 'group', // Ext.ComponentQuery.query('combo#group');
                    reference: 'group',
                    fieldLabel: $.t('app.group'),
                    queryMode: 'local',
                    forceSelection: true,
                    editable: false,
                    bind: {
                        store: '{Groups}'
                    },
                    valueField: '_id',
                    displayField: 'alias'
                },
                {
                    xtype: 'combo',
                    name: 'profile',
                    fieldLabel: $.t('app.profile'),
                    queryMode: 'local',
                    forceSelection: true,
                    editable: false,
                    bind: {
                        store: '{Profiles}'
                    },
                    valueField: '_id',
                    displayField: 'alias'
                },
                {
                    xtype: 'combo',
                    name: 'culture',
                    fieldLabel: $.t('app.culture'),
                    queryMode: 'local',
                    forceSelection: true,
                    editable: false,
                    bind: {
                        store: '{Cultures}'
                    },
                    valueField: '_id',
                    displayField: 'alias'
                }
            ]
        }
    ]
});
