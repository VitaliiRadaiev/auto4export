{
    let romoHeaderAdvantages = document.querySelector('[data-promo-header-advantages]');
    if (romoHeaderAdvantages) {
        const slider = romoHeaderAdvantages;
        if (slider) {
            let mySwiper;

            function mobileSlider() {
                if (document.documentElement.clientWidth <= 767 && slider.dataset.mobile == 'false') {
                    mySwiper = new Swiper(slider, {
                        autoplay: {
                            delay: 3000,
                            disableOnInteraction: false,
                        },
                        slidesPerView: 1,
                        speed: 600,
                        pagination: {
                        	el: romoHeaderAdvantages.querySelector('.swiper-pagination'),
                        	clickable: true,
                        },
                    });

                    slider.dataset.mobile = 'true';

                    //mySwiper.slideNext(0);
                }

                if (document.documentElement.clientWidth > 767) {
                    slider.dataset.mobile = 'false';

                    if (slider.classList.contains('swiper-initialized')) {
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