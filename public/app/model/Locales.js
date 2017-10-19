Ext.define('Owl.model.Locales', {
    extend: 'Ext.data.Model',

    fields: [
        { type: 'string', name: 'locale' },
        { type: 'string', name: '_id' }
    ],

    proxy: {
        type: 'ajax',
        api: {
            read: '/locale'
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
