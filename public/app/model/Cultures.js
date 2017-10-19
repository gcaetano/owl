Ext.define('Owl.model.Cultures', {
    extend: 'Ext.data.Model',

    fields: [
        { type: 'string', name: 'locale' },
        { type: 'string', name: '_id' }
    ],

    proxy: {
        type: 'ajax',
        api: {
            read: '/cultures'
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
