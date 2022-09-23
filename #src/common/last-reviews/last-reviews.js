let lastReviewsSlider = document.querySelector('[data-slider="last-reviews"]');
if (lastReviewsSlider) {
    let sliderData = new Swiper(lastReviewsSlider, {
        /*
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        */
        observer: true,
        observeParents: true,
        speed: 600,
        navigation: {
            nextEl: lastReviewsSlider.querySelector('.btn-next'),
            prevEl: lastReviewsSlider.querySelector('.btn-prev'),
        },
        pagination: {
            el: lastReviewsSlider.querySelector('.swiper-pagination'),
            clickable: true,
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
                spaceBetween: 20,
                autoHeight: true
            },
            768: {
                slidesPerView: 'auto',
                spaceBetween: 20,
            },
            992: {
                slidesPerView: 4,
                spaceBetween: 20,
            }
        },

    });

    window.addEventListener('resize', () => {
        sliderData.update();
    })

}