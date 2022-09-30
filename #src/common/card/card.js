let cardSliders = document.querySelectorAll('[data-slider="card-images"]');
if (cardSliders.length) {
    cardSliders.forEach(cardSlider => {

        let sliderData = new Swiper(cardSlider, {
            observer: true,
            observeParents: true,
            slidesPerView: 1,
            spaceBetween: 10,
            speed: 400,
            loop: true,
            preloadImages: false,
            lazy: {
                loadPrevNext: true,
            },
            pagination: {
                el: cardSlider.querySelector('.swiper-pagination'),
                clickable: true,
            },
            navigation: {
                nextEl: cardSlider.querySelector('.btn-next'),
                prevEl: cardSlider.querySelector('.btn-prev'),
            },
        });
    })
}

let ratings = document.querySelectorAll('[data-car-rating]');
if (ratings.length) {
    ratings.forEach(rating => {
        let tooltipTitle = rating.closest('li').querySelector('.card__state-tooltipe h5');
        let value = +rating.dataset.carRating;
        if (value >= 4) {
            rating.style.background = '#3ECF5C';
            if(tooltipTitle) tooltipTitle.style.color = '#3ECF5C';
        } else if (value >= 3) {
            rating.style.background = '#E3BD15';
            if(tooltipTitle) tooltipTitle.style.color = '#E3BD15';
        } else if (value >= 2) {
            rating.style.background = '#CFA93E';
            if(tooltipTitle) tooltipTitle.style.color = '#CFA93E';
        } else {
            rating.style.background = '#E3433A';
            if(tooltipTitle) tooltipTitle.style.color = '#E3433A';
        }
    })
}


let cards = document.querySelectorAll('[data-card]');


let btnSetList = document.querySelector('[data-action="set-list"]');
let btnSetGrid = document.querySelector('[data-action="set-grid"]');
if (btnSetList && btnSetGrid) {
    let list = document.querySelector('.main-search__list');
    // init
    if (btnSetGrid.classList.contains('active')) {
        if (cards.length) {
            cards.forEach(card => {
                card.classList.add('card--second');
            })
        }

        if (list) {
            list.classList.add('main-search__list--grid')
        }
    }

    btnSetList.addEventListener('click', (e) => {
        e.preventDefault();
        btnSetList.classList.add('active');
        btnSetGrid.classList.remove('active');

        if (cards.length) {
            cards.forEach(card => {
                card.classList.remove('card--second');
                let col3 = card.querySelector('.card__col-3');
                let vinNum = card.querySelector('.card__number--vin');

                if (document.documentElement.clientWidth > 991.98) {
                    let stateIcons = card.querySelector('.card__state-icons');
                    let box = card.querySelector('.card__box-body');

                    box.append(stateIcons);
                }
                if (document.documentElement.clientWidth < 768) {
                    col3.prepend(vinNum)
                }
            })
        }

        if (list) {
            list.classList.remove('main-search__list--grid');
        }

        window.borderDashed.update();
    })

    btnSetGrid.addEventListener('click', (e) => {
        e.preventDefault();
        btnSetGrid.classList.add('active');
        btnSetList.classList.remove('active');

        if (cards.length) {
            cards.forEach(card => {
                card.classList.add('card--second');
                let row2 = card.querySelector('.card__row-2');
                let vinNum = card.querySelector('.card__number--vin');
                let stateIcons = card.querySelector('.card__state-icons');
                let row1 = card.querySelector('.card__row-1');

                row1.append(stateIcons);

                if (document.documentElement.clientWidth < 768) {
                    row2.append(vinNum)
                }
            })
        }

        if (list) {
            list.classList.add('main-search__list--grid');

        }

        window.borderDashed.update();
    })
}

if (cards.length) {
    cards.forEach(card => {
        let stateIcons = card.querySelector('.card__state-icons');
        let box = card.querySelector('.card__box-body');
        let row1 = card.querySelector('.card__row-1');
        let row2 = card.querySelector('.card__row-2');
        let col3 = card.querySelector('.card__col-3');
        let vinNum = card.querySelector('.card__number--vin');
        let btnBitNow = card.querySelector('.card__bid-now');

        if (btnBitNow) {
            let box = card.querySelector('.card__box');

            btnBitNow.addEventListener('mouseenter', () => {
                box.classList.add('border-dashed-hover');
            })
            btnBitNow.addEventListener('mouseleave', () => {
                box.classList.remove('border-dashed-hover');
            })
        }

        const changePosition = () => {
            if (card.classList.contains('card--second')) {
                let stateIcons = card.querySelector('.card__state-icons');
                let row1 = card.querySelector('.card__row-1');
                row1.append(stateIcons);

                return
            };

            if (stateIcons && box && row1) {
                if (document.documentElement.clientWidth < 992) {
                    row1.append(stateIcons);
                } else {
                    box.prepend(stateIcons);
                }
            }

            if (row2 && col3 && vinNum) {
                if (document.documentElement.clientWidth < 768) {
                    col3.prepend(vinNum);
                } else {
                    row2.append(vinNum);
                }
            }
        }

        changePosition();

        window.addEventListener('resize', changePosition);


        card.addEventListener('click', (e) => {
            if (e.target.closest('.card__bid-now')
                || e.target.closest('.card__state-icons')
                || e.target.closest('.card__star')
            ) {
                e.preventDefault();
            }
        })
    })
}


let stars = document.querySelectorAll('.card__star');
if(stars.length) {
    stars.forEach(star => {
        star.addEventListener('click', (e) => {
            star.classList.add('show-text');

            setTimeout(() => {
                star.classList.remove('show-text');
            }, 1000)
        })
    })
}