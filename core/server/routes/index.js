var api         = require('./api'),
    admin       = require('./admin'),
    frontend    = require('./frontend'),
    custom		= require('./custom');

module.exports = {
	custom: custom,
    api: api,
    admin: admin,
    frontend: frontend
};