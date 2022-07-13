let categoriesBox = document.querySelector('[data-categories-box]');
if(categoriesBox) {
    let title = categoriesBox.querySelector('.categories-box__title');
    let listWrap = categoriesBox.querySelector('.categories-box__list-wrap');

    if(title && listWrap) {
        title.addEventListener('click', () => {
            categoriesBox.classList.toggle('categories-box--open');
            this.utils.slideToggle(listWrap, 300);
        })
    }
}