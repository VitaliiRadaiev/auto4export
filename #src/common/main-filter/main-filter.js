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
}