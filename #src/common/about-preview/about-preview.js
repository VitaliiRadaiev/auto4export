let aboutPreview = document.querySelector('[data-about-preview]');
if(aboutPreview) {
    let textContainer = aboutPreview.querySelector('.about-preview__text');
    let textLine = aboutPreview.querySelector('.text-collapse-line');
    let btnReadMore = aboutPreview.querySelector('.about-preview__read-more');

    if(textContainer && textLine && btnReadMore) {
        let textElements = Array.from(textContainer.children);
        let index = textElements.findIndex(item => item.classList.contains('text-collapse-line'));
        let collapseElements = textElements.slice(index + 1);

        let collapseContainer = document.createElement('div');
        collapseContainer.className = 'text-collapse';
        collapseContainer.append(...collapseElements);

        textLine.after(collapseContainer);

        btnReadMore.addEventListener('click', (e) => {
            e.preventDefault();
    
            btnReadMore.classList.toggle('text-is-show');
    
            this.utils.slideToggle(collapseContainer);
        })
    }
}

