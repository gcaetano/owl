Ext.define('Owl.model.Timezones', {
    extend: 'Ext.data.Model',

    fields: [
        { type: 'string', name: 'alias' },
        { type: 'string', name: '_id' }
    ],

    proxy: {
        type: 'ajax',
        api: {
            read: '/timezones/?limit=150'
        },
        reader: {
            type: 'json',
            rootProperty: 'data'
        },
        writer: {
            type: 'json',
            rootProperty: 'data',
            allowSingle: false
        }
    }
});
