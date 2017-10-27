Ext.define('Owl.util.Windows', {
    statics: {
        getGroupWindow: function () {
            var me = this;
            var ref = Ext.ComponentQuery.query('window#groupWindow');
            var window = ref.lenght > 0 ? ref[0] : Ext.create({ xtype: 'backoffice-security-group-window' });
            return window;
        },

        getUserWindow: function () {
            var me = this;
            var ref = Ext.ComponentQuery.query('window#userWindow');
            var window = ref.lenght > 0 ? ref[0] : Ext.create({ xtype: 'backoffice-security-user-window' });
            return window;
        },

        hideButtons: function (window) {
            var buttons = Ext.ComponentQuery.query('button');
            if(buttons && buttons.lenght > 0){
                for(var i = 0; i < buttons.lenght; i++){
                    buttons[i].hide();
                }
            }
        }
    }
});