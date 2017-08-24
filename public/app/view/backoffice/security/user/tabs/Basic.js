
Ext.define('Owl.view.backoffice.security.user.tabs.Basic', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.backoffice-security-user-tabs-basic',
    requires: [
        'Owl.view.backoffice.security.user.tabs.BasicController',
        'Owl.view.backoffice.security.user.tabs.BasicModel'
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
                    name: 'id', //#8
                    fieldLabel: 'Label',
                    bind: '{currentUser.id}' //#9
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
                    fieldLabel: $.t('app.locale'),
                    name: 'locale',
                    bind: '{currentUser.locale}'
                },
                {
                    inputType: 'password',
                    fieldLabel: $.t('app.password'),
                    name: 'password',
                    itemId: 'password',
                    allowBlank: false,
                    disabled: true,
                    listeners: {
                        validitychange: function(field){
                            field.next().validate();
                        },
                        blur: function(field){
                            field.next().validate();
                        }
                    }
                },
                {
                    name: 'password-confirm',
                    vtype: 'password',
                    disabled: true,
                    initialPassField: 'password', // id of the initial password field
                    fieldLabel: $.t('app.password confirm'),
                    visible: false
                }
            ]
        }
    ]
});