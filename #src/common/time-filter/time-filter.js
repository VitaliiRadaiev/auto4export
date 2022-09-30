let timeFilter = document.querySelector('[data-time-filter]');
if(timeFilter) {

    const setInactiveElements = (timeFilter, columns) => {
        let startActiveEl = timeFilter.querySelector('.start-value .time-filter__dropdown-item.active')
        let endActiveEl = timeFilter.querySelector('.end-value .time-filter__dropdown-item.active')

        columns.forEach(column => {
            if(column.classList.contains('start-value')) {
                let items = column.querySelectorAll('.time-filter__dropdown-item');

                items.forEach(item => {
                    if(+item.innerText.trim() > +endActiveEl.innerText.trim()) {
                        item.classList.add('inactive');
                    } else {
                        item.classList.remove('inactive');
                    }
                });
            }

            if(column.classList.contains('end-value')) {
                let items = column.querySelectorAll('.time-filter__dropdown-item');

                items.forEach(item => {
                    if(+item.innerText.trim() < +startActiveEl.innerText.trim()) {
                        item.classList.add('inactive');
                    } else {
                        item.classList.remove('inactive');
                    }
                });
            }
        })
    }

    let columns = timeFilter.querySelectorAll('.time-filter__dropdown-col');
    let top = timeFilter.querySelector('.time-filter__top');
    let inputStart = timeFilter.querySelector('[data-time-filter-start]');
    let inputEnd = timeFilter.querySelector('[data-time-filter-end]');
    let startValue = timeFilter.querySelector('.time-filter__start-value');
    let endValue = timeFilter.querySelector('.time-filter__end-value');
    let initStartValue = timeFilter.dataset.initStartValue;
    let initEndValue = timeFilter.dataset.initEndValue;

    if(top) {
        // init
        inputStart.value = initStartValue.trim();
        startValue.innerText = initStartValue.trim();

        inputEnd.value = initEndValue.trim();
        endValue.innerText = initEndValue.trim();

        columns.forEach(column => {
            if(column.classList.contains('start-value')) {
                let items = column.querySelectorAll('.time-filter__dropdown-item');

                items.forEach(item => {
                    if(item.innerText.trim() === initStartValue.trim()) {
                        item.classList.add('active');
                    } else {
                        item.classList.remove('active');
                    }
                });
            }

            if(column.classList.contains('end-value')) {
                let items = column.querySelectorAll('.time-filter__dropdown-item');
                items.forEach(item => {
                    if(item.innerText.trim() === initEndValue.trim()) {
                        item.classList.add('active');
                    } else {
                        item.classList.remove('active');
                    }
                });
            }
        })

        setInactiveElements(timeFilter, columns);
        
        document.addEventListener('click', (e) => {

            if(e.target.closest('.time-filter__top')) {
                timeFilter.classList.toggle('active');
            } else {
                if(!e.target.closest('.time-filter')) {
                    timeFilter.classList.remove('active');
                }
            }

            columns.forEach(column => {
                let scrollWrap = column.querySelector('.time-filter__dropdown-scroll-wrap');
    
                if(scrollWrap.scrollTop > 10) {
                    column.classList.add('scroll-top');
                }
    
                if((scrollWrap.scrollHeight - (scrollWrap.scrollTop + scrollWrap.clientHeight)) > 10) {
                    column.classList.add('scroll-bottom');
                }

            })
        })
    }

    if(columns.length) {
        let isChosen = [false, false];
        const reset = () => {
            isChosen[0] = false;
            isChosen[1] = false;
            timeFilter.classList.remove('active');
            timeFilter.classList.remove('time-filter--selected');

            inputStart.value = initStartValue.trim();
            startValue.innerText = initStartValue.trim();
    
            inputEnd.value = initEndValue.trim();
            endValue.innerText = initEndValue.trim();

            columns.forEach(column => {
                if(column.classList.contains('start-value')) {
                    let items = column.querySelectorAll('.time-filter__dropdown-item');
    
                    items.forEach(item => {
                        if(item.innerText.trim() === initStartValue.trim()) {
                            item.classList.add('active');
                        } else {
                            item.classList.remove('active');
                        }
                    });
                }
    
                if(column.classList.contains('end-value')) {
                    let items = column.querySelectorAll('.time-filter__dropdown-item');
                    items.forEach(item => {
                        if(item.innerText.trim() === initEndValue.trim()) {
                            item.classList.add('active');
                        } else {
                            item.classList.remove('active');
                        }
                    });
                }
            })

            setInactiveElements(timeFilter, columns);
        }
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

                        setInactiveElements(timeFilter, columns);

                        if(item.closest('.start-value')) {
                            inputStart.value = item.innerText.trim();
                            startValue.innerText = item.innerText.trim();
                            isChosen[0] = true;
                        }

                        if(item.closest('.end-value')) {
                            inputEnd.value = item.innerText.trim();
                            endValue.innerText = item.innerText.trim();
                            isChosen[1] = true;
                        }

                        if(isChosen.every(i => i === true)) {
                            isChosen[0] = false;
                            isChosen[1] = false;
                            timeFilter.classList.remove('active');
                            timeFilter.classList.add('time-filter--selected');

                            if(this.mainFilterTop) {
                                this.mainFilterTop.removeButton(inputStart.dataset.id);
                                this.mainFilterTop.addButton(`${startValue.innerText}-${endValue.innerText}`, inputStart.dataset.id, reset);
                            }
                        }
                    })
                })
            }
        })

        this.dateFilter = {
            reset: reset,
        }
    }
}