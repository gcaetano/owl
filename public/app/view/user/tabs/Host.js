Ext.define("Owl.view.user.tabs.Host",{
    extend: 'Ext.tab.Panel',
    alias: 'widget.user-host-tabs',

    items: [
        {
            xtype: 'user-tabs-basic'
        },
        {
            title: 'Bar',
            tabConfig: {
                title: 'Custom Title',
                tooltip: 'A button tooltip'
            }
    }]
});
