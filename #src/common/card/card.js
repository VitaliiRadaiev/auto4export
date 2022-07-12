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
            }
        });
    })
}

let ratings = document.querySelectorAll('[data-car-rating]');
if (ratings.length) {
    ratings.forEach(rating => {
        let value = +rating.dataset.carRating;
        if (value >= 4) {
            rating.style.background = '#5BC749';
        } else if (value >= 3) {
            rating.style.background = '#DDAB3A';
        } else if (value >= 2) {
            rating.style.background = '#C77149';
        } else {
            rating.style.background = '#c92306';
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
                let stateIcons = card.querySelector('.card__state-icons');
                let row1 = card.querySelector('.card__row-1');

                row1.prepend(stateIcons);


            })
        }

        if (list) {
            list.classList.add('main-search__list--grid')
        }

        window.borderDashed.update();
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

                if(document.documentElement.clientWidth > 991.98) {
                    let stateIcons = card.querySelector('.card__state-icons');
                    let box = card.querySelector('.card__box-body');
    
                    box.append(stateIcons);
                }
                if(document.documentElement.clientWidth < 768) {
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

                if(document.documentElement.clientWidth < 768) {
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
            if (card.classList.contains('card--second')) return;

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