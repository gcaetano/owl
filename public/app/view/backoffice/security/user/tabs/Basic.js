
Ext.define('Owl.view.backoffice.security.user.tabs.Basic', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.backoffice-security-user-tabs-basic',
    requires: [
        'Owl.view.backoffice.security.user.tabs.BasicController',
        'Owl.view.backoffice.security.user.tabs.BasicModel',
        'Owl.model.Profiles',
        'Owl.model.Cultures'
    ],

    controller: 'backoffice-security-user-tabs-basic',
    viewModel: {
        type: 'backoffice-security-user-tabs-basic'
    },
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
                xtype: 'textfield',
                labelWidth: 150,
                allowBlank: false
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    name: '_id', //#8
                    fieldLabel: 'Label',
                    bind: '{currentUser._id}' //#9
                },
                {
                    fieldLabel: $.t('app.username'),
                    name: 'userName',
                    bind: '{currentUser.userName}'
                },
                {
                    fieldLabel: $.t('app.first name'),
                    name: 'firstName',
                    bind: '{currentUser.firstName}'
                },
                {
                    fieldLabel: $.t('app.last name'),
                    name: 'lastName',
                    bind: '{currentUser.lastName}'
                },
                {
                    fieldLabel: $.t('app.email'),
                    name: 'email',
                    bind: '{currentUser.email}',
                    vtype: 'email'
                },
                {
                    fieldLabel: $.t('app.timezone'),
                    name: 'timezone',
                    bind: '{currentUser.timezone}'
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
                    name: 'cultures',
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
