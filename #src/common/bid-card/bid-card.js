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
}