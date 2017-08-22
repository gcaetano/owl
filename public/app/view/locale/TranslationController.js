Ext.define('Owl.view.locale.TranslationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.locale-translation',
    requires: [
        'Owl.view.locale.TranslationController'
    ],

    onMenuItemClick: function(item, e, options){
        var menu = this.getView(); //#1
        menu.setIconCls(item.iconCls); //#2
        menu.setText(item.text); //#3
        localStorage.setItem("user-lang", item.iconCls); //#4
        window.location.reload(); //#5
    },

    init: function() {
        var lang = localStorage ? (localStorage.getItem('user-lang') || 'gb') : 'gb', button = this.getView();
        button.setIconCls(lang); //#1
        if (lang === 'gb') {
            button.setText($.t('app.english'));
        } else if (lang === 'es') {
            button.setText($.t('app.spanish'));
        } else {
            button.setText($.t('app.portuguese'));
        }
    }
});
