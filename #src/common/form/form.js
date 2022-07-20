{
    let inputs = document.querySelectorAll('.input');
    if (inputs.length) {
        inputs.forEach(input => {
            if (input.value.trim().length > 0) {
                input.classList.add('auto-completed');
            }

            input.addEventListener('change', () => {
                if (input.value.trim().length > 0) {
                    input.classList.add('completed');
                    input.classList.remove('auto-completed');
                } else {
                    input.classList.remove('completed');
                    input.classList.remove('auto-completed');
                }
            })
            input.addEventListener('input', () => {
                if (input.value.trim().length > 0) {
                    input.classList.add('completed');
                    input.classList.remove('auto-completed');
                } else {
                    input.classList.remove('completed');
                    input.classList.remove('auto-completed');
                }
            })
        })
    }

    let passwordInputs = document.querySelectorAll('input[type="password"]');
    if (passwordInputs.length) {
        passwordInputs.forEach(passwordInput => {
            let icon = document.createElement('div');
            icon.className = 'password-icon';
            icon.innerHTML = `
            <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M15.3334 4.82659C16.8795 6.19113 17.8338 7.54319 17.8737 7.60009C18.0421 7.84043 18.0421 8.15967 17.8737 8.39995C17.8413 8.44621 17.0652 9.5466 15.7821 10.7629C15.501 11.0294 15.056 11.0187 14.7881 10.7391C14.5201 10.4595 14.5308 10.0168 14.812 9.75033C15.5435 9.05685 16.0978 8.4018 16.4157 8.00098C15.472 6.81558 12.4521 3.39878 9.00002 3.39878C5.53977 3.39878 2.52717 6.81271 1.58464 7.99941C2.52875 9.18533 5.54839 12.6012 8.99998 12.6012C10.0057 12.6012 11.0625 12.308 12.141 11.7296C12.4829 11.5463 12.9093 11.6733 13.0936 12.0133C13.2779 12.3534 13.1502 12.7776 12.8084 12.9609C11.5225 13.6504 10.2412 14 9.00002 14C7.84401 14 6.65113 13.6962 5.45438 13.0971C4.52179 12.6302 3.58383 11.983 2.66657 11.1734C1.12047 9.8089 0.166192 8.45684 0.126325 8.39995C-0.0421083 8.15964 -0.0421083 7.84036 0.126325 7.60005C0.166192 7.54319 1.12047 6.19113 2.66657 4.82655C3.58383 4.01697 4.52183 3.36976 5.45438 2.90288C6.65113 2.30378 7.84405 2 9.00002 2C10.156 2 11.3489 2.30378 12.5456 2.90291C13.4782 3.36979 14.4162 4.01701 15.3334 4.82659ZM5.9273 8.00004C5.9273 9.68109 7.3057 11.0487 9.00002 11.0487C10.6943 11.0487 12.0727 9.68109 12.0727 8.00004C12.0727 6.31898 10.6943 4.95136 9.00002 4.95136C7.30574 4.95136 5.9273 6.31898 5.9273 8.00004ZM10.6665 8.00003C10.6665 8.9098 9.91893 9.64993 9.00002 9.64993C8.0811 9.64993 7.33354 8.9098 7.33354 8.00003C7.33354 7.09027 8.0811 6.35014 9.00002 6.35014C9.91893 6.35014 10.6665 7.09027 10.6665 8.00003Z" fill="currentColor"/>
            <path class="line" d="M15 1L3 15" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
            </svg>
            `
            passwordInput.after(icon);

            icon.addEventListener('click', () => {
                if (icon.classList.contains('show-password')) {
                    passwordInput.setAttribute('type', 'password');
                    icon.classList.remove('show-password');
                } else {
                    passwordInput.setAttribute('type', 'text');
                    icon.classList.add('show-password');
                }
            })
        })
    }
}