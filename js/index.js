$(function () {

    // Preloader
    $(window).on( 'load', function () {
        setTimeout(function () {
            $('body').addClass('is-load');
        }, 100);
    });

    // $('[data-toggle="popover"]').popover();

    // $('.product_notice .btn-prelink').popover({
    // 	html: true
    // })

});

$(document).ready(function () {

    // $('.sliding-panel-button,.sliding-panel-fade-screen,.sliding-panel-close').on('click touchstart',function (e) {
    //	$('.sliding-panel-content,.sliding-panel-fade-screen').toggleClass('is-visible');
    //	e.preventDefault();
    // });

    $('.header_search-toogle').on('click touchstart',function (e) {
        $('.header_search').toggleClass('is-visible');
        $('.header_search-toogle').toggleClass('active');
        e.preventDefault();
    });


    // $('.main_nav_wrap').css({"overflow":"initial"})

    $('#mainNavbar').flexMenu({
        linkText:      'Ещё',
        linkTitle:     'КАТАЛОГ ТОВАРОВ',
        linkTextAll:   'КАТАЛОГ ТОВАРОВ',
        linkTitleAll:  'КАТАЛОГ ТОВАРОВ',
        showOnHover:   true,
        popupAbsolute: true
    });

    $('#topNavbar').flexMenu({
        linkText:      'Ещё',
        linkTitle:     'Разделы',
        linkTextAll:   'Разделы',
        linkTitleAll:  'Ещё разделы',
        showOnHover:   true,
        popupAbsolute: true
    });

    var top_menu = $('#mainNavbar').menuAim({
        triggerEvent:       'hover',
        rowSelector:        "> li",
        activateCallback:   activate,
        deactivateCallback: deactivate,
        submenuDirection:   'left',
        openClassName:      'is-hovered',
        activationDelay:    200
    });

    function activate(row) {
        $(row).addClass('is-hovered');
    }

    function deactivate(row) {
        $(row).removeClass('is-hovered');
    }

    $('.main_nav_links > li:has(div.main_nav_descr) > a, .breadcrumbs li:has(ul)').doubleTapToGo()

    $('.is_slider').slick({
        infinite:        true,
        dots:            false,
        prevArrow:       "<span class='paginate page_prev'><i></i><i></i></span>",
        nextArrow:       "<span class='paginate page_next'><i></i><i></i></span>",
        responsive:      [{
                breakpoint:    1024,
                settings:      {
                    slidesToShow: 3
                }
            },
            {
                breakpoint:    922,
                settings:      {
                    slidesToShow: 2
                }
            },
            {
                breakpoint:    599,
                settings:      {
                    slidesToShow: 1
                }
            }
        ]
    });

    $('.breadcrumbs .breadcrumbs_sub-link').on('click', function(e) {
        $('.breadcrumbs_sub').toggleClass('is-visible');
        e.preventDefault();
    });

    $('.slider_product-for').slick({
        slidesToShow:   1,
        slidesToScroll: 1,
        arrows:         true,
        fade:           true,
        asNavFor:       '.slider_product-nav',
        prevArrow:      "<span class='paginate page_prev'><i></i><i></i></span>",
        nextArrow:      "<span class='paginate page_next'><i></i><i></i></span>"
    });
    $('.slider_product-nav').slick({
        slidesToShow:    4,
        slidesToScroll:  1,
        asNavFor:        '.slider_product-for',
        dots:            false,
        arrows:          false,
        focusOnSelect:   true,
        variableWidth:   true,
        responsive:      [{
                breakpoint:    922,
                settings:      {
                    slidesToShow: 4
                }
            },
            {
                breakpoint:    680,
                settings:      {
                    slidesToShow: 2
                }
            },
            {
                breakpoint:    480,
                settings:      {
                    slidesToShow: 2
                }
            }
        ]
    });

    $('.inline-popups').magnificPopup({
        removalDelay:         500, //delay removal by X to allow out-animation
        callbacks:            {
            beforeOpen:          function() {
                this.st.mainClass = this.st.el.attr('data-effect');
            }
        },
        midClick:             true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
    });


    // Image popups
    $('.image-popups').magnificPopup({
        type:                    'image',
        removalDelay:            500, //delay removal by X to allow out-animation
        callbacks:               {
            beforeOpen:             function() {
                // just a hack that adds mfp-anim class to markup
                this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
                this.st.mainClass    = this.st.el.attr('data-effect');
            }
        },
        closeOnContentClick:     true,
        midClick:                true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
    });

    $("input[type=number]").stepper();
    $(window).one("pronto.load", function() {
        $("input[type=number]").stepper("destroy");
    });


    (function($) {
        $.fn.openCloseBlocks = function(blocks, options) {
            var defaults        = {
                    speed:              'normal'
                },
                opts               = $.extend(defaults, options),
                togglers           = $(this),
                bls                = $(blocks);
            if (!bls) return;

            togglers.each(function(index) {
                $(this).click(function(e) {
                    e.preventDefault();
                    $(bls[index]).slideToggle(opts['speed']);
                    $(this).toggleClass('active');
                });
            });
        };
    })(jQuery);
    $('.js_drop').openCloseBlocks($('.js_drop-content'), {
        speed:                 'fast'
    });


    Sliderbox = function(options) {
        this.options = options;
        this.init();
    };

    Sliderbox.prototype.init = function() {
        var box = document.querySelectorAll(this.options.target),
            len = box.length,
            i = 0;
        for (; i < len; i++) {
            this.handler(box[i]);
        }
    };

    Sliderbox.prototype.handler = function(target) {
        var slider = target.querySelector('.sliderbox-slider'),
            inpMin = target.querySelector('.sliderbox-input-min'),
            inpMax = target.querySelector('.sliderbox-input-max');
        noUiSlider.create(slider, this.options);
        slider.noUiSlider.on('update', function(values, handle) {
            if (handle) {
                inpMax.value = values[handle];
            } else {
                inpMin.value = values[handle];
            }
        });
        target.addEventListener('change', function(e) {
            if (e.target === inpMin) {
                slider.noUiSlider.set([e.target.value]);
            } else {
                slider.noUiSlider.set([null, e.target.value]);
            }
        });
    };

    //
    new Sliderbox({
        target:    '.sliderbox',
        start:     [20, 40], // Handle start position
        connect:   true, // Display a colored bar between the handles
        behaviour: 'tap-drag', // Move handle on tap, bar is draggable
        range:     { // Slider can select '0' to '100'
            'min':    0,
            'max':    100
        }
    });

    $('.dropdown-toggle').on("click", function(e) {
        e.preventDefault();
        e.stopPropagation();
        $(this).closest('.dropdown').toggleClass('open');
    });
    $('.dropdown-menu li').click(function(e) {
        e.preventDefault();
        var clicked = $(this);
        clicked.closest('.dropdown-menu').find('.menu-active').removeClass('menu-active');
        clicked.parent('li').addClass('menu-active');
        clicked.closest('.dropdown').find('.toggle-active').html(clicked.html());
        $('.dropdown.open').removeClass('open');
    });
    $(document).click(function() {
        $('.dropdown.open').removeClass('open');
    });

    // $('.zoomy').elevateZoom({
    //     zoomWindowFadeIn:  500,
    //     zoomWindowFadeOut: 500,
    //     lensFadeIn:        500,
    //     lensFadeOut:       500,
    //     scrollZoom:        true,
    //     responsive:        true,
    //     borderSize:        2,
    //     borderColour:      "#d9d9d9"
    // });
    // $('.catalog_item-img .b-lazy[data-src]').elevateZoom({
    //     zoomWindowFadeIn: 500,
    //     zoomWindowFadeOut: 500,
    //     lensFadeIn: 500,
    //     lensFadeOut: 500,
    //     // scrollZoom : true,
    //     responsive: true,
    //     borderSize: 2,
    //     borderColour: "#d9d9d9"
    // });

    $('.popover_slider-for').slick({
        slidesToShow:   1,
        slidesToScroll: 1,
        arrows:         true,
        fade:           true,
        asNavFor:       '.popover_slider-nav',
        prevArrow:      "<span class='paginate page_prev'><i></i><i></i></span>",
        nextArrow:      "<span class='paginate page_next'><i></i><i></i></span>",
        adaptiveHeight: true
    });
    $('.popover_slider-nav').slick({
        slidesToShow:   4,
        slidesToScroll: 1,
        asNavFor:       '.popover_slider-for',
        dots:           false,
        arrows:         false,
        focusOnSelect:  true,
        variableWidth:  true
    });

    if (Modernizr.mq('(max-width: 600px)')) {
        $('.popover-link').webuiPopover({
            placement: 'bottom-right',
            trigger:   'hover',
            animation: 'pop',
            multi:     true,
            closeable: true,
            offsetLeft: -45
        });
    } else {
        $('.popover-link').webuiPopover({
            placement: 'auto-right',
            trigger:   'hover',
            animation: 'pop',
            multi:     true,
            closeable: false,
            onShow: function ($element) {
                $('.popover_slider-for').slick('reinit');
            }
        });
    }

    $('.product_notice .btn-prelink').webuiPopover({
        placement: 'auto-right',
        trigger:   'click',
        animation: 'pop',
        multi:     true,
        autoHide:  5000,
        offsetTop: -30,
        onShow:    function($element) {
            $('.product_notice .btn-prelink').addClass('is-active');
        },
        onHide:    function($element) {
            $('.product_notice .btn-prelink').removeClass('is-active');
        }
    });

    if (Modernizr.touch) {
        $('.catalog_visible[data-fvalue="gallery"]').removeClass('active');
        $('.catalog_visible[data-fvalue="showcase"]').addClass('active');
    } else {
        $('.catalog_visible[data-fvalue="gallery"]').addClass('active');
        $('.catalog_visible[data-fvalue="showcase"]').removeClass('active');
    }

});

window.bLazy = new Blazy();

$(function () {
    $.scrollUp({
        animation: 'fade',
        scrollImg: { active: true, type: 'background', src: '../img/content/top.png' }
    });
});


(function() {
  var reset_scroll;

  $(function() {
    return $("[data-sticky_column]").stick_in_parent({
      parent: "[data-sticky_parent]"
    });
  });

  reset_scroll = function() {
    var scroller;
    scroller = $("body,html");
    scroller.stop(true);
    if ($(window).scrollTop() !== 0) {
      scroller.animate({
        scrollTop: 0
      }, "fast");
    }
    return scroller;
  };

  window.scroll_it = function() {
    var max;
    max = $(document).height() - $(window).height();
    return reset_scroll().animate({
      scrollTop: max
    }, max * 3).delay(100).animate({
      scrollTop: 0
    }, max * 3);
  };

  window.scroll_it_wobble = function() {
    var max, third;
    max = $(document).height() - $(window).height();
    third = Math.floor(max / 3);
    return reset_scroll().animate({
      scrollTop: third * 2
    }, max * 3).delay(100).animate({
      scrollTop: third
    }, max * 3).delay(100).animate({
      scrollTop: max
    }, max * 3).delay(100).animate({
      scrollTop: 0
    }, max * 3);
  };

  $(window).on("resize", (function(_this) {
    return function(e) {
      return $(document.body).trigger("sticky_kit:recalc");
    };
  })(this));

}).call(this);
