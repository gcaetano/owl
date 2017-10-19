Ext.define('Owl.model.Profiles', {
    extend: 'Ext.data.Model',

    fields: [
        { 
            type: 'string', 
            name: 'alias',            
            convert : function(value, record) {
                //Your logic to convert the old name(value) into new name.
                return $.t('app.'+ value);
            }    
        },

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
