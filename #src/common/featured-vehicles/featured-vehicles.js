let featuredVehiclesSliders = document.querySelectorAll('[data-slider="featured-vehicles-slider"]');
if (featuredVehiclesSliders.length) {
    featuredVehiclesSliders.forEach(featuredVehiclesSlider => {
        let sliderData = new Swiper(featuredVehiclesSlider, {
            observer: true,
            observeParents: true,
            observeSlideChildren: true,
            slidesPerView: 'auto',
            spaceBetween: 0,
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
                nextEl: featuredVehiclesSlider.querySelector('.featured-vehicles__btn-next'),
                prevEl: featuredVehiclesSlider.querySelector('.featured-vehicles__btn-prev'),
            }
        });
    })
}

