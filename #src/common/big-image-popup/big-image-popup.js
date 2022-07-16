let bigImgaeElements = document.querySelectorAll('[data-big-image]');
if(bigImgaeElements.length) {
    bigImgaeElements.forEach(bigImgaeEl => {
        const createPopup = () => {
            let popup = document.createElement('div');
            popup.className = 'big-image-popup';
            popup.insertAdjacentHTML('beforeend', `
            <div class="big-image-popup__close">
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M12.728 5.09117C12.9623 4.85685 12.9623 4.47696 12.728 4.24264C12.4937 4.00833 12.1138 4.00833 11.8795 4.24264L8.48535 7.63675L5.09124 4.24264C4.85692 4.00833 4.47703 4.00833 4.24271 4.24264C4.0084 4.47696 4.0084 4.85685 4.24271 5.09117L7.63682 8.48528L4.24271 11.8794C4.0084 12.1137 4.0084 12.4936 4.24271 12.7279C4.47703 12.9622 4.85692 12.9622 5.09124 12.7279L8.48535 9.33381L11.8795 12.7279C12.1138 12.9622 12.4937 12.9622 12.728 12.7279C12.9623 12.4936 12.9623 12.1137 12.728 11.8794L9.33388 8.48528L12.728 5.09117Z"
                    fill="#fff" />
            </svg>
            </div>
            <div class="big-image-popup__img">

                <img src="" alt="">
                <div class="swiper-lazy-preloader"></div>
            </div>
            `);
            document.body.append(popup);
            return popup;
        }

        let bigImagePopup = createPopup();
        let img = bigImagePopup.querySelector('img');
        let close = bigImagePopup.querySelector('.big-image-popup__close');

        bigImgaeEl.addEventListener('click', (e) => {
            e.preventDefault();

            if(!bigImagePopup.classList.contains('loaded')) {
                img.src = bigImgaeEl.href;
            }
            bigImagePopup.classList.add('big-image-popup--open');
            body.classList.add('overflow-hidden');
        })

        close.addEventListener('click', () => {
            bigImagePopup.classList.remove('big-image-popup--open');
            body.classList.remove('overflow-hidden');
        })

        img.onload = () => {
            bigImagePopup.classList.add('loaded');
        }
    })
}