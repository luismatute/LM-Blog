/*
// Common JS
// Date: December 2013
// Luis Matute - luis.matute@me.com
// Description:
//	Code here is available site wide
// 	Note: jQuery is available, so we dont need to
//	declare it as a dependency
// --------------------------------------------------
*/

// This is the definition of the module
	define('common', function(){
		$(function () {
			_.legacy();
	        _.gaSetup('UA-40189119-1');
	        bind_events();
	        tabs();
			formValidator();
			isotope();
			console.log("[Ghost-"+app.env.toUpperCase()+"]: Initiated");
		});
	});

// General event binding
	function bind_events() {
		Prism.highlightAll()
	}

// Tabs Functionallity
	function tabs() {
		$('.tab').on('click', function(event){
			event.preventDefault();
			var $section = $(this).closest('.section');
			$section.children('header').toggleClass('active'); // Tabs animation
			$section.children('.section-body').finish().slideToggle();

			// Loading gmaps only when the user clicks the contact tab
			if( $section.attr('id') == "contact" && $('.googlemaps').children().length == 0 ) {
				googlemap_init($("#gmap .googlemaps").get(0), "Altia Business Park, San Pedro Sula, Cortés, Honduras");
			}
		});
	}

// Generic Form Validation
	function formValidator() {
		$('form#contact-form').find('button').on('click', function () {
			var $this 		= $(this),
				$form 		= $this.closest('form'),
				error 		= 0,
				emailRegExp = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))){2,6}$/i;

			// Removing .error since they will be evaluated again
			$form.find('.error').removeClass('error');

			// Check if required fields are empty
			$.each($form.find('.required'),function(index,element){
				if( $(element).val() === "" ) {
					$(element).addClass('error');
					error = 1;
				}
			});

			if( $form.find('input[type="email"]').length > 0 && !emailRegExp.test( $form.find('input[type="email"]').val() ) ) {
				error = 1;
				$form.find('input[type="email"]').addClass('error');
			}
			if( error === 0 ) {
				$.ajax({
					url: '/about/contact/',
					type: 'post',
					data: $('#contact-form').serialize(),
					dataType: 'json',
					success: function (response) {
						// TODO: Sent successfully message
						$('#contact-name').val('');
						$('#contact-email').val('');
						$('#contact-message').val('');
					    console.log(response);
					},
					error: function(jqXHR, textStatus, errorThrown) {
						console.log(jqXHR);
						console.log(textStatus);
						console.log(errorThrown);
					}
				});
			}

			return false;
		});
	}

// Init Google map
	var googlemap_init_obj = {
		map: null,
		dom: null,
		opt: null,
		address: null,
		point: null,
		description: null
	}
	function googlemap_init(dom_obj, address, description, point) {
		googlemap_init_obj.dom = dom_obj;
		googlemap_init_obj.point = point;
		googlemap_init_obj.description = description;
		googlemap_init_obj.opt = {
			zoom: 14,
			center: new google.maps.LatLng(0, 0),
			scrollwheel: true,
			scaleControl: false,
			disableDefaultUI: false,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		var custom_map = new google.maps.Geocoder();
		custom_map.geocode( { "address": address}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				googlemap_init_obj.address = results[0].geometry.location;
				googlemap_create();
			} else
				alert("Geocode was not successful for the following reason: " + status);
		});

		jQuery(window).resize(function() {
			if (googlemap_init_obj.map) googlemap_init_obj.map.setCenter(googlemap_init_obj.address_position);
		});
	}

	function googlemap_create() {
		if (!googlemap_init_obj.address) return false;
		googlemap_init_obj.map = new google.maps.Map(googlemap_init_obj.dom, googlemap_init_obj.opt);
		googlemap_init_obj.map.setCenter(googlemap_init_obj.address);
		var marker = new google.maps.Marker({
			map: googlemap_init_obj.map,
			icon: googlemap_init_obj.point,
			position: googlemap_init_obj.map.getCenter()
		});
		var infowindow = new google.maps.InfoWindow({
			content: googlemap_init_obj.description
		});
		google.maps.event.addListener(marker, "click", function() {
			infowindow.open(googlemap_init_obj.map, marker);
		});
	}

	function googlemap_refresh() {
		googlemap_create();
	}

// Isotope plugin setup
	function isotope() {
		var $container = $('#my-projects');
		$container.isotope({
		  	animationEngine: 'css',
		  	masonryHorizontal: {
		    rowHeight: 174
		  }
		});

		// filter items when filter link is clicked
		$('#portfolio-nav a').on('click',function(){
			var selector = $(this).attr('data-filter');
			$container.isotope({ filter: selector });
			return false;
		});

		$container.isotope({ filter: '*' });
	}