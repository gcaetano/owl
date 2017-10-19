/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
Ext.define('Owl.Application', {
    extend: 'Ext.app.Application',
    
    name: 'Owl',

    require: [
        'Owl.view.fleet.Fleet',
        'Owl.view.login.Login'
    ],

    stores: [
        // TODO: add global / shared stores here
    ],

    launch: function () {
        var me = this;
        var task = new Ext.util.DelayedTask(function () {
            //Fade out the body mask
            me.splashscreen.fadeOut({
                duration: 1000,
                remove: true
            });
            //Fade out the icon and message
            me.splashscreen.next().fadeOut({
                duration: 1000,
                remove: true,
                listeners: {
                    afteranimate: function (el, startTime, eOpts) {
                        var loggedIn = localStorage.getItem('owl-logged-in');
                        if (loggedIn === "false")
                            // Ext.create(
                            //     {
                            //         xtype: 'login'
                            //     }
                            // );
                            window.location.href = "http://localhost:3000/login.html";
                        else
                            Ext.create(
                                {
                                    xtype: 'app-main'
                                }
                            );
                    }
                }
            });
        });

        task.delay(1000);
        Ext.tip.QuickTipManager.init();
    },

    init: function () {

        var me = this; // #1
        me.splashscreen = Ext.getBody().mask('Loading application', 'splashscreen');
        me.splashscreen.addCls('splashscreen');
        Ext.DomHelper.insertFirst(Ext.query('.x-mask-msg')[0], {cls: 'x-splash-icon'});

        // var loggedIn = localStorage.getItem('owl-logged-in');
        // if (loggedIn) {
        //     Ext.create('Owl.view.login.Login');
        // }else {
        //     Ext.create('Owl.view.main.Main');
        // }
    },

    onAppUpdate: function () {
        Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
