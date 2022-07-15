@@include('files/utils.js');
@@include('files/dynamic_adapt.js');

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
		@@include('../common/header/header.js');
	}

	popupHandler() {
		@@include('../common/popup/popup.js');
	}

	slidersInit() {
		@@include('../common/carousel/carousel.js');
		@@include('../common/featured-vehicles/featured-vehicles.js');
		@@include('../common/last-reviews/last-reviews.js');
		@@include('../common/search-top-filter/search-top-filter.js');
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
		@@include('../common/select/select.js');
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
		@@include('../common/about-preview/about-preview.js');
		@@include('../common/rating/rating.js');
		@@include('../common/time-filter/time-filter.js');
		@@include('../common/main-filter/main-filter.js');
		@@include('../common/price-range/price-range.js');
		@@include('../common/timer/timer.js');
	}

	componentsScripts() {
		@@include('../common/promo-header/promo-header.js');
		@@include('../common/border-dashed/border-dashed.js');
		@@include('../common/card/card.js');
		@@include('../common/categories-box/categories-box.js');
		@@include('../common/car-detail-images/car-detail-images.js');
		@@include('../common/bid-card/bid-card.js');
	}

}

let app = new App();
app.init();

