Ext.define('Owl.store.Groups', {
    extend: 'Ext.data.Store',

    alias: 'store.groups',

    storeId : 'groupsStore',

    fields: [
        'id', 'alias'
    ],
    autoLoad: false,

    proxy: {
        type: 'ajax',
        api: {
            read: '/groups'
        },
        reader: {
            type: 'json',
            rootProperty: 'children'
        }
    },
    listeners: {
        exception: function(proxy, response, operation){ //#6
            Owl.utility.Util.showErrorMsg(response.responseText);
        }
    }
});
