/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Owl.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    requires: [
        'Owl.util.Util',
        'Owl.util.Globals'
    ],

    alias: 'controller.main',

    init: function(application) {
        var me = this;
        var loggedIn = localStorage.getItem('owl-logged-in');
        if (loggedIn === "true"){
            Ext.Ajax.request({
                url: '/security/touch/',
                scope: me,                  
                success: 'onTouchSuccess', 
                failure: 'onTouchFailure'  
            });
            Owl.util.SessionMonitor.start();
        } else {
            window.location.href = "http://localhost:3000/login.html";
        }        
    },

    onLogout: function(button, e, options){
        var me = this;                  
        Ext.Ajax.request({
            url: '/security/logout',    
            scope: me,                  
            success: 'onLogoutSuccess', 
            failure: 'onLogoutFailure'  
        });
    },

    onTouchSuccess: function(conn, response, options, eOpts){
        console.log("Session Touch Success");
        localStorage.setItem("owl-logged-in", true);
        var data = Owl.util.Util.decodeJSON(conn.responseText); 
        Owl.globals = Ext.create('Owl.util.Globals');
        Owl.globals.setUser(data.user);
        var user = this.lookupReference('user')
        user.setText(data.user.first_name);
    },

    onTouchFailure: function(conn, response, options, eOpts){
        console.log("Session Touch Failure");
        //Owl.util.Util.showErrorMsg(conn.responseText);
    },

    onLogoutFailure: function(conn, response, options, eOpts){
        Owl.util.Util.showErrorMsg(conn.responseText);
    },

    onLogoutSuccess: function(conn, response, options, eOpts){ 
        localStorage.setItem("owl-logged-in", false);
        var result = Owl.util.Util.decodeJSON(conn.responseText);
        if (result.success) {           
            this.getView().destroy();   
            // window.location.reload();   
            window.location.href = "http://localhost:3000/login.html";
        } else {
            Owl.util.Util.showErrorMsg(result.msg); 
        }
    },

    onMapClick: function(button, e, options){
        button.up("panel").layout.setActiveItem(0);
    },

    onBackOfficeClick : function(button, e, options){
        button.up("panel").layout.setActiveItem(1);
    }

});
