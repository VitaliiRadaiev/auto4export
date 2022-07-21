let mainFilter = document.querySelector('[data-main-filter]');
if (mainFilter) {
    let filterSelects = mainFilter.querySelectorAll('.filter-select');
    if (filterSelects.length) {
        filterSelects.forEach(filterSelect => {
            let head = filterSelect.querySelector('.filter-select__head');
            let headText = filterSelect.querySelector('.filter-select__head-text');
            let collapseBox = filterSelect.querySelector('.filter-select__collapse-box');
            let innerInputs = Array.from(filterSelect.querySelectorAll('input[type="radio"], input[type="checkbox"]'));
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

            if (innerInputs.length) {
                innerInputs.forEach(checkboxRadio => {
                    if(checkboxRadio.type === 'radio') {
                        let textEl = checkboxRadio.closest('.checkbox-radio').querySelector('.checkbox-radio__text');
                        // init
                        if (checkboxRadio.checked) {
                            filterSelect.classList.add('filter-select--selected');
                            headText.innerText = textEl.innerText;
                        }
    
                        checkboxRadio.addEventListener('change', () => {
                            if (checkboxRadio.checked) {
                                filterSelect.classList.add('filter-select--selected');
                                headText.innerText = textEl.innerText;
                            }
                        })
                    } else if(checkboxRadio.type === 'checkbox') {
                        checkboxRadio.addEventListener('change', () => {
                            let text = innerInputs.filter(i => i.checked).map(i => i.closest('.checkbox-radio').querySelector('.checkbox-radio__text').innerText);
                            if(text.length) {
                                filterSelect.classList.add('filter-select--selected');
                                headText.innerText = text.join(', ');
                            } else {
                                filterSelect.classList.remove('filter-select--selected');
                                headText.innerText = 'Select'
                            }
                        })
                        
                    }
                })
            }

            if (inputSearch && innerInputs) {
                const getFilterItems = (innerInputs) => {
                    return Array.from(innerInputs).map(input => {
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

                let allFilterItems = getFilterItems(innerInputs);

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

        let mainMobileFilter = document.querySelector('[data-main-filter-mobile]');
        if(mainMobileFilter) {

            btnOpenMobileFilter.addEventListener('click', () => {
   
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