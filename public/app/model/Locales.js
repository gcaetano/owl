Ext.define('Owl.model.Locales', {
    extend: 'Ext.data.Model',

    fields: [
        { type: 'string', name: 'alias' },
        { type: 'string', name: '_id' },
        { type: 'int',  name: 'level' }
    ],

    proxy: {
        type: 'ajax',
        api: {
            read: '/security/locale'
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
