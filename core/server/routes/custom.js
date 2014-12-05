/**
 * Custom Routes for Ghost Frontend
 */

var custom 	= require('../controllers/custom'),
	express = require('express');

module.exports = function () {
	var router = express.Router();
	// ### Custom routes
    router.post('/github/', custom.github);
    router.get('/about/', custom.about);
    router.post('/about/contact/', custom.doContact);

   	return router;
};