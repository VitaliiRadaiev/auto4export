{
    let advantagesSlider = document.querySelector('[data-slider="advantages-slider"]');
    if (advantagesSlider) {
        const slider = advantagesSlider;
        if (slider) {
            let mySwiper;
            function mobileSlider() {
                if (document.documentElement.clientWidth <= 767 && slider.dataset.mobile == 'false') {
                    mySwiper = new Swiper(slider.querySelector('.swiper'), {
                        slidesPerView: 1,
                        speed: 600,
                        autoHeight: true,
                        pagination: {
                            el: slider.querySelector('.swiper-pagination'),
                            clickable: true,
                        },
                    });

                    slider.dataset.mobile = 'true';
                }

                if (document.documentElement.clientWidth > 767) {
                    slider.dataset.mobile = 'false';

                    if (slider.querySelector('.swiper').classList.contains('swiper-initialized')) {
                        mySwiper.destroy();
                    }
                }
            }

            mobileSlider();

            window.addEventListener('resize', () => {
                mobileSlider();
            })
        }
    }
}