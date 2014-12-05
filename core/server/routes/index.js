var api         = require('./api'),
    admin       = require('./admin'),
    frontend    = require('./frontend'),
    custom    	= require('./custom');

module.exports = {
    apiBaseUri: '/ghost/api/v0.1/',
    api: api,
    admin: admin,
    frontend: frontend,
    custom: custom
};
