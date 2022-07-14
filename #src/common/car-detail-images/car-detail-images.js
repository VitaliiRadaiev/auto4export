let carDetailImages = document.querySelector('[data-slider="car-detail-images"]');
if (carDetailImages) {
    let thumb = new Swiper(carDetailImages.querySelector('.car-detail-images__thumb .swiper'), {
        slidesPerView: 6,
        spaceBetween: 0,
        speed: 600,
        slidesPerGroup: 2,
        lazy: {
            loadPrevNext: true,
        },
        watchSlidesVisibility: true,
        navigation: {
            nextEl: carDetailImages.querySelector('.slider-btn.btn-next'),
            prevEl: carDetailImages.querySelector('.slider-btn.btn-prev'),
        },
    });

    let main = new Swiper(carDetailImages.querySelector('.car-detail-images__main .swiper'), {
        slidesPerView: 1,
        spaceBetween: 10,
        speed: 600,
        preloadImages: false,
        lazy: {
            loadPrevNext: true,
        },
        pagination: {
            el: carDetailImages.querySelector('.swiper-pagination'),
            clickable: true,
        },
        watchSlidesVisibility: true,
        thumbs: {
            swiper: thumb,
        },
    });

}