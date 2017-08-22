/**
 * Created by Administrator on 19/04/2016.
 */
Ext.define('Owl.util.Glyphs', {
    singleton: true, //#1
    config: { //#2
        webFont: 'FontAwesome',
        add: 'xf067',
        edit: 'xf040',
        destroy: 'xf1f8',
        save: 'xf00c',
        group: 'xf0c0',
        cancel: 'xf0e2',
        card: 'xf2bb',
        user: 'xf007'
    },
    constructor: function(config) {
        this.initConfig(config);
    },
    getGlyph : function(glyph) {
        var me = this,
            font = me.getWebFont();
        if (typeof me.config[glyph] === 'undefined') {
            return false;
        }
        return me.config[glyph] + '@' + font;
    }
});