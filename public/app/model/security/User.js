Ext.define('Owl.model.security.User', {
    extend: 'Ext.data.Model',

    fields: [
        'id', 'first_name', 'last_name', 'email', 'timezone', 'locale'
    ],

    autoLoad: true,
    proxy: {
        type: 'ajax',
        api: {
            read: '/security/users/list'
        },
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});
