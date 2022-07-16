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

	replaceToInlineSvg(query) {
		let map = new Map();
		const images = document.querySelectorAll(query);
	
		const forEach = (i) => {
			if(i < 0) {
				return
			} else {
				let svg = map.get(images[i].src);
				if (svg) {
					images[i].parentNode.replaceChild(svg.cloneNode(true), images[i]);
					forEach(i - 1)
	
				} else {
					let xhr = new XMLHttpRequest();
					xhr.open('GET', images[i].src);
		
					xhr.onload = () => {
						if (xhr.readyState === xhr.DONE) {
							if (xhr.status === 200) {

								let svg = xhr.responseXML.documentElement;
								images[i].parentNode.replaceChild(svg, images[i]);
								map.set(images[i].src, svg);
								forEach(i - 1)

							} else {
								forEach(i - 1)
							}
						}
					}
					xhr.send(null);
				}
				
			}
		}
	
		forEach(images.length -1);
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
		this.scrollAnimation = null;
		this.allRangeSliders = [];
	}

	init() {


		window.addEventListener('DOMContentLoaded', () => {
			if (this.utils.isMobile()) {
				document.body.classList.add('mobile');
			}

			if (this.utils.iOS()) {
				document.body.classList.add('mobile-ios');
			}
			this.utils.replaceToInlineSvg('.img-svg');
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
			this.initCopy();
			this.initDatepicker();
			this.initSetGrid();
			this.initTooltipe();
		});




		window.addEventListener('load', () => {
			document.body.classList.add('page-is-load');
			this.setPaddingTopHeaderSize();
			this.slidersInit();
			this.componentsScripts();
			this.initScrollAnimation();
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
	},
	openMessage(id) {
		if (!id) return;

		let popup = document.querySelector(id);

		if (!popup) return;

		popupOpen(popup);

		setTimeout(() => {
			popupClose(popup);
		}, 3000);
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
		let topFilter = document.querySelector('[data-slider="search-top-filter"]');
if(topFilter) {
    let slider = topFilter.querySelector('.swiper');
    let sliderData = new Swiper(slider, {
        observer: true,
        observeParents: true,
        slidesPerView: 'auto',
        spaceBetween: 0,
        speed: 600,
        freeMode: true,
        slidesPerGroup: 2,
        watchOverflow: true,
        watchSlidesProgress: true,
        watchSlidesVisibility: true,
        navigation: {
            nextEl: topFilter.querySelector('.slider-btn.btn-next'),
            prevEl: topFilter.querySelector('.slider-btn.btn-prev'),
        }
    });
    
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
				if (spoller.hasAttribute('data-spoller-mob') && document.documentElement.clientWidth > 767.98) return;

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
							if (spoller.hasAttribute('data-spoller-mob') && document.documentElement.clientWidth > 767.98) return;
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
		if (cuntryItems.length) {
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
					if (document.documentElement.clientWidth > 991.98) {
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

	initCopy() {
		let copyElements = document.querySelectorAll('[data-copy]');
		if (copyElements.length) {
			copyElements.forEach(copyEl => {
				copyEl.addEventListener('click', (e) => {
					e.preventDefault();
					navigator.clipboard.writeText(copyEl.innerText);
					copyEl.classList.add('copied');

					setTimeout(() => {
						copyEl.classList.remove('copied');
					}, 1000)
				})
			})
		}
	}

	initScrollAnimation() {
		const handler = (el, scrollBox) => {
			if (scrollBox.scrollTop > 10) {
				el.classList.add('scroll-top');
			} else {
				el.classList.remove('scroll-top');
			}

			if ((scrollBox.scrollHeight - (scrollBox.scrollTop + scrollBox.clientHeight)) > 10) {
				el.classList.add('scroll-bottom');
			} else {
				el.classList.remove('scroll-bottom');
			}
		}

		let elements = document.querySelectorAll('[data-scroll-animation]');

		if (elements.length) {
			elements.forEach(el => {
				let scrollBox = el.firstElementChild;

				// init 
				handler(el, scrollBox);

				scrollBox.addEventListener('scroll', () => handler(el, scrollBox));
			})

			this.scrollAnimation = {
				update() {
					elements.forEach(el => {
						let scrollBox = el.firstElementChild;
						handler(el, scrollBox);
					})
				}
			}
		}
	}

	initDatepicker() {
		let elements = document.querySelectorAll('[data-datepicker]');
		if (elements.length) {
			elements.forEach(el => {
				let input = el.querySelector('input');
				let picker = datepicker(input, {
					formatter: (input, date, instance) => {
						const value = date.toLocaleDateString()
						input.value = value
					},
				})
			})
		}
	}

	initSetGrid() {
		let setGridElement = document.querySelector('[data-set-grid]');
		if (setGridElement) {
			let items = Array.from(setGridElement.children);

			const checkHeight = (pushEl, container) => {
				let containerItems = Array.from(container.children);
				let containerItemsHeight = containerItems.reduce((previousValue, item) => {
					return item.clientHeight + previousValue + 70;
				}, 0);
				if ((pushEl.clientHeight + 70) < (container.clientHeight - containerItemsHeight)) {
					return true;
				} else {
					return false;
				}
			}
			const setGrid = () => {
				if (document.documentElement.clientWidth > 991.98) {
					if (setGridElement.classList.contains('_grid')) {
						setGridElement.classList.remove('_grid');
						setGridElement.append(...items);
						setGridElement.querySelectorAll('.column').forEach(column => {
							column.remove();
						})
					}
					return
				}
				if (document.documentElement.clientWidth < 768) {
					if (setGridElement.classList.contains('_grid')) {
						setGridElement.classList.remove('_grid');
						setGridElement.append(...items);
						setGridElement.querySelectorAll('.column').forEach(column => {
							column.remove();
						})
					}
					return
				}
				if (!setGridElement.classList.contains('_grid')) {
					if (items.length > 2) {
						setGridElement.classList.add('_grid');
						let col1 = document.createElement('div');
						let col2 = document.createElement('div');
						col1.className = 'column';
						col2.className = 'column';
						setGridElement.prepend(col2);
						setGridElement.prepend(col1);
						col1.append(items[0]);
						col2.append(items[1]);
						col2.append(items[2]);
						let remainingItems = items.slice(2);

						remainingItems.forEach(item => {
							if (checkHeight(item, col2)) {
								col2.append(item);
							} else {
								col1.append(item);
							}
						})
					}
				}

			}

			setGrid();

			window.addEventListener('resize', setGrid);
		}
	}

	initTooltipe() {
		let tooltips = document.querySelectorAll('[data-tooltip]');
		if (tooltips.length) {
			tooltips.forEach(tooltip => {
				let icon = document.createElement('div');
				icon.className = 'tooltip-icon';
				icon.innerHTML = `
				<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path fill-rule="evenodd" clip-rule="evenodd" d="M0 7.00004C0 3.14024 3.1402 0 7 0C10.8598 0 14 3.14024 14 7.00004C14 10.8598 10.8598 14 7 14C3.1402 14 0 10.8598 0 7.00004ZM1.27273 7.00004C1.27273 10.1581 3.84194 12.7273 7 12.7273C10.158 12.7273 12.7273 10.1581 12.7273 7.00004C12.7273 3.84202 10.1581 1.27273 7 1.27273C3.84194 1.27273 1.27273 3.84202 1.27273 7.00004ZM6.99992 2.9697C6.53215 2.9697 6.1516 3.3505 6.1516 3.81856C6.1516 4.28621 6.53215 4.66667 6.99992 4.66667C7.46768 4.66667 7.84823 4.28621 7.84823 3.81856C7.84823 3.3505 7.46768 2.9697 6.99992 2.9697ZM6.36364 6.57576C6.36364 6.22432 6.64856 5.93939 7 5.93939C7.35144 5.93939 7.63636 6.22432 7.63636 6.57576V10.3939C7.63636 10.7454 7.35144 11.0303 7 11.0303C6.64856 11.0303 6.36364 10.7454 6.36364 10.3939V6.57576Z" fill="#8C8C8C"/>
				</svg>`

				tooltip.append(icon);

				tippy(icon, {
					content: tooltip.dataset.tooltip,
				});
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
		let mainFilter = document.querySelector('[data-main-filter]');
if (mainFilter) {
    let filterSelects = mainFilter.querySelectorAll('.filter-select');
    if (filterSelects.length) {
        filterSelects.forEach(filterSelect => {
            let head = filterSelect.querySelector('.filter-select__head');
            let collapseBox = filterSelect.querySelector('.filter-select__collapse-box');
            let radioInputs = filterSelect.querySelectorAll('input[type="radio"]');
            let inputSearch = filterSelect.querySelector('.filter-select__search input');

            head.addEventListener('click', () => {
                filterSelect.classList.toggle('filter-select--open');
                this.utils.slideToggle(collapseBox, 300);
                this.scrollAnimation.update();

                filterSelects.forEach(i => {
                    if (i === filterSelect) return;

                    let collapseBox = i.querySelector('.filter-select__collapse-box');

                    i.classList.remove('filter-select--open');
                    this.utils.slideUp(collapseBox, 300);
                })
            })

            if (radioInputs.length) {
                radioInputs.forEach(radio => {
                    let textEl = radio.closest('.checkbox-radio').querySelector('.checkbox-radio__text');
                    // init
                    if (radio.checked) {
                        filterSelect.classList.add('filter-select--selected');
                        head.innerText = textEl.innerText;
                    }

                    radio.addEventListener('change', () => {
                        if (radio.checked) {
                            filterSelect.classList.add('filter-select--selected');
                            head.innerText = textEl.innerText;
                        }
                    })
                })
            }

            if (inputSearch && radioInputs) {
                const getFilterItems = (radioInputs) => {
                    return Array.from(radioInputs).map(input => {
                        return {
                            parent: input.closest('.filter-select__item'),
                            text: input.closest('.checkbox-radio').querySelector('.checkbox-radio__text').innerText
                        }
                    })
                }

                const applySearch = (allFilterItems, value) => {
                    let regExp = new RegExp(value, 'ig');

                    if(value.length > 0) {
                        allFilterItems.forEach(item => {
                            if(regExp.test(item.text)) {
                                item.parent.style.display = 'block';
                            } else {
                                item.parent.style.display = 'none';
                            }
                        })
                    } else {
                        allFilterItems.forEach(item => {
                            item.parent.style.display = 'block';
                        })
                    }
                }

                let allFilterItems = getFilterItems(radioInputs);

                inputSearch.addEventListener('input', (e) => {
                    applySearch(allFilterItems, e.target.value.trim());
                    this.scrollAnimation.update();
                })

            }
        })

        document.addEventListener('click', (e) => {
            if (!e.target.closest('.filter-select')) {
                filterSelects.forEach(filterSelect => {
                    let collapseBox = filterSelect.querySelector('.filter-select__collapse-box');
                    filterSelect.classList.remove('filter-select--open');
                    this.utils.slideUp(collapseBox, 300);
                })
            }
        })
    }

    let btnOptions = mainFilter.querySelector('.main-filter__advanced');
    if(btnOptions) {
        let hideRows = mainFilter.querySelectorAll('.main-filter__row--hide');
        let btnText = btnOptions.innerText;
        let img = btnOptions.querySelector('img');

        if(hideRows.length) {
            btnOptions.addEventListener('click', () => {
                if(mainFilter.classList.contains('show-hide-rows')) {
                    hideRows.forEach(row => {
                        row.classList.remove('show');
                    })
                    mainFilter.classList.remove('show-hide-rows')
                    btnOptions.innerText = btnText;
                    btnOptions.prepend(img);
                } else {
                    hideRows.forEach(row => {
                        row.classList.add('show');
                    })
                    mainFilter.classList.add('show-hide-rows')
                    btnOptions.innerText = btnOptions.dataset.text;
                    btnOptions.prepend(img);
                }

            })
        }
    }

    let btnReset = mainFilter.querySelector('.main-filter__reset');
    if(btnReset) {
        let form = btnReset.closest('form');


        form.addEventListener('reset', () => {
            if(filterSelects.length) {
                filterSelects.forEach(filterSelect => {
                    let head = filterSelect.querySelector('.filter-select__head');
                    filterSelect.classList.remove('filter-select--selected');
                    head.innerText = 'Select';
                })
            }

            if(this.allRangeSliders.length) {
                this.allRangeSliders.forEach(rangeSlider => {
                    rangeSlider.slider.noUiSlider.set([+rangeSlider.min, +rangeSlider.max]);
                })
            }
        })
    }

    let btnOpenMobileFilter = document.querySelector('.main-search__btn-filter');
    if(btnOpenMobileFilter) {
        console.log(btnOpenMobileFilter);
        let mainMobileFilter = document.querySelector('[data-main-filter-mobile]');
        if(mainMobileFilter) {

            btnOpenMobileFilter.addEventListener('click', () => {
                console.log('test');
                mainMobileFilter.classList.add('main-filter-mobile--open');
                document.body.classList.add('overflow-hidden');
            })

            mainMobileFilter.addEventListener('click', (e) => {
                if(e.target.closest('.main-filter-mobile__body')) return;
                mainMobileFilter.classList.remove('main-filter-mobile--open');
                document.body.classList.remove('overflow-hidden');
            })
        }
    }
};
		{
    let rangeAll = document.querySelectorAll('[data-range]');
    if (rangeAll.length) {
        rangeAll.forEach(range => {
            let min = range.dataset.min;
            let max = range.dataset.max;
            let numStart = range.dataset.start;
            let numEnd = range.dataset.end;
            let step = range.dataset.step;
            let slider = range.querySelector('.price-range__slider');
            let inputStart = range.querySelector('.price-range__input--start');
            let inputEnd = range.querySelector('.price-range__input--end');
            let elStart = range.querySelector('.price-range__start-value');
            let elEnd = range.querySelector('.price-range__end-value');

            let qualityRange = range.dataset.range === 'quality' ? true : false;

            noUiSlider.create(slider, {
                start: [+numStart, +numEnd],
                connect: true,
                range: {
                    'min': [+min],
                    'max': [+max],
                },
                step: +step,
               // tooltips: true,
                format: wNumb({
                    decimals: qualityRange ? 1 : 0 
                })
            });

            this.allRangeSliders.push({slider, min, max});

            let numFormat = wNumb({ decimals: 0, prefix: '$' });

            slider.noUiSlider.on('update', function (values, handle) {
                let value = values[handle];
                if (handle) {
                    if(qualityRange) {
                        inputEnd.value = value;
                        elEnd.innerHTML = value;
                    } else {
                        inputEnd.value = Math.round(value);
                        elEnd.innerHTML = numFormat.to(+value);
                    }
                } else {
                    if(qualityRange) {
                        inputStart.value = value;
                        elStart.innerHTML = value;
                    } else {
                        inputStart.value = Math.round(value);
                        elStart.innerHTML = numFormat.to(+value);
                    }
                }
            });

            slider.noUiSlider.on('change', (values, handle) => {
                let value = values[handle];
                if (handle) {
                    let event = new Event("change", { bubbles: true });
                    inputEnd.dispatchEvent(event);
                } else {
                    let event = new Event("change", { bubbles: true });
                    inputStart.dispatchEvent(event);
                }

            })

            inputStart.addEventListener('change', function () {
                slider.noUiSlider.set([this.value, null]);
            });
            inputEnd.addEventListener('change', function () {
                slider.noUiSlider.set([null, this.value]);
            });
        })
    }

}
;
		{
    let timers = document.querySelectorAll('[data-timer]');
    if (timers.length) {

        timers.forEach(timer => {

            function countdown(container, dateEnd) {
                let timer, days, hours, minutes, seconds;
                let hoursEl = container.querySelector(".timer__hours");
                let minutesEl = container.querySelector(".timer__minutes");
                let secondsEl = container.querySelector(".timer__seconds");

                dateEnd = new Date(dateEnd);
                dateEnd = dateEnd.getTime();

                if (isNaN(dateEnd)) {
                    console.log('%c%s', 'color: red;', 'timer error, incorrect date format, use this option - (12/03/2020 02:00:00 AM)')
                    return;
                }
    
                timer = setInterval(calculate, 1000);
    
                function calculate() {
                    let dateStart = new Date();
                    dateStart = new Date(dateStart.getUTCFullYear(),
                        dateStart.getUTCMonth(),
                        dateStart.getUTCDate(),
                        dateStart.getUTCHours(),
                        dateStart.getUTCMinutes(),
                        dateStart.getUTCSeconds());
                    let timeRemaining = parseInt((dateEnd - dateStart.getTime()) / 1000)
    
                    if (timeRemaining >= 0) {
                        // days = parseInt(timeRemaining / 86400);
                        // timeRemaining = (timeRemaining % 86400);
                        hours = parseInt(timeRemaining / 3600);
                        timeRemaining = (timeRemaining % 3600);
                        minutes = parseInt(timeRemaining / 60);
                        timeRemaining = (timeRemaining % 60);
                        seconds = parseInt(timeRemaining);
    
    
                        //document.getElementById("days").innerHTML = parseInt(days, 10);
                        hoursEl.innerHTML = ("0" + hours).slice(-2);
                        minutesEl.innerHTML = ("0" + minutes).slice(-2);
                        secondsEl.innerHTML = ("0" + seconds).slice(-2);
                    } else {
                        return;
                    }
                }
    
                function display(days, hours, minutes, seconds) { }
            }
    
            countdown(timer ,timer.dataset.timer);
        })
    }
};
		let auctionHistory = document.querySelector('[data-auction-history]');
if(auctionHistory) {
    let head = auctionHistory.querySelector('.auction-history__head');
    let listWrap = auctionHistory.querySelector('.auction-history__list-wrap');

    head.addEventListener('click', () => {
        auctionHistory.classList.toggle('auction-history--open');
        this.utils.slideToggle(listWrap, 300);
    })
};
		let bigImgaeElements = document.querySelectorAll('[data-big-image]');
if(bigImgaeElements.length) {
    bigImgaeElements.forEach(bigImgaeEl => {
        const createPopup = () => {
            let popup = document.createElement('div');
            popup.className = 'big-image-popup';
            popup.insertAdjacentHTML('beforeend', `
            <div class="big-image-popup__close">
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M12.728 5.09117C12.9623 4.85685 12.9623 4.47696 12.728 4.24264C12.4937 4.00833 12.1138 4.00833 11.8795 4.24264L8.48535 7.63675L5.09124 4.24264C4.85692 4.00833 4.47703 4.00833 4.24271 4.24264C4.0084 4.47696 4.0084 4.85685 4.24271 5.09117L7.63682 8.48528L4.24271 11.8794C4.0084 12.1137 4.0084 12.4936 4.24271 12.7279C4.47703 12.9622 4.85692 12.9622 5.09124 12.7279L8.48535 9.33381L11.8795 12.7279C12.1138 12.9622 12.4937 12.9622 12.728 12.7279C12.9623 12.4936 12.9623 12.1137 12.728 11.8794L9.33388 8.48528L12.728 5.09117Z"
                    fill="#fff" />
            </svg>
            </div>
            <div class="big-image-popup__img">

                <img src="" alt="">
                <div class="swiper-lazy-preloader"></div>
            </div>
            `);
            document.body.append(popup);
            return popup;
        }

        let bigImagePopup = createPopup();
        let img = bigImagePopup.querySelector('img');
        let close = bigImagePopup.querySelector('.big-image-popup__close');

        bigImgaeEl.addEventListener('click', (e) => {
            e.preventDefault();

            if(!bigImagePopup.classList.contains('loaded')) {
                img.src = bigImgaeEl.href;
            }
            bigImagePopup.classList.add('big-image-popup--open');
            body.classList.add('overflow-hidden');
        })

        close.addEventListener('click', () => {
            bigImagePopup.classList.remove('big-image-popup--open');
            body.classList.remove('overflow-hidden');
        })

        img.onload = () => {
            bigImagePopup.classList.add('loaded');
        }
    })
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
		const setSize = (borderDashed, svg) => {
    let w = borderDashed.clientWidth;
    let h = borderDashed.clientHeight

    svg.setAttribute('viewBox', `0 0 ${w} ${h}`);

    if (borderDashed.dataset.borderDashed === 'top-right') {
        svg.innerHTML = `
        <path fill-rule="evenodd" clip-rule="evenodd"
        d="M2 28 Q 2 18  12 18 H${w - 18} L${w - 2} 2 L${w - 2} ${h - 12} Q ${w - 2} ${h - 8} ${w - 12} ${h - 2} L12 ${h - 2} Q 2 ${h - 8} 2 ${h - 12} z"
        stroke="#D4D9DB" stroke-width="3" stroke-linecap="round" stroke-dasharray="0.1 8" />
        `
    } else if (borderDashed.dataset.borderDashed === 'top-left') {

        if (document.documentElement.clientWidth < 992) {
            svg.innerHTML = `
            <path fill-rule="evenodd" clip-rule="evenodd"
            d="M12 2 H${w - 12} Q ${w - 2} 8 ${w - 2} 12 L ${w - 2} ${h - 12} Q ${w - 2} ${h - 8} ${w - 12} ${h - 2} L 12 ${h - 2} Q 2 ${h - 8} 2 ${h - 12} L 2 12 Q 8 2 12 2 z"
            stroke="#D4D9DB" stroke-width="3" stroke-linecap="round" stroke-dasharray="0.1 8" />
            `

            return;
        }

        svg.innerHTML = `
        <path fill-rule="evenodd" clip-rule="evenodd"
        d="M2 2 H${w - 12} Q ${w - 2} 8 ${w - 2} 12 L ${w - 2} ${h - 12} Q ${w - 2} ${h - 8} ${w - 12} ${h - 2} L 18 ${h - 2} Q 10 ${h - 8} 10 ${h - 12} L 10 12 z"
        stroke="#D4D9DB" stroke-width="3" stroke-linecap="round" stroke-dasharray="0.1 8" />
        `
    } else if (borderDashed.dataset.borderDashed === 'top-left-top') {

        svg.innerHTML = `
        <path fill-rule="evenodd" clip-rule="evenodd"
        d="M2 2 L 12 10 H${w - 12} Q ${w - 2} 15 ${w - 2} 20 L ${w - 2} ${h - 12} Q ${w - 8} ${h - 2} ${w - 12} ${h - 2} L 12 ${h - 2} Q 2 ${h - 8} 2 ${h - 12} z"
        stroke="#D4D9DB" stroke-width="3" stroke-linecap="round" stroke-dasharray="0.1 8" />
        `
    } else if (borderDashed.dataset.borderDashed === 'simple') {

        svg.innerHTML = `
        <path fill-rule="evenodd" clip-rule="evenodd"
        d="M12 2 H${w - 12} Q ${w - 2} 6 ${w - 2} 12 L ${w - 2} ${h - 12} Q ${w - 6} ${h - 2} ${w - 12} ${h - 2} L 12 ${h - 2} Q 2 ${h - 6} 2 ${h - 12} L 2 12 Q 6 2 12 2"
        stroke="#D4D9DB" stroke-width="3" stroke-linecap="round" stroke-dasharray="0.1 8" />
        `
    }
}

let borderDashedAll = document.querySelectorAll('[data-border-dashed]');
if (borderDashedAll.length) {
    borderDashedAll.forEach(borderDashed => {
        // init
        borderDashed.insertAdjacentHTML('afterBegin', `
        <svg class="border-dashed" viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd"
            d="M2 28 Q 2 18  12 18 H302 L318 2 L318 308 Q 318 312 308 318 L12 318 Q 2 312 2 308 z"
            stroke="#D4D9DB" stroke-width="3" stroke-linecap="round" stroke-dasharray="0.1 8" />
        </svg>
        `)
        let svg = borderDashed.querySelector('.border-dashed');

        let id = setInterval(() => {
            setSize(borderDashed, svg);
        }, 40)
        setTimeout(() => {
            clearInterval(id);
        }, 1000)

        window.addEventListener('resize', () => {
            setSize(borderDashed, svg);
        });
    })

    window.borderDashed = {
        update() {
            borderDashedAll.forEach(borderDashed => {
                let svg = borderDashed.querySelector('.border-dashed');
                let id = setInterval(() => {
                    setSize(borderDashed, svg);
                }, 40)
                setTimeout(() => {
                    clearInterval(id);
                }, 1000)
            })
        }
    }
};
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
};
		let categoriesBox = document.querySelector('[data-categories-box]');
if(categoriesBox) {
    let title = categoriesBox.querySelector('.categories-box__title');
    let listWrap = categoriesBox.querySelector('.categories-box__list-wrap');

    if(title && listWrap) {
        title.addEventListener('click', () => {
            categoriesBox.classList.toggle('categories-box--open');
            this.utils.slideToggle(listWrap, 300);
        })
    }
};
		let carDetailImages = document.querySelector('[data-slider="car-detail-images"]');
if (carDetailImages) {
    let thumb = new Swiper(carDetailImages.querySelector('.car-detail-images__thumb .swiper'), {
        slidesPerView: 6,
        spaceBetween: 0,
        speed: 600,
        slidesPerGroup: 2,
        lazy: {
            loadPrevNext: true,
        },
        watchSlidesVisibility: true,
        navigation: {
            nextEl: carDetailImages.querySelector('.slider-btn.btn-next'),
            prevEl: carDetailImages.querySelector('.slider-btn.btn-prev'),
        },
    });

    let main = new Swiper(carDetailImages.querySelector('.car-detail-images__main .swiper'), {
        slidesPerView: 1,
        spaceBetween: 10,
        speed: 600,
        preloadImages: false,
        lazy: {
            loadPrevNext: true,
        },
        pagination: {
            el: carDetailImages.querySelector('.swiper-pagination'),
            clickable: true,
        },
        watchSlidesVisibility: true,
        thumbs: {
            swiper: thumb,
        },
    });

};
		{
    const getNum = (value) => {
        return +value.replace('$', '');
    }

    let bidValue = document.querySelector('[data-bid-value]');
    if (bidValue) {
        let input = bidValue.querySelector('.bid-card-value__input');
        let btnMinus = bidValue.querySelector('.bid-card-value__btn.minus');
        let btnPlus = bidValue.querySelector('.bid-card-value__btn.plus');
        let minValue = +bidValue.dataset.minValue;
        let increments = +bidValue.dataset.increment;

        if (input && btnMinus && btnPlus) {
            // init
            if (!input.value.trim()) {
                input.value = minValue
            }

            if(getNum(input.value) < minValue) {
                input.value = minValue
            }

            btnPlus.addEventListener('click', () => {
                input.value = getNum(input.value) + increments;

                if(getNum(input.value) > minValue) {
                    bidValue.classList.remove('min-value');
                }
            })

            btnMinus.addEventListener('click', () => {
                input.value = getNum(input.value) - increments;

                if(getNum(input.value) <= minValue) {
                    input.value = minValue
                    bidValue.classList.add('min-value');
                }
            })
        }
    }
};
		
	}

}

let app = new App();
app.init();

