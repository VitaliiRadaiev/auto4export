class Utils {
	slideUp(target, duration = 500) {
		target.style.transitionProperty = 'height, margin, padding';
		target.style.transitionDuration = duration + 'ms';
		target.style.height = target.offsetHeight + 'px';
		target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = 0;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		window.setTimeout(() => {
			target.style.display = 'none';
			target.style.removeProperty('height');
			target.style.removeProperty('padding-top');
			target.style.removeProperty('padding-bottom');
			target.style.removeProperty('margin-top');
			target.style.removeProperty('margin-bottom');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
		}, duration);
	}
	slideDown(target, duration = 500) {
		target.style.removeProperty('display');
		let display = window.getComputedStyle(target).display;
		if (display === 'none')
			display = 'block';

		target.style.display = display;
		let height = target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = 0;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		target.offsetHeight;
		target.style.transitionProperty = "height, margin, padding";
		target.style.transitionDuration = duration + 'ms';
		target.style.height = height + 'px';
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');
		window.setTimeout(() => {
			target.style.removeProperty('height');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
		}, duration);
	}
	slideToggle(target, duration = 500) {
		if (!target.classList.contains('_slide')) {
			target.classList.add('_slide');
			if (window.getComputedStyle(target).display === 'none') {
				return this.slideDown(target, duration);
			} else {
				return this.slideUp(target, duration);
			}
		}
	}

	Android() {
		return navigator.userAgent.match(/Android/i);
	}
	BlackBerry() {
		return navigator.userAgent.match(/BlackBerry/i);
	}
	iOS() {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	}
	Opera() {
		return navigator.userAgent.match(/Opera Mini/i);
	}
	Windows() {
		return navigator.userAgent.match(/IEMobile/i);
	}
	isMobile() {
		return (this.Android() || this.BlackBerry() || this.iOS() || this.Opera() || this.Windows());
	}

	scrollTrigger(el, value, callback) {
		let triggerPoint = document.documentElement.clientHeight / 100 * (100 - value);
		const trigger = () => {
			if(el.getBoundingClientRect().top <= triggerPoint && !el.classList.contains('is-show')) {
				if(typeof callback === 'function') {
					callback();
					el.classList.add('is-show')
				}
			}
		}
	
		trigger();
	
		window.addEventListener('scroll', trigger);
	}

	numberCounterAnim() {
		let counterItems = document.querySelectorAll('[data-number-counter-anim]');
		if (counterItems) {
	
			counterItems.forEach(item => {
				let animation = anime({
					targets: item,
					textContent: [0, item.innerText],
					round: 1,
					easing: 'linear',
					autoplay: false,
					duration: 1000
				});
	
				window.addEventListener('load', () => {
					this.scrollTrigger(item, 15, () => {animation.play()})
				})
			})
		}
	}

	initTruncateString() {
		function truncateString(el, stringLength = 0) {
			let str = el.innerText;
			if (str.length <= stringLength) return;
			el.innerText = [...str].slice(0, stringLength).join('') + '...';
		}

		let truncateItems = document.querySelectorAll('[data-truncate-string]');
		if(truncateItems.length) {
			truncateItems.forEach(truncateItem => {
				truncateString(truncateItem, truncateItem.dataset.truncateString);
			})
		}
	}
}


;
// HTML data-da="where(uniq class name),when(breakpoint),position(digi)"
// e.x. data-da=".content__column-garden,992,2"
// https://github.com/FreelancerLifeStyle/dynamic_adapt

class DynamicAdapt {
	constructor(type) {
	  this.type = type;
	}
  
	init() {
	  this.оbjects = [];
	  this.daClassname = '_dynamic_adapt_';
	  this.nodes = [...document.querySelectorAll('[data-da]')];
  
	  this.nodes.forEach((node) => {
		const data = node.dataset.da.trim();
		const dataArray = data.split(',');
		const оbject = {};
		оbject.element = node;
		оbject.parent = node.parentNode;
		оbject.destination = document.querySelector(`${dataArray[0].trim()}`);
		оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : '767';
		оbject.place = dataArray[2] ? dataArray[2].trim() : 'last';
		оbject.index = this.indexInParent(оbject.parent, оbject.element);
		this.оbjects.push(оbject);
	  });
  
	  this.arraySort(this.оbjects);
  
	  this.mediaQueries = this.оbjects
		.map(({
		  breakpoint
		}) => `(${this.type}-width: ${breakpoint}px),${breakpoint}`)
		.filter((item, index, self) => self.indexOf(item) === index);
  
	  this.mediaQueries.forEach((media) => {
		const mediaSplit = media.split(',');
		const matchMedia = window.matchMedia(mediaSplit[0]);
		const mediaBreakpoint = mediaSplit[1];
  
		const оbjectsFilter = this.оbjects.filter(
		  ({
			breakpoint
		  }) => breakpoint === mediaBreakpoint
		);
		matchMedia.addEventListener('change', () => {
		  this.mediaHandler(matchMedia, оbjectsFilter);
		});
		this.mediaHandler(matchMedia, оbjectsFilter);
	  });
	}
  
	mediaHandler(matchMedia, оbjects) {
	  if (matchMedia.matches) {
		оbjects.forEach((оbject) => {
		  оbject.index = this.indexInParent(оbject.parent, оbject.element);
		  this.moveTo(оbject.place, оbject.element, оbject.destination);
		});
	  } else {
		оbjects.forEach(
		  ({ parent, element, index }) => {
			if (element.classList.contains(this.daClassname)) {
			  this.moveBack(parent, element, index);
			}
		  }
		);
	  }
	}
  
	moveTo(place, element, destination) {
	  element.classList.add(this.daClassname);
	  if (place === 'last' || place >= destination.children.length) {
		destination.append(element);
		return;
	  }
	  if (place === 'first') {
		destination.prepend(element);
		return;
	  }
	  destination.children[place].before(element);
	}
  
	moveBack(parent, element, index) {
	  element.classList.remove(this.daClassname);
	  if (parent.children[index] !== undefined) {
		parent.children[index].before(element);
	  } else {
		parent.append(element);
	  }
	}
  
	indexInParent(parent, element) {
	  return [...parent.children].indexOf(element);
	}
  
	arraySort(arr) {
	  if (this.type === 'min') {
		arr.sort((a, b) => {
		  if (a.breakpoint === b.breakpoint) {
			if (a.place === b.place) {
			  return 0;
			}
			if (a.place === 'first' || b.place === 'last') {
			  return -1;
			}
			if (a.place === 'last' || b.place === 'first') {
			  return 1;
			}
			return a.place - b.place;
		  }
		  return a.breakpoint - b.breakpoint;
		});
	  } else {
		arr.sort((a, b) => {
		  if (a.breakpoint === b.breakpoint) {
			if (a.place === b.place) {
			  return 0;
			}
			if (a.place === 'first' || b.place === 'last') {
			  return 1;
			}
			if (a.place === 'last' || b.place === 'first') {
			  return -1;
			}
			return b.place - a.place;
		  }
		  return b.breakpoint - a.breakpoint;
		});
		return;
	  }
	}
}
;

class App {
	constructor() {
		this.utils = new Utils();
		this.dynamicAdapt = new DynamicAdapt('max');
	}

	init() {


		window.addEventListener('DOMContentLoaded', () => {
			if (this.utils.isMobile()) {
				document.body.classList.add('mobile');
			}

			if (this.utils.iOS()) {
				document.body.classList.add('mobile-ios');
			}

			this.dynamicAdapt.init();
			this.headerHandler();
			this.popupHandler();
			this.initSmoothScroll();
			this.inputMaskInit();
			this.tabsInit();
			this.selectInit();
			this.spollerInit();
			this.setFontSize();
			this.componentsScriptsBeforePageLoad();
		});




		window.addEventListener('load', () => {
			document.body.classList.add('page-is-load');
			this.setPaddingTopHeaderSize();
			this.slidersInit();
			this.componentsScripts();
		});

	}

	headerHandler() {
		let header = document.querySelector('[data-header]');
let vehicleFinder = document.querySelector('[data-vehicle-finder]');
let burger = document.querySelector('[data-burger]');
let mobileMenu = document.querySelector('[data-mobile-menu]');

if (header) {
    window.addEventListener('scroll', () => {
        header.classList.toggle('header--is-scroll', window.pageYOffset > 50);
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
;
	}

	popupHandler() {
		// ==== Popup form handler====

const popupLinks = document.querySelectorAll('[data-popup="open-popup"]');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('[data-popup="lock-padding"]');

let unlock = true;

const timeout = 800;

if(popupLinks.length > 0) {
	for (let index = 0; index < popupLinks.length; index++) {
		const popupLink = popupLinks[index];
		popupLink.addEventListener('click', function(e) {
			const popupName = popupLink.getAttribute('href').replace('#', '');
			const curentPopup = document.getElementById(popupName);
			popupOpen(curentPopup);
			e.preventDefault();
		});
	}
}


const popupCloseIcon = document.querySelectorAll('[data-popup="close-popup"]');
if(popupCloseIcon.length > 0) {
	for(let index = 0; index < popupCloseIcon.length; index++) {
		const el = popupCloseIcon[index];
		el.addEventListener('click', function(e) {
			popupClose(el.closest('.popup'));
			e.preventDefault();
		});
	}
}

function popupOpen(curentPopup) {
	if(curentPopup && unlock) {
		const popupActive = document.querySelector('.popup.popup--open');
		if (popupActive) {
			popupClose(popupActive, false);
		} else {
			bodyLock();
		}
		curentPopup.classList.add('popup--open');
		curentPopup.addEventListener('click', function(e) {
			if(!e.target.closest('.popup__content')) {
				popupClose(e.target.closest('.popup')); 
			}
		});

	}
}

function popupClose(popupActive, doUnlock = true) {
	if(unlock) {
		popupActive.classList.remove('popup--open');
		if(doUnlock) {
			bodyUnlock();
		}
	}
}

function bodyLock() {
	const lockPaddingValue = window.innerWidth - document.querySelector('body').offsetWidth + 'px';
	let targetPadding = document.querySelectorAll('[data-popup="add-right-padding"]');
	if(targetPadding.length) {
		for (let index = 0; index < targetPadding.length; index++) {
			const el = targetPadding[index];
			el.style.paddingRight = lockPaddingValue;
		}
	}

	if(lockPadding.length > 0) {
		for (let index = 0; index < lockPadding.length; index++) {
			const el = lockPadding[index];
			el.style.paddingRight = lockPaddingValue;
		}
	}

	body.style.paddingRight = lockPaddingValue;
	body.classList.add('overflow-hidden');

	unlock = false;
	setTimeout(function() {
		unlock = true;
	}, timeout);
}

function bodyUnlock() {
	let targetPadding = document.querySelectorAll('[data-popup="add-right-padding"]');

	setTimeout(function() {
		if(targetPadding.length) {
			for (let index = 0; index < targetPadding.length; index++) {
				const el = targetPadding[index];
				el.style.paddingRight = '0px';
			}
		}

		for( let index = 0; index < lockPadding.length; index++) {
			const el = lockPadding[index];
			el.style.paddingRight = '0px';
		}

		body.style.paddingRight = '0px';
		body.classList.remove('overflow-hidden');
	}, timeout);

	unlock = false;
	setTimeout(function() { 
		unlock = true;
	}, timeout);
}

document.addEventListener('keydown', function(e) {
	if(e.which === 27) {
		const popupActive = document.querySelector('.popup.popup--open');
		popupClose(popupActive);
	}
});

// === Polyfill ===
	(function() {
		if(!Element.prototype.closest) {
			Element.prototype.closest = function(css) {
				var node = this;
				while(node) {
					if(node.matches(css)) return node;
					else node == node.parentElement;
				}
				return null;
			};
		}
	})();

	(function() {
		if(!Element.prototype.matches) {
			Element.prototype.matches = Element.prototype.matchesSelector ||
				Element.prototype.webkitMatchesSelector ||
				Element.prototype.mozMatchesSelector ||
				Element.prototype.mozMatchesSelector;
		}
	})();
// === AND Polyfill ===

// добавление API попапа в глобалную видимость
window.popup = {
	open(id) {
		if (!id) return;

		let popup = document.querySelector(id);

		if (!popup) return;

		popupOpen(popup);
	},
	close(id) {
		if (!id) return;

		let popup = document.querySelector(id);

		if (!popup) return;

		popupClose(popup);
	}
}
;
	}

	slidersInit() {
		{
    let carousels = document.querySelectorAll('[data-carousel]');
    if(carousels.length) {
        carousels.forEach(carousel => {
            let carouselSwiper = new Swiper(carousel.querySelector('.swiper'), {
                speed: 800,
                navigation: {
                    nextEl: carousel.querySelector('[data-action="btn-next"]'),
                    prevEl: carousel.querySelector('[data-action="btn-prev"]'),
                },
                breakpoints: {
                    320: {
                        slidesPerView: 2,
                        spaceBetween: 15,
                        autoHeight: true,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                    992: {
                        slidesPerView: 4,
                        spaceBetween: 25,
                    },
                },
            });
        })
    }
};
		let featuredVehiclesSliders = document.querySelectorAll('[data-slider="featured-vehicles-slider"]');
if (featuredVehiclesSliders.length) {
    featuredVehiclesSliders.forEach(featuredVehiclesSlider => {
        let sliderData = new Swiper(featuredVehiclesSlider, {
            observer: true,
            observeParents: true,
            observeSlideChildren: true,
            slidesPerView: 'auto',
            spaceBetween: 0,
            speed: 600,
            freeMode: true,
            loop: true,
            watchOverflow: true,
            preloadImages: false,
            watchSlidesProgress: true,
            lazy: {
                loadPrevNext: true,
            },
            watchSlidesVisibility: true,
            navigation: {
                nextEl: featuredVehiclesSlider.querySelector('.featured-vehicles__btn-next'),
                prevEl: featuredVehiclesSlider.querySelector('.featured-vehicles__btn-prev'),
            }
        });
    })
}

;
		let lastReviewsSlider = document.querySelector('[data-slider="last-reviews"]');
if(lastReviewsSlider) {
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
        loop: true,
        breakpoints: {
            0: {
                slidesPerView: 1,
                spaceBetween: 20,
                autoHeight: true
            },
            768: {
                slidesPerView: 2,
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
    
};
	}


	tabsInit() {
		let tabsContainers = document.querySelectorAll('[data-tabs]');
		if (tabsContainers.length) {
			tabsContainers.forEach(tabsContainer => {
				let triggerItems = tabsContainer.querySelectorAll('[data-tab-trigger]');
				let contentItems = Array.from(tabsContainer.querySelectorAll('[data-tab-content]'));
				let select = tabsContainer.querySelector('[data-tab-select]');

				const getContentItem = (id) => {
					if (!id.trim()) return;
					return contentItems.filter(item => item.dataset.tabContent === id)[0];
				}

				if (triggerItems.length && contentItems.length) {
					// init
					let activeItem = tabsContainer.querySelector('.tab-active[data-tab-trigger]');
					if (activeItem) {
						activeItem.classList.add('tab-active');
						getContentItem(activeItem.dataset.tabTrigger).classList.add('tab-active');
					} else {
						triggerItems[0].classList.add('tab-active');
						getContentItem(triggerItems[0].dataset.tabTrigger).classList.add('tab-active');
					}

					triggerItems.forEach(item => {
						item.addEventListener('click', (e) => {
							e.preventDefault();
							item.classList.add('tab-active');
							getContentItem(item.dataset.tabTrigger).classList.add('tab-active');

							triggerItems.forEach(i => {
								if (i === item) return;

								i.classList.remove('tab-active');
								getContentItem(i.dataset.tabTrigger).classList.remove('tab-active');
							})

						})
					})
				}

				if (select) {
					select.addEventListener('change', (e) => {
						getContentItem(e.target.value).classList.add('tab-active');

						contentItems.forEach(item => {
							if (getContentItem(e.target.value) === item) return;

							item.classList.remove('tab-active');
						})
					})
				}
			})
		}
	}

	spollerInit() {
		let spollers = document.querySelectorAll('[data-spoller]');
		if (spollers.length) {
			spollers.forEach(spoller => {
				if(spoller.hasAttribute('data-spoller-mob') && document.documentElement.clientWidth > 767.98) return;

				let isOneActiveItem = spoller.dataset.spoller.trim() === 'one' ? true : false;
				let triggers = spoller.querySelectorAll('[data-spoller-trigger]');
				if (triggers.length) {
					triggers.forEach(trigger => {

						let parent = trigger.parentElement;
						let content = trigger.nextElementSibling;

						// init
						if (trigger.classList.contains('active')) {
							content.style.display = 'block';
							parent.classList.add('active');
						}

						trigger.addEventListener('click', (e) => {
							if(spoller.hasAttribute('data-spoller-mob') && document.documentElement.clientWidth > 767.98) return;
							e.preventDefault();
							parent.classList.toggle('active');
							trigger.classList.toggle('active');
							content && this.utils.slideToggle(content);

							if (isOneActiveItem) {
								triggers.forEach(i => {
									if (i === trigger) return;

									let parent = i.parentElement;
									let content = i.nextElementSibling;

									parent.classList.remove('active');
									i.classList.remove('active');
									content && this.utils.slideUp(content);
								})
							}
						})
					})
				}
			})
		}
	}

	inputMaskInit() {
		let items = document.querySelectorAll('[data-mask]');
		if (items.length) {
			items.forEach(item => {
				let maskValue = item.dataset.mask;
				let input = item.querySelector('input[type="text"]');

				if (input) {
					Inputmask(maskValue, {
						//"placeholder": '',
						clearIncomplete: true,
						clearMaskOnLostFocus: true,
					}).mask(input);
				}
			})
		}

		let cuntryItems = document.querySelectorAll('[data-phone-location]');
		if(cuntryItems.length) {
			cuntryItems.forEach(cuntryItem => {
				let input = cuntryItem.querySelector('input[type="text"]');
				intlTelInput(input, {
					separateDialCode: true,
				});
			})
		}
	}

	setPaddingTopHeaderSize() {
		let wrapper = document.querySelector('[data-padding-top-header-size]');
		if (wrapper) {
			let header = document.querySelector('[data-header]');
			if (header) {
				const setPedding = () => wrapper.style.paddingTop = header.clientHeight + 'px';
				setPedding();
				let id = setInterval(setPedding, 200);
				setTimeout(() => {
					clearInterval(id);
				}, 2000)
				window.addEventListener('resize', setPedding);
			}

		}
	}


	initSmoothScroll() {
		let anchors = document.querySelectorAll('a[href*="#"]:not([data-popup="open-popup"])');
		if (anchors.length) {
			let header = document.querySelector('.header');

			anchors.forEach(anchor => {
				if (!anchor.getAttribute('href').match(/#\w+$/gi)) return;

				let id = anchor.getAttribute('href').match(/#\w+$/gi).join('').replace('#', '');

				anchor.addEventListener('click', (e) => {
					let el = document.querySelector(`#${id}`);

					if (el) {
						e.preventDefault();
						let top = Math.abs(document.body.getBoundingClientRect().top) + el.getBoundingClientRect().top;

						if (header) {
							top = top - header.clientHeight;
						}

						window.scrollTo({
							top: top,
							behavior: 'smooth',
						})
					} else {
						e.preventDefault();
						window.scrollTo({
							top: 0,
							behavior: 'smooth',
						})
					}
				})

			})
		}

	}

	selectInit() {
		{
    function _slideUp(target, duration = 500) {
        target.style.transitionProperty = 'height, margin, padding';
        target.style.transitionDuration = duration + 'ms';
        target.style.height = target.offsetHeight + 'px';
        target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = 0;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        window.setTimeout(() => {
            target.style.display = 'none';
            target.style.removeProperty('height');
            target.style.removeProperty('padding-top');
            target.style.removeProperty('padding-bottom');
            target.style.removeProperty('margin-top');
            target.style.removeProperty('margin-bottom');
            target.style.removeProperty('overflow');
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
            target.classList.remove('_slide');
        }, duration);
    }
    function _slideDown(target, duration = 500) {
        target.style.removeProperty('display');
        let display = window.getComputedStyle(target).display;
        if (display === 'none')
            display = 'block';
    
        target.style.display = display;
        let height = target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = 0;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        target.offsetHeight;
        target.style.transitionProperty = "height, margin, padding";
        target.style.transitionDuration = duration + 'ms';
        target.style.height = height + 'px';
        target.style.removeProperty('padding-top');
        target.style.removeProperty('padding-bottom');
        target.style.removeProperty('margin-top');
        target.style.removeProperty('margin-bottom');
        window.setTimeout(() => {
            target.style.removeProperty('height');
            target.style.removeProperty('overflow');
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
            target.classList.remove('_slide');
        }, duration);
    }
    function _slideToggle(target, duration = 500) {
        if (!target.classList.contains('_slide')) {
            target.classList.add('_slide');
            if (window.getComputedStyle(target).display === 'none') {
                return _slideDown(target, duration);
            } else {
                return _slideUp(target, duration);
            }
        }
    }

    //Select
    let selects = document.getElementsByTagName('select');
    if (selects.length > 0) {
        selects_init();
    }
    function selects_init() {
        for (let index = 0; index < selects.length; index++) {
            const select = selects[index];
            select_init(select);
        }
        //select_callback();
        document.addEventListener('click', function (e) {
            selects_close(e);
        });
        document.addEventListener('keydown', function (e) {
            if (e.which == 27) {
                selects_close(e);
            }
        });
    }
    function selects_close(e) {
        const selects = document.querySelectorAll('.select');
        if (!e.target.closest('.select')) {
            for (let index = 0; index < selects.length; index++) {
                const select = selects[index];
                const select_body_options = select.querySelector('.select__options');
                select.classList.remove('_active');
                _slideUp(select_body_options, 0);
            }
        }
    }
    function select_init(select) {
        const select_parent = select.parentElement;
        const select_modifikator = select.getAttribute('class');
        const select_selected_option = select.querySelector('option:checked');
        select.setAttribute('data-default', select_selected_option.value);
        select.style.display = 'none';

        select_parent.insertAdjacentHTML('beforeend', '<div class="select select_' + select_modifikator + '"></div>');

        let new_select = select.parentElement.querySelector('.select');
        new_select.appendChild(select);
        select_item(select);
    }
    function select_item(select) {
        const select_parent = select.parentElement;
        const select_items = select_parent.querySelector('.select__item');
        const select_options = select.querySelectorAll('option');
        const select_selected_option = select.querySelector('option:checked');
        const select_selected_text = select_selected_option.innerHTML;
        const select_type = select.getAttribute('data-type');
        const label = '<span class="select__label">Price:</span>';

        if (select_items) {
            select_items.remove();
        }

        let select_type_content = '';
        if (select_type == 'input') {
            select_type_content = '<div class="select__value icon-select-arrow"><input autocomplete="off" type="text" name="form[]" value="' + select_selected_text + '" data-error="Ошибка" data-value="' + select_selected_text + '" class="select__input"></div>';
        } else {
            select_type_content = '<div class="select__value icon-select-arrow"><span>' + select_selected_text + '</span></div>';
        }

   
        select_parent.insertAdjacentHTML('beforeend',
            '<div class="select__item">' +
            `<div class="select__title">${(select.dataset.select === 'price') ? label : ''}` + select_type_content + '</div>' +
            '<div class="select__options"><div class="select__inner">' + select_get_options(select_options) + '</div></div>' +
            '</div></div>');

        select_actions(select, select_parent);
    }
    function select_actions(original, select) {
        const select_item = select.querySelector('.select__item');
        const select_body_options = select.querySelector('.select__options');
        const select_options = select.querySelectorAll('.select__option');
        const select_type = original.getAttribute('data-type');
        const select_input = select.querySelector('.select__input');

        select_item.addEventListener('click', function () {
            let selects = document.querySelectorAll('.select');
            for (let index = 0; index < selects.length; index++) {
                const select = selects[index];
                const select_body_options = select.querySelector('.select__options');
                if (select != select_item.closest('.select')) {
                    select.classList.remove('_active');
                    _slideUp(select_body_options, 0);
                }
            }
            _slideToggle(select_body_options, 0);
            select.classList.toggle('_active');
        });

        for (let index = 0; index < select_options.length; index++) {
            const select_option = select_options[index];
            const select_option_value = select_option.getAttribute('data-value');
            const select_option_text = select_option.innerHTML;

            if (select_type == 'input') {
                select_input.addEventListener('keyup', select_search);
            } else {
                if (select_option.getAttribute('data-value') == original.value) {
                    select_option.style.display = 'none';
                }
            }
            select_option.addEventListener('click', function () {
                for (let index = 0; index < select_options.length; index++) {
                    const el = select_options[index];
                    el.style.display = 'block';
                }
                if (select_type == 'input') {
                    select_input.value = select_option_text;
                    original.value = select_option_value;
                } else {
                    select.querySelector('.select__value').innerHTML = '<span>' + select_option_text + '</span>';
                    original.value = select_option_value;
                    select_option.style.display = 'none';

                    let event = new Event("change", { bubbles: true });
                    original.dispatchEvent(event);
                }
            });
        }
    }
    function select_get_options(select_options) {
        if (select_options) {
            let select_options_content = '';
            for (let index = 0; index < select_options.length; index++) {
                const select_option = select_options[index];
                const select_option_value = select_option.value;
                if (select_option_value != '') {
                    const select_option_text = select_option.text;
                    select_options_content = select_options_content + '<div data-value="' + select_option_value + '" class="select__option">' + select_option_text + '</div>';
                }
            }
            return select_options_content;
        }
    }
    function select_search(e) {
        let select_block = e.target.closest('.select ').querySelector('.select__options');
        let select_options = e.target.closest('.select ').querySelectorAll('.select__option');
        let select_search_text = e.target.value.toUpperCase();

        for (let i = 0; i < select_options.length; i++) {
            let select_option = select_options[i];
            let select_txt_value = select_option.textContent || select_option.innerText;
            if (select_txt_value.toUpperCase().indexOf(select_search_text) > -1) {
                select_option.style.display = "";
            } else {
                select_option.style.display = "none";
            }
        }
    }
    function selects_update_all() {
        let selects = document.querySelectorAll('select');
        if (selects) {
            for (let index = 0; index < selects.length; index++) {
                const select = selects[index];
                select_item(select);
            }
        }
    }

};
	}

	setFontSize() {
		let elements = document.querySelectorAll('[data-set-font-size]');
		if (elements.length) {
			elements.forEach(el => {
				const setFontSize = () => {
					if (document.documentElement.clientWidth > 992) {
						let value = 10 / 1920 * el.clientWidth;
						if (value > 14) value = 10;
						el.style.fontSize = value + 'px';
					}
				}

				setFontSize();

				window.addEventListener('resize', setFontSize);
			})
		}
	}

	componentsScriptsBeforePageLoad() {
		let aboutPreview = document.querySelector('[data-about-preview]');
if(aboutPreview) {
    let textContainer = aboutPreview.querySelector('.about-preview__text');
    let textLine = aboutPreview.querySelector('.text-collapse-line');
    let btnReadMore = aboutPreview.querySelector('.about-preview__read-more');

    if(textContainer && textLine && btnReadMore) {
        let textElements = Array.from(textContainer.children);
        let index = textElements.findIndex(item => item.classList.contains('text-collapse-line'));
        let collapseElements = textElements.slice(index + 1);

        let collapseContainer = document.createElement('div');
        collapseContainer.className = 'text-collapse';
        collapseContainer.append(...collapseElements);

        textLine.after(collapseContainer);

        btnReadMore.addEventListener('click', (e) => {
            e.preventDefault();
    
            btnReadMore.classList.toggle('text-is-show');
    
            this.utils.slideToggle(collapseContainer);
        })
    }
}

;
		{
    let ratings = document.querySelectorAll('[data-rating]');
    if(ratings.length) {
        ratings.forEach(rating => {
            let count = rating.dataset.rating > 5 ? 5
                        : rating.dataset.rating ? rating.dataset.rating
                        : 0;
                        
            let starsLine = rating.querySelector('.rating__stars-1');

            starsLine.style.width = `calc(${count / 5 * 100}% - ${0.4}rem)`;
        })
    }
};
		let timeFilter = document.querySelector('[data-time-filter]');
if(timeFilter) {

    let columns = timeFilter.querySelectorAll('.time-filter__dropdown-col');
    let top = timeFilter.querySelector('.time-filter__top');
    let inputStart = timeFilter.querySelector('[data-time-filter-start]');
    let inputEnd = timeFilter.querySelector('[data-time-filter-end]');
    let startValue = timeFilter.querySelector('.time-filter__start-value');
    let endValue = timeFilter.querySelector('.time-filter__end-value');

    if(top) {
        document.addEventListener('click', (e) => {
            if(e.target.closest('.time-filter__top')) {
                timeFilter.classList.toggle('active');
            } else {
                if(!e.target.closest('.time-filter')) {
                    timeFilter.classList.remove('active');
                }
            }
        })
    }

    if(columns.length) {
        columns.forEach(column => {
            let scrollWrap = column.querySelector('.time-filter__dropdown-scroll-wrap');
            let items = column.querySelectorAll('.time-filter__dropdown-item');

            if(scrollWrap.scrollTop > 10) {
                column.classList.add('scroll-top');
            }

            if((scrollWrap.scrollHeight - (scrollWrap.scrollTop + scrollWrap.clientHeight)) > 10) {
                column.classList.add('scroll-bottom');
            }

            scrollWrap.addEventListener('scroll', () => {
                if(scrollWrap.scrollTop > 10) {
                    column.classList.add('scroll-top');
                } else {
                    column.classList.remove('scroll-top');
                }
    
                if((scrollWrap.scrollHeight - (scrollWrap.scrollTop + scrollWrap.clientHeight)) > 10) {
                    column.classList.add('scroll-bottom');
                } else {
                    column.classList.remove('scroll-bottom');
                }
            })

            if(items.length) {
                items.forEach(item => {
                    item.addEventListener('click', () => {
                        item.classList.add('active');

                        items.forEach(i => {
                            if(i === item) return;

                            i.classList.remove('active');
                        })

                        if(item.closest('.start-value')) {
                            inputStart.value = item.innerText.trim();
                            startValue.innerText = item.innerText.trim();
                        }

                        if(item.closest('.end-value')) {
                            inputEnd.value = item.innerText.trim();
                            endValue.innerText = item.innerText.trim();
                        }
                    })
                })
            }
        })
    }
};
	}

	componentsScripts() {
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
};
	}

}

let app = new App();
app.init();

