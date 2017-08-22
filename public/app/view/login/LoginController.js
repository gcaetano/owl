Ext.define('Owl.view.login.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.login-controller',

    requires: [
        'Owl.util.Util',
        'Owl.view.login.CapsLockTooltip',
        'Owl.util.Globals',
        'Owl.view.main.Main'
    ],

    onTextFieldSpecialKey: function(field, e, options){
        if (e.getKey() === e.ENTER) {
            this.doLogin();
        }
    },
    
    onTextFieldKeyPress: function(field, e, options){
        var charCode = e.getCharCode(),
            me = this;
        if((e.shiftKey && charCode >= 97 && charCode <= 122) || (!e.shiftKey && charCode >= 65 && charCode <= 90)){
            if(me.capslockTooltip === undefined){ //#3
                me.capslockTooltip = Ext.widget('capslocktooltip'); //#4
            }
            me.capslockTooltip.show(); //#5
        } else {
            if(me.capslockTooltip !== undefined){ //#6
                me.capslockTooltip.hide(); //#7
            }
        }
    },
    
    onButtonClickCancel: function(button, e, options){
        this.lookupReference('form').reset();
    },
    
    onButtonClickSubmit: function(button, e, options){
        var me = this;
        if (me.lookupReference('form').isValid()){ // #1
            me.doLogin();               // #2
        }
    },
    
    doLogin: function() {
        this.getView().mask('Authenticating... Please wait...');
        var me = this, form = me.lookupReference('form');
        form.submit({
            clientValidation: true,     // #3
            url: '/security/login',     // #4
            scope: me,                  // #5
            success: 'onLoginSuccess',  // #6
            failure: 'onLoginFailure'   // #7
        });
    },
    
    onLoginFailure: function(form, action) {
        var result = Ext.JSON.decode(action.response.responseText, true);
        //this.getView().unmask();
        if (!result) {                  //#4
            result = {};
            result.success = false;
        }
    },

    onLoginSuccess: function(form, action) {
        // this.getView().close();             // #1
        this.getView().destroy();
        // this.getView().unmask();          // Just for windows

        var result = Ext.JSON.decode(action.response.responseText, true);
        if (result && result.success && result.data) {
            Ext.create({ xtype: 'app-main' });
            Owl.util.SessionMonitor.start();
            localStorage.setItem("owl-logged-in", true);
            Owl.globals = Ext.create('Owl.util.Globals'); //'Anki.util.Globals' in requires is mandatory
            Owl.globals.setUser(result.data);
        } else {
            switch (action.failureType) {
                case Ext.form.action.Action.CLIENT_INVALID: //#5
                    Owl.util.Util.showErrorMsg('Form fields may not be submitted with invalid values');
                    break;
                case Ext.form.action.Action.CONNECT_FAILURE: //#6
                    Owl.util.Util.showErrorMsg(action.response.responseText);
                    break;
                case Ext.form.action.Action.SERVER_INVALID: //#7
                    Owl.util.Util.showErrorMsg(result.msg);
            }
        }
    }
});
