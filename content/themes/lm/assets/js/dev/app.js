/*
// App JS
// Date: April 2013
// Luis Matute - luis.matute@me.com
// -----------------------------------------------------
*/

// Rule of thumb:
// 	Define: If you want to declare a module other parts of your application will depend on.
// 	Require: If you just want to load and use stuff.

"use strict";
require.config({
	baseUrl: app.assets_url,
	urlArgs: 'v='+app.bust,
	paths: {
		// The Libraries we use
		jquery: [
            		'//ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min', // google cdn
            		'libs/jquery.min' // fallback
        ],
        // Libs
        isotope: 	'libs/jquery.isotope.min',
        fitvids: 	'libs/jquery.fitvids',
        prism: 		'libs/prism',
        // Modules
        util: 		'modules/utilities',
        common: 	'modules/common'
	},
	shim: {
		util: 		['jquery'],
		isotope: 	['jquery'],
		fitvids: 	['jquery'],
		common: 	['jquery', 'prism', 'util', 'isotope', 'fitvids'],
		prism: {
	      	"exports": "Prism"
	    }
	}
});

// Defining global module with jQuery dependency and requiring the common js
define(['common'], function() {});