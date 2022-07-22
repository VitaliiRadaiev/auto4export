{
    let switchDropdown = document.querySelector('[data-switch-dropdown]');
    if (switchDropdown) {
        let checkbox = switchDropdown.querySelector('.checkbox-switch input[type="checkbox"]');
        let btnCancell = switchDropdown.querySelector('.switch-dropdown__cancel');

        if (checkbox && btnCancell) {
            // init
            if (checkbox.checked) {
                switchDropdown.classList.add('switch-dropdown--show-box');
            }

            checkbox.addEventListener('change', () => {
                if (checkbox.checked) {
                    switchDropdown.classList.add('switch-dropdown--show-box');
                } else {
                    switchDropdown.classList.remove('switch-dropdown--show-box');
                }
            })

            btnCancell.addEventListener('click', () => {
                checkbox.checked = false;
                let event = new Event("change");
                checkbox.dispatchEvent(event);
            })
        }
    }
}