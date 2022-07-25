{
    let removeAll = document.querySelectorAll('[data-remove]');
    if(removeAll.length) {
        removeAll.forEach(removeBox => {
            let btnRemove = removeBox.querySelector('.remove__btn');
            let btnCancel = removeBox.querySelector('.remove__cancel');

            if(btnRemove && btnCancel) {
                btnRemove.addEventListener('click', (e) => {
                    e.preventDefault();
                    removeBox.classList.toggle('remove--show-alert');
                })
                btnCancel.addEventListener('click', (e) => {
                    e.preventDefault();
                    removeBox.classList.remove('remove--show-alert');
                })
            }
        })
    }
}