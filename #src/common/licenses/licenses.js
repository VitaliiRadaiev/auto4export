{
    let licensesSlider = document.querySelector('[data-slider="licenses-slider"]');
    if(licensesSlider) {
        let sliderData = new Swiper(licensesSlider.querySelector('.swiper'), {
            slidesPerView: 'auto',
            spaceBetween: 0,
            speed: 600,
            navigation: {
                nextEl: licensesSlider.querySelector('.slider-btn.btn-next'),
                prevEl: licensesSlider.querySelector('.slider-btn.btn-prev'),
            },
        });
    }
}