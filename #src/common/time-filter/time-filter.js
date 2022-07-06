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
}