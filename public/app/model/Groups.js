Ext.define('Owl.model.Groups', {
    extend: 'Ext.data.TreeModel',

    fields: [
        'id', 'alias'
    ],

    autoLoad: true,
    proxy: {
        type: 'ajax',
        api: {
            read: '/groups'
        },
        reader: {
            type: 'json',
            rootProperty: 'children'
        }
    }
});
