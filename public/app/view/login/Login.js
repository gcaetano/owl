
Ext.define('Owl.view.login.Login',{
    extend: "Ext.window.Window",
    alias: 'widget.login',
    requires: [
        'Ext.plugin.Viewport',
        "Owl.view.login.LoginController",
        "Owl.view.login.LoginModel",
        'Owl.view.locale.Translation'
    ],

    autoShow: true, // #4 if true "Ext.create('BackOffice.view.login.Login')" if false, use "Ext.create('Anki.view.login.Login').show()"
    height: 230, // #5
    width: 430,
    layout: {
        type: 'fit' // #7
    },
    modal: true,
    controller: "login-controller",
    iconCls: 'fa fa-key fa-lg', // #8
    title: 'Login', // #9
    closable: false, // #11
    resizable: false, // #13,

    items: [
        {
            bodyPadding: 15, //#15
            reference: 'form', // for this "me.lookupReference('form')"
            xtype: 'form',
            items: [{
                xtype: 'textfield',
                name: 'user',
                anchor: '100%',
                fieldLabel: $.t('app.user'),
                allowBlank: false,
                listeners: {
                    specialKey: 'onTextFieldSpecialKey'
                }
            }, {
                xtype: 'textfield',
                name: 'password',
                anchor: '100%',
                inputType: 'password',
                fieldLabel: $.t('app.password'),
                allowBlank: false,
                enableKeyEvents: true,
                listeners: {
                    specialKey: 'onTextFieldSpecialKey',
                    keypress: 'onTextFieldKeyPress'
                }
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
                    xtype: 'button', //#26
                    iconCls: 'fa fa-times fa-lg',
                    text: 'Cancel',
                    listeners: {
                        click: 'onButtonClickCancel'
                    }
                },
                {
                    xtype: 'button', //#27
                    formBind: true, //#28
                    iconCls: 'fa fa-sign-in fa-lg',
                    text: 'Submit',
                    listeners: {
                        click: 'onButtonClickSubmit'
                    }
                }
            ]
        }
    ]
});
