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
        }
    }
});