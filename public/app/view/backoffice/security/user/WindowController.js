Ext.define('Owl.view.backoffice.security.user.WindowController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.backoffice-security-user-window',

    requires: [
        'Owl.util.TreeGroup'
    ],


    onSave: function (button, e, options) {
        Ext.getBody().mask('Please whait!');
        var form = button.up('panel').down('form');
        var me = this;

        if (form && form.isValid()) {
            form.submit({
                clientValidation: true,
                url: '/users',
                scope: me,
                success: 'onSaveSuccess',
                failure: 'onSaveEditFailure'
            });
        }
    },

    onEdit: function (button, e, options) {
        Ext.getBody().mask('Please whait!');
        var form = button.up('panel').down('form');
        var me = this;
        var id = form.getForm().findField('_id').getValue();
        if (form && form.isValid()) {
            form.submit({
                clientValidation: true,
                method: 'PUT',
                url: '/users/' + id,
                scope: me,
                success: 'onEditSuccess',
                failure: 'onSaveEditFailure'
            });
        }
    },

    onSaveSuccess: function (form, action) {
        var me = this;
        Owl.util.Util.showToast('Success! User saved.');
        me.attachUserToGroup(form, action);
        Ext.getBody().unmask();
        me.onCancel(); // that will cloce the form, just.
    },

    onEditSuccess: function (form, action) {
        var me = this;
        // the user with the old valeus;
        var deprecated = me.getTreeSelectedItem(); 

        // the group where the user is.
        var group = deprecated.parentNode; 

        // Remove User from the tree.
        me.detachUserFromGroup();

        // user with current values.
        var node = me.getFormUserAsNode(form, action);

        // appende the node to the group with the new values.
        group.appendChild(node);

        // inform user
        Owl.util.Util.showToast('Success! User edited.');

        //unmask body
        Ext.getBody().unmask();

        // close window
        me.onCancel(); 
    },

    onSaveEditFailure: function (form, action) {
        Owl.util.Util.handleFormFailure(action);
    },

    onCancel: function (button, e, options) {
        var me = this;
        me.getView().destroy();
    },

    attachUserToGroup: function (form, action) {
        var me = this;

        if (form) {
            var group = Owl.util.TreeGroup.getTreeSelectedItem(); // here is the group      
            if(group){      
                var node = me.getFormUserAsNode(form, action);
                group.appendChild(node);
            }
        }
    },

    detachUserFromGroup: function () {
        var me = this;
        var user = me.getTreeSelectedItem();
        var group = user.parentNode;
        group.removeChild(user);
    },

    getFormUserAsNode: function (form, action){
        var me = this;
        var id = action.result.message.id;
        var node = {
            user: true,
            leaf: true,
            text: Ext.String.format("{0} {1}", form.findField("first_name").getValue(), form.findField("last_name").getValue()),
            _id: id || form.findField("_id").getValue(),
            glyph: Owl.util.Glyphs.getGlyph('user'),

            username: form.findField("username").getValue(),
            first_name: form.findField("first_name").getValue(),
            last_name: form.findField("last_name").getValue(),
            email: form.findField("email").getValue(),
            group: form.findField("group").getValue(),
            timezone: form.findField("timezone").getValue(),
            profile: form.findField("profile").getValue(),
            culture: form.findField("culture").getValue()
        };
        return node;
    }
});
