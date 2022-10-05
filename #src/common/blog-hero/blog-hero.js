{
    let blogHeroSlider = document.querySelector('[data-slider="blog-hero"]');
    if(blogHeroSlider) {
        let sliderData = new Swiper(blogHeroSlider, {
            autoplay: {
                delay: 6000,
                disableOnInteraction: false,
            },
            observer: true,
            observeParents: true,
            slidesPerView: 1,
            spaceBetween: 20,
            speed: 600,
            loop: true,
            pagination: {
            	el: blogHeroSlider.querySelector('.swiper-pagination'),
            	clickable: true,
            },
        });
    }
}