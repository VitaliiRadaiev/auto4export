let mainFilter = document.querySelector('[data-main-filter]');
if (mainFilter) {
    const setUniqueIdForAllInputsEndSelectOptions = () => {
        let elements = mainFilter.querySelectorAll('input, select option');
        elements.forEach((el, index) => {
            el.setAttribute('data-id', index);
        })
    }

    setUniqueIdForAllInputsEndSelectOptions();

    let mainFilterTop = document.querySelector('[data-main-filter-top]');
    if(mainFilterTop) {
        this.mainFilterTop = {
            arrayOfCallbackFunctions: new Map(),
            init() {
                mainFilterTop.addEventListener('click', (e) => {
                    e.preventDefault();
                    if(e.target.closest('[data-id]')) {
                        let id = e.target.dataset.id;
                        
                        if(this.arrayOfCallbackFunctions.get(id)) {
                            let callback = this.arrayOfCallbackFunctions.get(id);
                            if(callback) callback();
                            this.arrayOfCallbackFunctions.delete(id);
                        } ;
                        this.removeButton(id);
                    }
                })
            },

            addButton(text, id, callback = null) {
                let btn = document.createElement('button');
                btn.innerText = text;
                btn.setAttribute('data-id', id);
                btn.insertAdjacentHTML('beforeend', `
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none" class="_svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M12.728 5.09117C12.9623 4.85685 12.9623 4.47696 12.728 4.24264C12.4937 4.00833 12.1138 4.00833 11.8795 4.24264L8.48535 7.63675L5.09124 4.24264C4.85692 4.00833 4.47703 4.00833 4.24271 4.24264C4.0084 4.47696 4.0084 4.85685 4.24271 5.09117L7.63682 8.48528L4.24271 11.8794C4.0084 12.1137 4.0084 12.4936 4.24271 12.7279C4.47703 12.9622 4.85692 12.9622 5.09124 12.7279L8.48535 9.33381L11.8795 12.7279C12.1138 12.9622 12.4937 12.9622 12.728 12.7279C12.9623 12.4936 12.9623 12.1137 12.728 11.8794L9.33388 8.48528L12.728 5.09117Z"
                    fill="#8C8C8C"></path>
                </svg>
                `);
                mainFilterTop.prepend(btn);
                mainFilterTop.classList.remove('main-filter-top--empty');

                if(callback) {
                    this.arrayOfCallbackFunctions.set(id, callback);
                }
            },

            removeButton(id) {
                let btn = mainFilterTop.querySelector(`[data-id="${id}"]`);
                if(btn) {
                    btn.remove();
                    this.arrayOfCallbackFunctions.delete(id);

                    if(mainFilterTop.children.length < 2) {
                        mainFilterTop.classList.add('main-filter-top--empty');
                    }
                }
            },

            removeAllButtons() {
                let buttons = mainFilterTop.querySelectorAll('[data-id]');
                if(buttons.length) {
                    buttons.forEach(btn => {
                        btn.remove();
                    })
                }

                this.arrayOfCallbackFunctions.clear();
                mainFilterTop.classList.add('main-filter-top--empty');
            }
        }

        if(this.mainFilterTop) this.mainFilterTop.init();
    }

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

                        const removeChecked = () => {
                            checkboxRadio.checked = false;
                            filterSelect.classList.remove('filter-select--selected');
                            headText.innerText = 'Select';
                        }
    
                        checkboxRadio.addEventListener('change', () => {
                            if (checkboxRadio.checked) {
                                filterSelect.classList.add('filter-select--selected');
                                headText.innerText = textEl.innerText;

                                if(this.mainFilterTop) {
                                    this.mainFilterTop.addButton(textEl.innerText, checkboxRadio.dataset.id, removeChecked);

                                    innerInputs.forEach(radio => {
                                        if(radio.dataset.id === checkboxRadio.dataset.id) return;
                                        this.mainFilterTop.removeButton(radio.dataset.id);
                                    })
                                }
                            }
                        })
                    } else if(checkboxRadio.type === 'checkbox') {
                        let textEl = checkboxRadio.closest('.checkbox-radio').querySelector('.checkbox-radio__text');
                        
                        const removeChecked = () => {
                            checkboxRadio.checked = false;

                            let text = innerInputs.filter(i => i.checked).map(i => i.closest('.checkbox-radio').querySelector('.checkbox-radio__text').innerText);
                            if(text.length) {
                                filterSelect.classList.add('filter-select--selected');
                                headText.innerText = text.join(', ');
                            } else {
                                filterSelect.classList.remove('filter-select--selected');
                                headText.innerText = 'Select'
                            }
                        }

                        checkboxRadio.addEventListener('change', () => {
                            let text = innerInputs.filter(i => i.checked).map(i => i.closest('.checkbox-radio').querySelector('.checkbox-radio__text').innerText);
                            if(text.length) {
                                filterSelect.classList.add('filter-select--selected');
                                headText.innerText = text.join(', ');
                            } else {
                                filterSelect.classList.remove('filter-select--selected');
                                headText.innerText = 'Select'
                            }

                            if(checkboxRadio.checked) {
                                if(this.mainFilterTop) {
                                    this.mainFilterTop.addButton(textEl.innerText, checkboxRadio.dataset.id, removeChecked);
                                }
                            } else {
                                if(this.mainFilterTop) {
                                    this.mainFilterTop.removeButton(checkboxRadio.dataset.id);
                                }
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

    let defaultSelects = mainFilter.querySelectorAll('select');
    if(defaultSelects.length) {
        defaultSelects.forEach(select => {
            const clearSelect = () => {
                let selectInner = select.closest('.select');
                let title = selectInner.querySelector('.select__value span');
                let optionsEl = selectInner.querySelectorAll('.select__option');

                select.value = '';
                selectInner.classList.remove('_visited');
                title.innerText = select.selectedOptions[0].text;
                optionsEl.forEach(optionEl => optionEl.style.display = 'block');

                let event = new Event("change", { bubbles: true });
                select.dispatchEvent(event);
            }

            select.addEventListener('change', () => {
                if(!select.value) return;

                if(this.mainFilterTop) {
                    this.mainFilterTop.addButton(select.selectedOptions[0].innerText, select.selectedOptions[0].dataset.id, clearSelect);
                }

                Array.from(select.options).forEach(option => {
                    if(option.dataset.id === select.selectedOptions[0].dataset.id) return;
                    if(this.mainFilterTop) {
                        this.mainFilterTop.removeButton(option.dataset.id);
                    }
                })
            })
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

    let filterDate = mainFilter.querySelector('[data-filter-date]');
    if(filterDate) {
        let inputStart = filterDate.querySelector('.filter-date__col-1 input');
        let inputEnd = filterDate.querySelector('.filter-date__col-2 input');
        let isChosen = [false, false];

        //init
        let pickerStart = datepicker(inputStart, {
            formatter: (input, date, instance) => {
                const value = date.toLocaleDateString();
                input.value = value;
            },
            onSelect: (instance, date) => {
                isChosen[0] = true;
                if(isChosen.every(i => i === true)) {
                    isChosen[0] = false;
                    isChosen[1] = false;
                    filterDate.classList.add('filter-date--selected');

                    if(this.mainFilterTop) {
                        this.mainFilterTop.removeButton(inputStart.dataset.id);
                        this.mainFilterTop.addButton(`${inputStart.value} - ${inputEnd.value}`, inputStart.dataset.id, this.filterDate.reset);
                    }
                }
            }
        })
        let pickerEnd = datepicker(inputEnd, {
            formatter: (input, date, instance) => {
                const value = date.toLocaleDateString()
                input.value = value
            },
            onSelect: (instance, date) => {
                isChosen[1] = true;

                if(isChosen.every(i => i === true)) {
                    isChosen[0] = false;
                    isChosen[1] = false;
                    filterDate.classList.add('filter-date--selected');

                    if(this.mainFilterTop) {
                        this.mainFilterTop.removeButton(inputStart.dataset.id);
                        this.mainFilterTop.addButton(`${inputStart.value} - ${inputEnd.value}`, inputStart.dataset.id, this.filterDate.reset);
                    }
                }
            }
        })
        this.filterDate = {
            reset() {
                pickerStart.setDate()
                pickerEnd.setDate()
                isChosen[0] = false;
                isChosen[1] = false;
                filterDate.classList.remove('filter-date--selected');
            }
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

        form.addEventListener('reset', (e) => {
           
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
                    let optionsEl = selectWrap.querySelectorAll('.select__option');
                    select.value = '';
                    selectInner.classList.remove('_visited');
                    title.innerText = select.selectedOptions[0].text;
                    optionsEl.forEach(optionEl => optionEl.style.display = 'block');

                    let event = new Event("change", { bubbles: true });
                    select.dispatchEvent(event);
                })
            }

            if(this.dateFilter) {
                this.dateFilter.reset();
            }

            if(this.filterDate) {
                this.filterDate.reset();
            }

            if(this.mainFilterTop) {
                this.mainFilterTop.removeAllButtons();
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