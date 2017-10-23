Ext.define('Owl.model.Groups', {
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

        { type: 'string', name: '_id' }
    ],

    autoLoad: true,
    proxy: {
        type: 'ajax',
        api: {
            read: '/groups'
        },
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});
