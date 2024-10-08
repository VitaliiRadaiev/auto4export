let header = document.querySelector('[data-header]');
let vehicleFinder = document.querySelector('[data-vehicle-finder]');
let burger = document.querySelector('[data-burger]');
let mobileMenu = document.querySelector('[data-mobile-menu]');
let vehicleFinderMobButtons = document.querySelectorAll('[data-open-vehicle-list-by-id]');
let vehicleFinderMobLists = Array.from(document.querySelectorAll('[data-vehicle-list-id]'));
let isScroll = window.pageYOffset;
let mobileAccountMenu = document.querySelector('[data-mobile-account-menu]');

if (header) {
    window.addEventListener('scroll', () => {
        header.classList.toggle('header--is-scroll', window.pageYOffset > 50);

        if(window.pageYOffset > 50) {
            if(window.pageYOffset > isScroll) {
                header.classList.add('header--hide');
            } else if(window.pageYOffset < isScroll) {
                header.classList.remove('header--hide');
            }
        }

        isScroll = window.pageYOffset;
    })
}

if (vehicleFinder) {
    let triggers = Array.from(vehicleFinder.querySelectorAll('[data-vehicle-finder-trigger]'));
    let contentBoxes = Array.from(vehicleFinder.querySelectorAll('[data-vehicle-finder-content]'));

    if (triggers.length && contentBoxes.length) {
        const getBox = (id) => {
            let [box] = contentBoxes.filter(contentBoxe => contentBoxe.dataset.vehicleFinderContent === id);
            return box;
        }
        triggers.forEach(trigger => {
            trigger.addEventListener('mouseenter', () => {
                trigger.classList.add('active');
                let box = getBox(trigger.dataset.vehicleFinderTrigger);
                if (box) box.classList.add('active');

                triggers.forEach(i => {
                    if (i === trigger) return;

                    i.classList.remove('active');
                    let box = getBox(i.dataset.vehicleFinderTrigger);
                    if (box) box.classList.remove('active');
                })
            })
        })
    }
}

if(mobileMenu) {
    let dropDownItems = mobileMenu.querySelectorAll('.menu-item-has-children');

    if(burger) {
        burger.addEventListener('click', () => {
            mobileMenu.classList.add('mobile-menu--open');
            document.body.classList.add('overflow-hidden');
        })
    }

    mobileMenu.addEventListener('click', (e) => {
        if(e.target.closest('.mobile-menu__body')) return;
        mobileMenu.classList.remove('mobile-menu--open');
        document.body.classList.remove('overflow-hidden');
    })

    if(dropDownItems.length) {
        dropDownItems.forEach(dropDownItem => {
            let link = dropDownItem.querySelector('.mobile-menu__list-link');
            let subMenu = dropDownItem.querySelector('.mobile-menu__sub-menu');

            if(link && subMenu) {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    link.classList.toggle('active');
                    this.utils.slideToggle(subMenu, 300);

                    dropDownItems.forEach(i => {
                        if(i === dropDownItem) return;

                        let link = i.querySelector('.mobile-menu__list-link');
                        let subMenu = i.querySelector('.mobile-menu__sub-menu');

                        link.classList.remove('active');
                        this.utils.slideUp(subMenu, 300);
                    })
                })
            }
        })
    }
}

if(vehicleFinderMobButtons.length && vehicleFinderMobLists.length) {
    vehicleFinderMobButtons.forEach(btn => {
        let [list] = vehicleFinderMobLists.filter(i => i.dataset.vehicleListId === btn.dataset.openVehicleListById);
        if(list) {
            let btnBack = list.querySelector('.vehicle-finder-mob__btn-back');
            btnBack.addEventListener('click', () => {
                list.classList.remove('vehicle-finder-mob--open');
            })
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                list.classList.add('vehicle-finder-mob--open');
            })
        }

    })
}

if(mobileAccountMenu) {
    let openButtons = document.querySelectorAll('[data-action="open-mobile-account-menu"]');
    if(openButtons.length) {
        openButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                if(document.documentElement.clientWidth < 992) {
                    e.preventDefault();
                    btn.addEventListener('click', () => {
                        mobileAccountMenu.classList.add('mobile-account-menu--open');
                        document.body.classList.add('overflow-hidden');
                    })
                }
            })
        })

    
        mobileAccountMenu.addEventListener('click', (e) => {
            if(e.target.closest('.mobile-account-menu__body')) return;
            mobileAccountMenu.classList.remove('mobile-account-menu--open');
            document.body.classList.remove('overflow-hidden');
        })
    }
}