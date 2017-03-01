(function() {

    'use strict';

    angular.module('homeModule').controller('homeController', ['$scope', 'eventsService', homeControllerFactory])

    function homeControllerFactory($scope, $eventsService) {


        $scope.load = function() {


            $scope.events = [];


            //Events
            $eventsService.query({visible:true},function(query_events) {
                $scope.events = query_events;
            });


            //#main-slider
            var slideHeight = $(window).height();
            $('#home-slider .item').css('height', slideHeight);

            $(window).resize(function() {
                'use strict',
                $('#home-slider .item').css('height', slideHeight);
            });

            //Scroll Menu
            $(window).on('scroll', function() {
                if ($(window).scrollTop() > slideHeight) {
                    $('.main-nav').addClass('navbar-fixed-top');
                } else {
                    $('.main-nav').removeClass('navbar-fixed-top');
                }
            });

            // Navigation Scroll
            $(window).scroll(function(event) {
                Scroll();
            });

            $('.navbar-collapse ul li a').on('click', function() {
                $('html, body').animate({ scrollTop: $(this.hash).offset().top - 5 }, 1000);
                return false;
            });



            $('#tohash').on('click', function() {
                $('html, body').animate({ scrollTop: $(this.hash).offset().top - 5 }, 1000);
                return false;
            });

            //Initiat WOW JS
            new WOW().init();
            //smoothScroll
            smoothScroll.init();

            // Progress Bar
            $('#about-us').bind('inview', function(event, visible, visiblePartX, visiblePartY) {
                if (visible) {
                    $.each($('div.progress-bar'), function() {
                        $(this).css('width', $(this).attr('aria-valuetransitiongoal') + '%');
                    });
                    $(this).unbind('inview');
                }
            });

            //Countdown
            $('#features').bind('inview', function(event, visible, visiblePartX, visiblePartY) {
                if (visible) {
                    $(this).find('.timer').each(function() {
                        var $this = $(this);
                        $({ Counter: 0 }).animate({ Counter: $this.text() }, {
                            duration: 2000,
                            easing: 'swing',
                            step: function() {
                                $this.text(Math.ceil(this.Counter));
                            }
                        });
                    });
                    $(this).unbind('inview');
                }
            });

            // Contact form
            var form = $('#main-contact-form');
            form.submit(function(event) {
                event.preventDefault();
                var form_status = $('<div class="form_status"></div>');
                $.ajax({
                    url: $(this).attr('action'),
                    beforeSend: function() {
                        form.prepend(form_status.html('<p><i class="fa fa-spinner fa-spin"></i> Email is sending...</p>').fadeIn());
                    }
                }).done(function(data) {
                    form_status.html('<p class="text-success">Thank you for contact us. As early as possible  we will contact you</p>').delay(3000).fadeOut();
                });
            });

            initialize_map();
            //google.maps.event.addDomListener(window, 'load', initialize_map);

            //Preloader
            var preloader = $('.preloader');
            preloader.remove();

        };

        // User define function
        function Scroll() {
            var contentTop = [];
            var contentBottom = [];
            var winTop = $(window).scrollTop();
            var rangeTop = 200;
            var rangeBottom = 500;
            $('.navbar-collapse').find('.scroll a').each(function() {
                contentTop.push($($(this).attr('href')).offset().top);
                contentBottom.push($($(this).attr('href')).offset().top + $($(this).attr('href')).height());
            })
            $.each(contentTop, function(i) {
                if (winTop > contentTop[i] - rangeTop) {
                    $('.navbar-collapse li.scroll')
                        .removeClass('active')
                        .eq(i).addClass('active');
                }
            })
        };

        function initialize_map() {
            //Google Map
            var latitude = $('#google-map').data('latitude')
            var longitude = $('#google-map').data('longitude')


            var myLatlng = new google.maps.LatLng(latitude, longitude);
            var mapOptions = {
                zoom: 14,
                scrollwheel: false,
                center: myLatlng
            };
            var map = new google.maps.Map(document.getElementById('google-map'), mapOptions);
            var contentString = '';
            var infowindow = new google.maps.InfoWindow({
                content: '<div class="map-content"><ul class="address">' + $('.address').html() + '</ul></div>'
            });
            var marker = new google.maps.Marker({
                position: myLatlng,
                map: map
            });
            google.maps.event.addListener(marker, 'click', function() {
                infowindow.open(map, marker);
            });
        }
    };


})()
