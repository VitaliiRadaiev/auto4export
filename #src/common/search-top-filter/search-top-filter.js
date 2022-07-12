let topFilter = document.querySelector('[data-slider="search-top-filter"]');
if(topFilter) {
    let slider = topFilter.querySelector('.swiper');
    let sliderData = new Swiper(slider, {
        observer: true,
        observeParents: true,
        slidesPerView: 'auto',
        spaceBetween: 0,
        speed: 600,
        freeMode: true,
        slidesPerGroup: 2,
        watchOverflow: true,
        watchSlidesProgress: true,
        watchSlidesVisibility: true,
        navigation: {
            nextEl: topFilter.querySelector('.slider-btn.btn-next'),
            prevEl: topFilter.querySelector('.slider-btn.btn-prev'),
        }
    });
    
}