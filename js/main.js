/**
 * Portfolio Eduardo Rus - Main JavaScript
 * @description Funcionalidad principal del portfolio
 * @author Eduardo Rus
 * @version 2.0.0
 */

(function ($) {
  'use strict';

  // ==================== CONFIGURACIÓN ====================
  const CONFIG = {
    animations: {
      typedSpeed: 80,
      typedBackDelay: 1100,
      typedBackSpeed: 30,
      scrollSpeed: 1000,
      fadeSpeed: 'slow'
    },
    carousel: {
      autoplayTimeout: 8000,
      transitionSpeed: 300
    },
    counter: {
      delay: 15,
      time: 2000
    },
    scroll: {
      backToTopThreshold: 100,
      navbarReduceThreshold: 50,
      scrollTopThreshold: 1200
    }
  };

  // Elementos del DOM cacheados
  const $nav = $('nav');
  const navHeight = $nav.outerHeight();

  console.log('🚀 Iniciando portfolio Eduardo Rus...');

  // ==================== NAVBAR ====================
  
  /**
   * Maneja el toggle del navbar en dispositivos móviles
   */
  function initNavbarToggle() {
    $('.navbar-toggler').on('click', function() {
      if (!$('#mainNav').hasClass('navbar-reduce')) {
        $('#mainNav').addClass('navbar-reduce');
      }
    });
  }

  /**
   * Maneja el comportamiento del navbar al hacer scroll
   */
  function initNavbarScroll() {
    $(window).on('scroll', function () {
      const scrollTop = $(window).scrollTop();
      const $navbar = $('.navbar-expand-md');
      
      // Cambiar apariencia del navbar
      if (scrollTop > CONFIG.scroll.navbarReduceThreshold) {
        $navbar.addClass('navbar-reduce').removeClass('navbar-trans');
      } else {
        $navbar.addClass('navbar-trans').removeClass('navbar-reduce');
      }
      
      // Mostrar/ocultar botón scroll-to-top
      if (scrollTop > CONFIG.scroll.scrollTopThreshold) {
        $('.scrolltop-mf').fadeIn(CONFIG.animations.scrollSpeed, 'easeInOutExpo');
      } else {
        $('.scrolltop-mf').fadeOut(CONFIG.animations.scrollSpeed, 'easeInOutExpo');
      }
    });
    
    // Trigger inicial
    $(window).trigger('scroll');
  }

  /**
   * Configura el scroll suave entre secciones
   */
  function initSmoothScroll() {
    $('a.js-scroll[href*="#"]:not([href="#"])').on('click', function () {
      if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && 
          location.hostname === this.hostname) {
        
        let target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        
        if (target.length) {
          $('html, body').animate({
            scrollTop: (target.offset().top - navHeight + 5)
          }, CONFIG.animations.scrollSpeed, 'easeInOutExpo');
          return false;
        }
      }
    });

    // Cerrar navbar al hacer click en un enlace
    $('.js-scroll').on('click', function () {
      $('.navbar-collapse').collapse('hide');
    });
  }

  /**
   * Activa scrollspy para highlighting de sección activa
   */
  function initScrollSpy() {
    $('body').scrollspy({
      target: '#mainNav',
      offset: navHeight
    });
  }

  // ==================== PRELOADER ====================
  
  /**
   * Maneja la animación de carga inicial
   */
  function initPreloader() {
    $(window).on('load', function () {
      if ($('#preloader').length) {
        $('#preloader').delay(100).fadeOut(CONFIG.animations.fadeSpeed, function () {
          $(this).remove();
        });
      }
    });
  }

  // ==================== BACK TO TOP ====================
  
  /**
   * Configura el botón de volver arriba
   */
  function initBackToTop() {
    // Mostrar/ocultar según scroll
    $(window).scroll(function() {
      const scrollTop = $(this).scrollTop();
      const $backToTop = $('.back-to-top');
      
      if (scrollTop > CONFIG.scroll.backToTopThreshold) {
        $backToTop.fadeIn(CONFIG.animations.fadeSpeed);
      } else {
        $backToTop.fadeOut(CONFIG.animations.fadeSpeed);
      }
    });

    // Click en botón back-to-top
    $('.back-to-top').click(function(){
      $('html, body').animate(
        { scrollTop: 0 }, 
        1500, 
        'easeInOutExpo'
      );
      return false;
    });

    // Click en scrolltop-mf (alternativo)
    $('.scrolltop-mf').on('click', function () {
      $('html, body').animate(
        { scrollTop: 0 }, 
        CONFIG.animations.scrollSpeed
      );
    });
  }

  // ==================== COUNTERS ====================
  
  /**
   * Inicializa los contadores animados de estadísticas
   */
  function initCounters() {
    if ($.fn.counterUp && $.fn.waypoint) {
      $('.counter').counterUp({
        delay: CONFIG.counter.delay,
        time: CONFIG.counter.time
      });
      console.log('✅ Contadores animados inicializados');
    } else {
      console.warn('⚠️ CounterUp o Waypoints no disponibles');
    }
  }

  // ==================== TYPED.JS ====================
  
  /**
   * Inicializa el efecto de escritura en la sección intro
   */
  function initIntroTyped() {
    if ($('.text-slider').length !== 1) return;

    console.log('✅ Inicializando text-slider (Intro)');
    
    const strings = $('.text-slider-items').text();
    
    new Typed('.text-slider', {
      strings: strings.split(','),
      typeSpeed: CONFIG.animations.typedSpeed,
      loop: true,
      backDelay: CONFIG.animations.typedBackDelay,
      backSpeed: CONFIG.animations.typedBackSpeed
    });
  }

  /**
   * Inicializa el efecto de escritura en la sección contacto
   */
  function initContactTyped() {
    if ($('.text-slider-contacto').length !== 1) return;

    console.log('✅ Inicializando text-slider-contacto');
    
    const contactStrings = ['Gmail', 'WhatsApp', 'Instagram', 'Linkedin'];
    const colorMap = {
      'Gmail': 'gmail-color',
      'WhatsApp': 'whatsapp-color',
      'Instagram': 'instagram-color',
      'Linkedin': 'linkedin-color'
    };
    
    new Typed('.text-slider-contacto', {
      strings: contactStrings,
      typeSpeed: CONFIG.animations.typedSpeed,
      loop: true,
      backDelay: CONFIG.animations.typedBackDelay,
      backSpeed: CONFIG.animations.typedBackSpeed,
      preStringTyped: function(pos) {
        const $element = $('.text-slider-contacto');
        const allColors = Object.values(colorMap).join(' ');
        const currentColor = colorMap[contactStrings[pos]];
        
        $element.removeClass(allColors).addClass(currentColor);
      }
    });
  }

  // ==================== OWL CAROUSEL ====================
  
  /**
   * Configuración base para los carruseles
   */
  function getCarouselConfig() {
    return {
      loop: true,
      margin: 10,
      nav: false,
      dots: true,
      autoplay: true,
      autoplayTimeout: CONFIG.carousel.autoplayTimeout,
      autoplayHoverPause: true,
      responsive: {
        0: { items: 1 },
        600: { items: 1 },
        1000: { items: 1 }
      }
    };
  }

  /**
   * Vincula navegación manual con dots del carousel
   */
  function bindCarouselDots(carouselSelector) {
    $(carouselSelector + ' .owl-dot').on('click', function() {
      const index = $(this).index();
      $(carouselSelector).trigger('to.owl.carousel', [index, CONFIG.carousel.transitionSpeed]);
    });
  }

  /**
   * Inicializa el carrusel de Formación
   */
  function initFormacionCarousel() {
    const selector = '#testimonial-mf';
    
    if (!$(selector).length) return;

    console.log('✅ Inicializando carousel Formación');
    
    $(selector).owlCarousel(getCarouselConfig());
    bindCarouselDots(selector);
  }

  /**
   * Inicializa el carrusel de Docencia
   */
  function initDocenciaCarousel() {
    const selector = '#testimonial-docencia';
    
    if (!$(selector).length) return;

    console.log('✅ Inicializando carousel Docencia');
    
    $(selector).owlCarousel(getCarouselConfig());
    bindCarouselDots(selector);
  }

  /**
   * Inicializa el carrusel de Maquinaria (si existe)
   */
  function initMaquinariaCarousel() {
    const $slider = $('.maquinaria-slider');
    
    if (!$slider.length) return;

    console.log('✅ Inicializando carousel Maquinaria');
    
    const maquinariaSlider = $slider.owlCarousel({
      loop: true,
      margin: 10,
      nav: true,
      dots: false,
      items: 3,
      navText: [
        "<i class='fa fa-chevron-left'></i>", 
        "<i class='fa fa-chevron-right'></i>"
      ]
    });
    
    // Vincular flechas personalizadas
    $('.owl-prev').click(function() {
      maquinariaSlider.trigger('prev.owl.carousel');
    });
    
    $('.owl-next').click(function() {
      maquinariaSlider.trigger('next.owl.carousel');
    });
  }

  // ==================== INICIALIZACIÓN ====================
  
  /**
   * Función principal de inicialización
   */
  function init() {
    // Inicializar componentes que no dependen de document.ready
    initNavbarToggle();
    initNavbarScroll();
    initSmoothScroll();
    initScrollSpy();
    initPreloader();
    initBackToTop();
    initCounters();

    // Inicializar componentes que requieren document.ready
    $(document).ready(function() {
      initIntroTyped();
      initContactTyped();
      initFormacionCarousel();
      initDocenciaCarousel();
      initMaquinariaCarousel();
      
      console.log('✅ Portfolio inicializado correctamente');
    });
  }

  // Ejecutar inicialización
  init();

})(jQuery);