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
                this.utils.slideToggle(collapseBox, 100);
                this.scrollAnimation.update();

                filterSelects.forEach(i => {
                    if (i === filterSelect) return;

                    let collapseBox = i.querySelector('.filter-select__collapse-box');

                    i.classList.remove('filter-select--open');
                    this.utils.slideUp(collapseBox, 100);
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

        if(hideRows.length) {
            btnOptions.addEventListener('click', () => {
                if(mainFilter.classList.contains('show-hide-rows')) {
                    hideRows.forEach(row => {
                        row.classList.remove('show');
                    })
                    mainFilter.classList.remove('show-hide-rows');
                    btnOptions.classList.remove('filter-is-open');
                    let regexp = new RegExp(btnOptions.dataset.text);
                    btnOptions.innerHTML = btnOptions.innerHTML.replace(btnOptions.dataset.text, btnText);
                } else {
                    hideRows.forEach(row => {
                        row.classList.add('show');
                    })
                    mainFilter.classList.add('show-hide-rows');
                    btnOptions.classList.add('filter-is-open');
                    let regexp = new RegExp(btnText);
                    btnOptions.innerHTML = btnOptions.innerHTML.replace(regexp, btnOptions.dataset.text);
                }

            })
        }
    }

    let btnReset = mainFilter.querySelector('.main-filter__reset');
    if(btnReset) {
        let form = btnReset.closest('form');
        let selects = mainFilter.querySelectorAll('.main-filter__select .select-wrap');
        let outsideResetButtons = document.querySelectorAll('[data-action="reset-main-filter"]');

        if(outsideResetButtons.length) {
            outsideResetButtons.forEach(resetBtn => {
                resetBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    btnReset.click();
                })
            })
        }

        form.addEventListener('reset', () => {
            if(filterSelects.length) {
                filterSelects.forEach(filterSelect => {
                    let head = filterSelect.querySelector('.filter-select__head-text');
                    filterSelect.classList.remove('filter-select--selected');
                    head.innerText = 'Select';
                })
            }

            if(this.allRangeSliders.length) {
                this.allRangeSliders.forEach(rangeSlider => {
                    rangeSlider.slider.noUiSlider.set([+rangeSlider.min, +rangeSlider.max]);
                })
            }

            if(selects.length) {
                selects.forEach(selectWrap => {
                    let select = selectWrap.querySelector('select');
                    let selectInner = selectWrap.querySelector('.select');
                    let title = selectWrap.querySelector('.select__value span');
                    select.value = '';
                    selectInner.classList.remove('_visited');
                    title.innerText = select.selectedOptions[0].text;

                    let event = new Event("change", { bubbles: true });
                    select.dispatchEvent(event);
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