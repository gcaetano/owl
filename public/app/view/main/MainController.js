/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Owl.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    requires: [
        'Owl.util.Util'
    ],

    alias: 'controller.main',

    init: function(application) {
        var loggedIn = localStorage.getItem('owl-logged-in');
        if (loggedIn === "false")
            Ext.create(
                {
                    xtype: 'login'
                }
            );
    },

    onLogout: function(button, e, options){
        var me = this;                  //#1
        Ext.Ajax.request({
            url: '/security/logout',     //#2
            scope: me,                  //#3
            success: 'onLogoutSuccess', //#4
            failure: 'onLogoutFailure'  //#5
        });
    },

    onLogoutFailure: function(conn, response, options, eOpts){
        Owl.util.Util.showErrorMsg(conn.responseText);
    },

    onLogoutSuccess: function(conn, response, options, eOpts){ //#1
        localStorage.setItem("owl-logged-in", false);
        var result = Owl.util.Util.decodeJSON(conn.responseText);
        if (result.success) {           //#2
            this.getView().destroy();   //#3
            window.location.reload();   //#4
        } else {
            Owl.util.Util.showErrorMsg(result.msg); //#5
        }
    },

    onMapClick: function(button, e, options){
        button.up("panel").layout.setActiveItem(0);
    },

    onBackOfficeClick : function(button, e, options){
        button.up("panel").layout.setActiveItem(1);
    }

});
