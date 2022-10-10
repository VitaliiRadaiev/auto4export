{
    let alerts = document.querySelectorAll('[data-alert]');
    if(alerts.length) {
        alerts.forEach(alert => {
            let toggleBtn = alert.querySelector('.alert__show-toggle');
            let cancelBtn = alert.querySelector('.alert__cancel');

            if(toggleBtn) {
                toggleBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    alert.classList.toggle('alert--show');
                })

            }

            if(cancelBtn) {
                cancelBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    alert.classList.remove('alert--show');
                })
            }
        })
    }
}