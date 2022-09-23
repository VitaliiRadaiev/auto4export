let featuredVehiclesSliders = document.querySelectorAll('[data-slider="carousel-slider"]');
if (featuredVehiclesSliders.length) {
    featuredVehiclesSliders.forEach(featuredVehiclesSlider => {
        let sliderData = new Swiper(featuredVehiclesSlider, {
            observer: true,
            observeParents: true,
            observeSlideChildren: true,
            speed: 600,
            freeMode: true,
            loop: true,
            watchOverflow: true,
            preloadImages: false,
            watchSlidesProgress: true,
            lazy: {
                loadPrevNext: true,
            },
            watchSlidesVisibility: true,
            navigation: {
                nextEl: featuredVehiclesSlider.querySelector('.carousel__btn-next'),
                prevEl: featuredVehiclesSlider.querySelector('.carousel__btn-prev'),
            },
            breakpoints: {
                0: {
                    slidesPerView: 'auto',
                    spaceBetween: 0,
                },
                992: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                },
                1268: {
                    slidesPerView: 5,
                    spaceBetween: 20,
                },
            },
        });
    })
}

