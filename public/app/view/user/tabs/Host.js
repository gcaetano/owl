Ext.define("Owl.view.user.tabs.Host",{
    extend: 'Ext.tab.Panel',
    alias: 'widget.user-host-tabs',
    itemId: 'userHostTabs',
    items: [
        {
            xtype: 'user-tabs-basic'
        }
    ]
});
