{
    let licensesSlider = document.querySelector('[data-slider="licenses-slider"]');
    if(licensesSlider) {
        let sliderData = new Swiper(licensesSlider.querySelector('.swiper'), {
            speed: 600,
            navigation: {
                nextEl: licensesSlider.querySelector('.slider-btn.btn-next'),
                prevEl: licensesSlider.querySelector('.slider-btn.btn-prev'),
            },
            breakpoints: {
                0: {
                    slidesPerView: 'auto',
                    spaceBetween: 0,
                    autoHeight: false,
                    freeMode: true,
                },
                768: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                    autoHeight: true,
                    freeMode: false,
                },
                992: {
                    slidesPerView: 'auto',
                    spaceBetween: 0,
                    autoHeight: false,
                    freeMode: false,
                }
            }
        });
    }
}