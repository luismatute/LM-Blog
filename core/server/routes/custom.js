/**
 * Custom Routes for Ghost Frontend
 */

var custom 	= require('../controllers/custom');

module.exports = function (server) {
	// ### Custom routes
    server.post('/github/', custom.github);
    server.get('/about/', custom.about);
    server.post('/about/contact/', custom.doContact);
};