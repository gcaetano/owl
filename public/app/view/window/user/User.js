
Ext.define('Owl.view.window.user.User', {
    extend: 'Ext.window.Window',

    requires: [
        'Owl.view.window.user.UserController',
        'Owl.view.window.user.UserModel'
    ],

    controller: 'window-user-user',
    viewModel: {
        type: 'window-user-user'
    },

    html: 'Hello, World!!'
});
