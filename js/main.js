(function ($) {
	"use strict";
	var nav = $('nav');
  var navHeight = nav.outerHeight();
  
  $('.navbar-toggler').on('click', function() {
    if( ! $('#mainNav').hasClass('navbar-reduce')) {
      $('#mainNav').addClass('navbar-reduce');
    }
  })

  // Preloader
  $(window).on('load', function () {
    if ($('#preloader').length) {
      $('#preloader').delay(100).fadeOut('slow', function () {
        $(this).remove();
      });
    }
  });

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });
  $('.back-to-top').click(function(){
    $('html, body').animate({scrollTop : 0},1500, 'easeInOutExpo');
    return false;
  });

	/*--/ Star ScrollTop /--*/
	$('.scrolltop-mf').on("click", function () {
		$('html, body').animate({
			scrollTop: 0
		}, 1000);
	});

	/*--/ Star Counter /--*/
	$('.counter').counterUp({
		delay: 15,
		time: 2000
	});

	/*--/ Star Scrolling nav /--*/
	$('a.js-scroll[href*="#"]:not([href="#"])').on("click", function () {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html, body').animate({
					scrollTop: (target.offset().top - navHeight + 5)
				}, 1000, "easeInOutExpo");
				return false;
			}
		}
	});

	// Closes responsive menu when a scroll trigger link is clicked
	$('.js-scroll').on("click", function () {
		$('.navbar-collapse').collapse('hide');
	});

	// Activate scrollspy to add active class to navbar items on scroll
	$('body').scrollspy({
		target: '#mainNav',
		offset: navHeight
	});
	/*--/ End Scrolling nav /--*/

	/*--/ Navbar Menu Reduce /--*/
	$(window).trigger('scroll');
	$(window).on('scroll', function () {
		var pixels = 50; 
		var top = 1200;
		if ($(window).scrollTop() > pixels) {
			$('.navbar-expand-md').addClass('navbar-reduce');
			$('.navbar-expand-md').removeClass('navbar-trans');
		} else {
			$('.navbar-expand-md').addClass('navbar-trans');
			$('.navbar-expand-md').removeClass('navbar-reduce');
		}
		if ($(window).scrollTop() > top) {
			$('.scrolltop-mf').fadeIn(1000, "easeInOutExpo");
		} else {
			$('.scrolltop-mf').fadeOut(1000, "easeInOutExpo");
		}
	});

	$(document).ready(function() {
		// Animación del slider en la sección "Historia"
		if ($('.text-slider').length == 1) {
		  var typed_strings_historia = $('.text-slider-items').text();
		  var typed_historia = new Typed('.text-slider', {
			strings: typed_strings_historia.split(','),
			typeSpeed: 80,
			loop: true,
			backDelay: 1100,
			backSpeed: 30
		  });
		}
	  
		// Animación del slider en la sección "Contact me by"
		if ($('.text-slider-contacto').length == 1) {
			var typed_contact_strings = ['Gmail', 'WhatsApp', 'Instagram', 'Facebook','TikTok']; // Añadir cadenas directamente aquí
			var typed_contact = new Typed('.text-slider-contacto', {
				strings: typed_contact_strings,
				typeSpeed: 80,
				loop: true,
				backDelay: 1100,
				backSpeed: 30,
				preStringTyped: function(pos, self) {
				  // Remover clases previas
				  $('.text-slider-contacto').removeClass('gmail-color whatsapp-color instagram-color facebook-color tiktok-color');
				  
				  // Aplicar la clase correcta según la posición (índice) del texto
				  if (typed_contact_strings[pos] === 'Gmail') {
					$('.text-slider-contacto').addClass('gmail-color');
				  } else if (typed_contact_strings[pos] === 'WhatsApp') {
					$('.text-slider-contacto').addClass('whatsapp-color');
				  } else if (typed_contact_strings[pos] === 'Instagram') {
					$('.text-slider-contacto').addClass('instagram-color');
				  } else if (typed_contact_strings[pos] === 'Facebook') {
					$('.text-slider-contacto').addClass('facebook-color');
				  } else if (typed_contact_strings[pos] === 'TikTok') { 
					$('.text-slider-contacto').addClass('tiktok-color');
				} 
				}
			  });
			}
		  });
	  


	/*--/ Testimonials owl /--*/
	$(document).ready(function() {
		$("#testimonial-mf").owlCarousel({
			loop: true,
			margin: 10,
			nav: false,
			dots: true,
			autoplay: true, // Activar la reproducción automática
			autoplayTimeout: 8000, // Cambiar cada 8 segundos
			autoplayHoverPause: true, // Pausar cuando el mouse está sobre el carrusel
			responsive: {
				0: {
					items: 1 // Muestra 1 testimonio en pantallas pequeñas
				},
				600: {
					items: 1 // Muestra 1 testimonio en pantallas medianas
				},
				1000: {
					items: 1 // Muestra 1 testimonio en pantallas grandes
				}
			}
		});
		 // Cambiar de testimonio al hacer clic en un punto
		 $('.owl-dot').on('click', function() {
			var index = $(this).index();
			$('#testimonial-mf').trigger('to.owl.carousel', [index, 300]);
		});
	})
	
  $(document).ready(function(){
	var maquinariaSlider = $('.maquinaria-slider').owlCarousel({
      loop: true,
      margin: 10,
      nav: true,
      dots: false,
      items: 3, //// Mostrar 3 items a la vez
      navText: ["<i class='fa fa-chevron-left'></i>","<i class='fa fa-chevron-right'></i>"] // Flechas personalizadas
    });
	 // Vincular las flechas personalizadas
	 $('.owl-prev').click(function() {
		maquinariaSlider.trigger('prev.owl.carousel');
	  });
	  
	  $('.owl-next').click(function() {
		maquinariaSlider.trigger('next.owl.carousel');
	  });
  });


})(jQuery);
