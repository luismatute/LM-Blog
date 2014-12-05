// # Ghost Foot Helper
// Usage: `{{ghost_foot}}`
//
// Outputs scripts and other assets at the bottom of a Ghost theme
//
// We use the name ghost_foot to match the helper for consistency:
// jscs:disable requireCamelCaseOrUpperCaseIdentifiers

var hbs             = require('express-hbs'),
    _               = require('lodash'),
    config          = require('../config'),
    filters         = require('../filters'),
    utils           = require('./utils'),
    ghost_foot;

ghost_foot = function (options) {
    /*jshint unused:false*/
    var jquery = utils.isProduction ? 'jquery.min.js' : 'jquery.js',
        require_tpl = _.template('<script src="<%= source %>?v=<%= version %>" data-main="<%= main %>"></script>'),
        script_tpl  = _.template('<script><%= script %></script>'),
        env         = (process.env.NODE_ENV == 'development')? 'dev': 'min'
        foot = [];

    // foot.push(utils.scriptTemplate({
    //     source: config.paths.subdir + '/public/' + jquery,
    //     version: config.assetHash
    // }));
    foot.push(require_tpl({
        source: '//cdnjs.cloudflare.com/ajax/libs/require.js/2.1.11/require.min.js',
        version: config.assetHash,
        main: '/assets/js/'+env+'/app'
    }));
    foot.push(script_tpl({
        script: 'window.app = {env:"'+ env +'",bust:"'+ config.assetHash +'",assets_url:"/assets/js/'+env+'/"}'
    }));

    return filters.doFilter('ghost_foot', foot).then(function (foot) {
        var footString = _.reduce(foot, function (memo, item) { return memo + '\n' + item; }, '\n');
        return new hbs.handlebars.SafeString(footString.trim());
    });
};

module.exports = ghost_foot;
