{
    let howToBuyCards = document.querySelectorAll('[data-how-to-buy-card]');
    if (howToBuyCards.length) {
        howToBuyCards.forEach(howToBuyCard => {
            let textBox = howToBuyCard.querySelector('.how-to-buy-card__text');
            let btn = howToBuyCard.querySelector('.how-to-buy-card__btn');
            let btnText = btn.innerText;
            let breakEl = howToBuyCard.querySelector('.hide-after-that');

            if (breakEl) {
                let textBoxChildren = Array.from(textBox.children);
                let index = textBoxChildren.findIndex(i => i === breakEl);
                let hideElements = textBoxChildren.slice(index);
                let hideElementsWrap = document.createElement('div');

                hideElementsWrap.className = 'how-to-buy-card__text-collapse';
                hideElementsWrap.append(...hideElements);
                textBox.append(hideElementsWrap);

                btn.addEventListener('click', () => {
                    if (howToBuyCard.classList.contains('how-to-buy-card--open')) {

                        howToBuyCard.classList.remove('how-to-buy-card--open');
                        this.utils.slideUp(hideElementsWrap, 300);
                        //window.borderDashed.update();
                    } else {

                        howToBuyCard.classList.add('how-to-buy-card--open');
                        this.utils.slideDown(hideElementsWrap, 300);
                       // window.borderDashed.update();
                    }
                })
            }
        })
    }
}