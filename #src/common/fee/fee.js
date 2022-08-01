{
    let feeAll = document.querySelectorAll('[data-fee]');
    if(feeAll.length) {
        feeAll.forEach(fee => {
            let title = fee.querySelector('.fee__title');
            if(title) {
                title.addEventListener('click', () => {
                    fee.classList.toggle('fee--show-list');
                })
    
                document.addEventListener('click', (e) => {
                    if(!e.target.closest('.fee')) {
                        if(!e.target.closest('.bid-card-value__body')) {
                            fee.classList.remove('fee--show-list');
                        }
                    }
                })
            }
        })

    }
}