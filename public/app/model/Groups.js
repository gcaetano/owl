Ext.define('Owl.model.Groups', {
    extend: 'Ext.data.TreeModel',

    fields: [
        'id', 'alias'
    ],

    autoLoad: true,
    proxy: {
        type: 'ajax',
        api: {
            read: '/security/groups'
        },
        reader: {
            type: 'json',
            rootProperty: 'children'
        }
    }
});