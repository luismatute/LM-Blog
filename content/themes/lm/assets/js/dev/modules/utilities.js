/*
// Utilities JS v 0.1
// Date: April 2014
// Developers:
// 	Luis Matute - lmatute@sanservices.hn
// Description:
//	Script here will be available everywhere since we are
//  defining it to be called as AMD
// --------------------------------------------------
*/

"user strict";
// Wrapping everything in a SEAF(Self Executing Anonymous Function)
// to maintain the global namespace clean
;(function(window, undefined){
    // window is passed through as local variable rather than global
    // as this (slightly) quickens the resolution process and can be more efficiently
    // minified (especially when both are regularly referenced in your plugin).

	// Define a local copy of 'util'
	var _util = {
		// Console Log
	    	log: function( message ) {
	    		console.log( message );
	    	},

	    // Console Debug
	    	debug: function( message ) {
	    		console.debug( message );
	    	},

	    // Loads CSS Async
	        loadCSS: function( links ) {
	        	// Check if string or array to act accordingly
	        	if( typeof links === 'string' ) {
	        		add_css(links);
	        	} else {
	        		$.each(links, function(index){
		        		add_css(links[index])
					});
	        	}
	        	// Local function to loadCSS
				function add_css( url ) {
					var link = document.createElement("link");
				    link.type = "text/css";
				    link.rel = "stylesheet";
				    link.href = url;
				    document.getElementsByTagName("head")[0].appendChild(link);
				}
	        },

	    // Legacy consoles fix
	    	legacy: function () {
	    		// Avoid `console` errors in browsers that lack a console. Placeholder fallback
			    var method,
			    	noop = function () {},
			    	methods = [
				        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
				        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
				        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
				        'timeStamp', 'trace', 'warn'
				    ],
			    	length = methods.length,
			    	console = (window.console = window.console || {});

			    while (length--) {
			        method = methods[length];

			        // Only stub undefined methods.
			        if (!console[method]) {
			            console[method] = noop;
			        }
			    }
			    //PlaceHolder support for older browsers
			    ;(function(f,h,$){var a='placeholder' in h.createElement('input'),d='placeholder' in h.createElement('textarea'),i=$.fn,c=$.valHooks,k,j;if(a&&d){j=i.placeholder=function(){return this};j.input=j.textarea=true}else{j=i.placeholder=function(){var l=this;l.filter((a?'textarea':':input')+'[placeholder]').not('.placeholder').bind({'focus.placeholder':b,'blur.placeholder':e}).data('placeholder-enabled',true).trigger('blur.placeholder');return l};j.input=a;j.textarea=d;k={get:function(m){var l=$(m);return l.data('placeholder-enabled')&&l.hasClass('placeholder')?'':m.value},set:function(m,n){var l=$(m);if(!l.data('placeholder-enabled')){return m.value=n}if(n==''){m.value=n;if(m!=h.activeElement){e.call(m)}}else{if(l.hasClass('placeholder')){b.call(m,true,n)||(m.value=n)}else{m.value=n}}return l}};a||(c.input=k);d||(c.textarea=k);$(function(){$(h).delegate('form','submit.placeholder',function(){var l=$('.placeholder',this).each(b);setTimeout(function(){l.each(e)},10)})});$(f).bind('beforeunload.placeholder',function(){$('.placeholder').each(function(){this.value=''})})}function g(m){var l={},n=/^jQuery\d+$/;$.each(m.attributes,function(p,o){if(o.specified&&!n.test(o.name)){l[o.name]=o.value}});return l}function b(m,n){var l=this,o=$(l);if(l.value==o.attr('placeholder')&&o.hasClass('placeholder')){if(o.data('placeholder-password')){o=o.hide().next().show().attr('id',o.removeAttr('id').data('placeholder-id'));if(m===true){return o[0].value=n}o.focus()}else{l.value='';o.removeClass('placeholder');l==h.activeElement&&l.select()}}}function e(){var q,l=this,p=$(l),m=p,o=this.id;if(l.value==''){if(l.type=='password'){if(!p.data('placeholder-textinput')){try{q=p.clone().attr({type:'text'})}catch(n){q=$('<input>').attr($.extend(g(this),{type:'text'}))}q.removeAttr('name').data({'placeholder-password':true,'placeholder-id':o}).bind('focus.placeholder',b);p.data({'placeholder-textinput':q,'placeholder-id':o}).before(q)}p=p.removeAttr('id').hide().prev().attr('id',o).show()}p.addClass('placeholder');p[0].value=p.attr('placeholder')}else{p.removeClass('placeholder')}}}(this,document,jQuery));

			},

		// Google Analytics: change UA-XXXXX-X to be your site's ID.
			gaSetup: function( account_id ) {
		        var _gaq=[['_setAccount',account_id],['_trackPageview']];
		        (function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
		        g.src=('https:'===location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js';
		        s.parentNode.insertBefore(g,s)}(document,'script'));
		    }
	};

	// Exposing Utilities as a global module
		if ( typeof module === "object" && module && typeof module.exports === "object" ) {
			// Expose utilites as module.exports in loaders that implement the Node
			// module pattern (including browserify). Do not create the global, since
			// the user will be storing it themselves locally, and globals are frowned
			// upon in the Node module world.
			module.exports = _util;
		} else {
			// Register as a named AMD module, since '_util' can be concatenated with other
			// files that may use define, but not via a proper concatenation script that
			// understands anonymous AMD modules. A named AMD is safest and most robust
			// way to register.
			if ( typeof define === "function" && define.amd ) {
				define( "_util", [], function () { return _util; } );
			}
		}

	// If there is a window object, that at least has a document property,
	// define 'util' and '_' identifiers
		if ( typeof window === "object" && typeof window.document === "object" ) {
			window._util = _util;
			if( window._ === undefined ) {
				window._ = _util;
			}
		}

})(window);