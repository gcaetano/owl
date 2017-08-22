/**
 * Created by Administrator on 19/04/2016.
 */
Ext.define('Owl.utility.Glyphs', {
    singleton: true, //#1
    config: { //#2
        webFont: 'FontAwesome',
        add: 'xf067',
        edit: 'xf040',
        destroy: 'xf1f8',
        save: 'xf00c',
        cancel: 'xf0e2'
    },
    constructor: function(config) { //#3
        this.initConfig(config);
    },
    getGlyph : function(glyph) { //#4
        var me = this,
            font = me.getWebFont(); //#5
        if (typeof me.config[glyph] === 'undefined') {
            return false;
        }
        return me.config[glyph] + '@' + font;
    }
});