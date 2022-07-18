(function uploadFileHandler() {
    let files = []
    let inputWrapItems = document.querySelectorAll('[data-input-file]');
    if (inputWrapItems.length) {
        inputWrapItems.forEach(inputWrap => {
            let input = inputWrap.querySelector('input[type="file"]');
            let text = inputWrap.querySelector('.file-input__result');


            const changeHandler = (event) => {
                if (!event.target.files.length) {
                    return
                }

                files = Array.from(event.target.files);

                let result = files.map(item => item.name);
                text.innerText = result.join(', ');
            }

            input.addEventListener('change', changeHandler);
        })
    }
})()

