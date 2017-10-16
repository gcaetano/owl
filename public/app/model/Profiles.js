Ext.define('Owl.model.Profiles', {
    extend: 'Ext.data.Model',

    fields: [
        { type: 'string', name: 'alias' },
        { type: 'string', name: '_id' },
        { type: 'int',  name: 'level' }
    ],

    proxy: {
        type: 'ajax',
        api: {
            read: '/profiles'
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
