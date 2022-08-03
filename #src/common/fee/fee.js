{
    let feeAll = document.querySelectorAll('[data-fee]');
    if(feeAll.length) {
        feeAll.forEach(fee => {
            let title = fee.querySelector('.fee__title');
            let wrapper = fee.closest('.fee-wrap');
            let list = fee.querySelector('.fee__list');
            if(title) {
                title.addEventListener('click', () => {
                    
                    if(fee.classList.contains('fee--show-list')) {
                        fee.classList.remove('fee--show-list');

                        if(wrapper) {
                            wrapper.style.marginBottom = '1.4rem';
                        }
                    } else {
                        fee.classList.add('fee--show-list');

                        if(wrapper) {
                            wrapper.style.marginBottom = `calc(${list.clientHeight + 'px'} + 2rem)`;
                        }
                    }
                })
    
                document.addEventListener('click', (e) => {
                    if(!e.target.closest('.fee')) {
                        if(!e.target.closest('.bid-card-value__body')) {
                            fee.classList.remove('fee--show-list');

                            if(wrapper) {
                                wrapper.style.marginBottom = '1.4rem';
                            }
                        }
                    }
                })

                window.addEventListener('resize', () => {
                    if(fee.classList.contains('fee--show-list')) {
                        if(wrapper) {
                            wrapper.style.marginBottom = `calc(${list.clientHeight + 'px'} + 2rem)`;
                        }
                    } else {
                        if(wrapper) {
                            wrapper.style.marginBottom = '1.4rem';
                        }
                    }
                })
            }
        })

    }
}