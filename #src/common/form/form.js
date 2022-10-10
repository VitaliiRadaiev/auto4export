{
    let inputs = document.querySelectorAll('.input');
    if (inputs.length) {
        inputs.forEach(input => {
            if (input.value.trim().length > 0) {
                if(input.classList.contains('not-check')) return;
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
            <svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.00098 1C5.56188 1 2.44314 2.92896 0.141817 6.06211C-0.0459704 6.31881 -0.0459704 6.67742 0.141817 6.93411C2.44314 10.071 5.56188 12 9.00098 12C12.4401 12 15.5588 10.071 17.8601 6.93789C18.0479 6.68119 18.0479 6.32258 17.8601 6.06589C15.5588 2.92896 12.4401 1 9.00098 1Z" fill="#8C8C8C"/>
            <path d="M9.24575 10.3712C6.96284 10.5185 5.0776 8.58949 5.22121 6.24529C5.33903 4.31256 6.86711 2.74598 8.75235 2.62518C11.0353 2.47796 12.9205 4.40693 12.7769 6.75113C12.6554 8.68009 11.1273 10.2467 9.24575 10.3712Z" fill="#F2F2F2"/>
            <path d="M9.23065 8.59201C8.00082 8.67128 6.98456 7.63319 7.06557 6.37238C7.12816 5.33051 7.95295 4.48871 8.96922 4.42076C10.199 4.34149 11.2153 5.37958 11.1343 6.64039C11.068 7.68603 10.2432 8.52783 9.23065 8.59201Z" fill="#8C8C8C"/>
            <path class="line" d="M3 12L15 1" stroke="#8C8C8C" stroke-linejoin="round"/>
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

    let phoneConfirmAll = document.querySelectorAll('[data-phone-confirm]');
    if(phoneConfirmAll.length) {
        phoneConfirmAll.forEach(phoneConfirm => {
            let input = phoneConfirm.querySelector('input');
            let btn = phoneConfirm.querySelector('.phone-confirm');

            if(input && btn) {
                input.addEventListener('input', () => {
                    if(input.value.trim().length >= 9) {
                        btn.classList.add('phone-confirm--show');
                    } else {
                        btn.classList.remove('phone-confirm--show');
                    }
                })
            }
        })
    }

    let selectsHaveAction = document.querySelectorAll('[data-select-action]');
    if(selectsHaveAction.length) {
        selectsHaveAction.forEach(select => {
            select.addEventListener('change', () => {
                if(select.selectedOptions[0].hasAttribute('data-set-element-as-inactive-by-id')) {
                    let actionEl = document.querySelector(`[data-id="${select.selectedOptions[0].dataset.setElementAsInactiveById}"]`);
                    
                    if(actionEl) {
                        if(actionEl.nodeName === 'SELECT') {
                            actionEl.parentElement.classList.add('inactive');
                            actionEl.classList.add('inactive');

                            let selectWrapper = actionEl.closest('.select-wrap');
                            let selectInner = selectWrapper.querySelector('.select');
                            let title = selectWrapper.querySelector('.select__value span');
                            actionEl.value = '';
                            selectInner.classList.remove('_visited');
                            title.innerText = actionEl.selectedOptions[0].text;
        
                            let event = new Event("change", { bubbles: true });
                            actionEl.dispatchEvent(event);
                        } else {
                            actionEl.classList.add('inactive');
                        }   
                    }
                }

                if(select.selectedOptions[0].hasAttribute('data-set-element-as-active-by-id')) {
                    let actionEl = document.querySelector(`[data-id="${select.selectedOptions[0].dataset.setElementAsActiveById}"]`);
                    
                    if(actionEl) {
                        if(actionEl.nodeName === 'SELECT') {
                            actionEl.parentElement.classList.remove('inactive');
                            actionEl.classList.remove('inactive');
                        } else {
                            actionEl.classList.remove('inactive');
                        }   
                    }
                }

                if(select.selectedOptions[0].hasAttribute('data-set-elements-as-inactive-by-id')) {
                    let allId = select.selectedOptions[0].dataset.setElementsAsInactiveById.split(',').map(i => i.trim());
                    let actionElements = allId.map(id => document.querySelector(`[data-id="${id}"]`));
                    
                    actionElements.forEach(el => {
                        if(el) {
                            if(el.nodeName === 'SELECT') {
                                el.parentElement.classList.add('inactive');
                                el.classList.add('inactive');

                                let selectWrapper = el.closest('.select-wrap');
                                let selectInner = selectWrapper.querySelector('.select');
                                let title = selectWrapper.querySelector('.select__value span');
                                el.value = '';
                                selectInner.classList.remove('_visited');
                                title.innerText = el.selectedOptions[0].text;
            
                                let event = new Event("change", { bubbles: true });
                                el.dispatchEvent(event);

                            } else {
                                el.classList.add('inactive');
                            }   
                        }
                    })
                }

                if(select.selectedOptions[0].hasAttribute('data-set-elements-as-active-by-id')) {
                    let allId = select.selectedOptions[0].dataset.setElementsAsActiveById.split(',').map(i => i.trim());
                    let actionElements = allId.map(id => document.querySelector(`[data-id="${id}"]`));
                    
                    actionElements.forEach(el => {
                        if(el) {
                            if(el.nodeName === 'SELECT') {
                                el.parentElement.classList.remove('inactive');
                                el.classList.remove('inactive');
                            } else {
                                el.classList.remove('inactive');
                            }   
                        }
                    })
                }

                if(select.selectedOptions[0].hasAttribute('data-hide-element-by-id')) {
                    let actionEl = document.querySelector(`[data-id="${select.selectedOptions[0].dataset.hideElementById}"]`);
                    
                    if(actionEl) {
                        actionEl.classList.add('d-none');
                    }
                }

                if(select.selectedOptions[0].hasAttribute('data-show-element-by-id')) {
                    let actionEl = document.querySelector(`[data-id="${select.selectedOptions[0].dataset.showElementById}"]`);
                    if(actionEl) {
                        actionEl.classList.remove('d-none');
                    }
                }

                if(select.selectedOptions[0].hasAttribute('data-hide-elements-by-id')) {
                    let allId = select.selectedOptions[0].dataset.hideElementsById.split(',').map(i => i.trim());
                    let actionElements = allId.map(id => document.querySelector(`[data-id="${id}"]`));
                    
                    actionElements.forEach(el => {
                        if(el) {
                            el.classList.add('d-none');
                        }
                    })
                }

                if(select.selectedOptions[0].hasAttribute('data-show-elements-by-id')) {
                    let allId = select.selectedOptions[0].dataset.showElementsById.split(',').map(i => i.trim());
                    let actionElements = allId.map(id => document.querySelector(`[data-id="${id}"]`));
                    
                    actionElements.forEach(el => {
                        if(el) {
                            el.classList.remove('d-none');
                        }
                    })
                }
            })
        })
    }

    let inputsHaveAction = document.querySelectorAll('[data-input-action]');
    if(inputsHaveAction.length) {
        inputsHaveAction.forEach(input => {
            input.addEventListener('change', () => {
                if(input.value.trim().length >= 1) {
                    if(input.hasAttribute('data-set-element-as-inactive-by-id')) {
                        let actionEl = document.querySelector(`[data-id="${input.dataset.setElementAsInactiveById}"]`);
                        
                        if(actionEl) {
                            if(actionEl.nodeName === 'SELECT') {
                                actionEl.parentElement.classList.add('inactive');
                                actionEl.classList.add('inactive');

                                let selectWrapper = actionEl.closest('.select-wrap');
                                let selectInner = selectWrapper.querySelector('.select');
                                let title = selectWrapper.querySelector('.select__value span');
                                actionEl.value = '';
                                selectInner.classList.remove('_visited');
                                title.innerText = actionEl.selectedOptions[0].text;
            
                                let event = new Event("change", { bubbles: true });
                                actionEl.dispatchEvent(event);
                            } else {
                                actionEl.classList.add('inactive');
                            }   
                        }
                    }
    
                    if(input.hasAttribute('data-set-element-as-active-by-id')) {
                        let actionEl = document.querySelector(`[data-id="${input.dataset.setElementAsActiveById}"]`);
                        
                        if(actionEl) {
                            if(actionEl.nodeName === 'SELECT') {
                                actionEl.parentElement.classList.remove('inactive');
                                actionEl.classList.remove('inactive');
                            } else {
                                actionEl.classList.remove('inactive');
                            }   
                        }
                    }

                    if(input.hasAttribute('data-set-elements-as-inactive-by-id')) {
                        let allId = input.dataset.setElementsAsInactiveById.split(',').map(i => i.trim());
                        let actionElements = allId.map(id => document.querySelector(`[data-id="${id}"]`));
                        
                        actionElements.forEach(el => {
                            if(el) {
                                if(el.nodeName === 'SELECT') {
                                    el.parentElement.classList.add('inactive');
                                    el.classList.add('inactive');

                                    let selectWrapper = el.closest('.select-wrap');
                                    let selectInner = selectWrapper.querySelector('.select');
                                    let title = selectWrapper.querySelector('.select__value span');
                                    el.value = '';
                                    selectInner.classList.remove('_visited');
                                    title.innerText = el.selectedOptions[0].text;
                
                                    let event = new Event("change", { bubbles: true });
                                    el.dispatchEvent(event);
                                } else {
                                    el.classList.add('inactive');
                                }   
                            }
                        })
                    }

                    if(input.hasAttribute('data-set-elements-as-active-by-id')) {
                        let allId = input.dataset.setElementsAsActiveById.split(',').map(i => i.trim());
                        let actionElements = allId.map(id => document.querySelector(`[data-id="${id}"]`));
                        
                        actionElements.forEach(el => {
                            if(el) {
                                if(el.nodeName === 'SELECT') {
                                    el.parentElement.classList.remove('inactive');
                                    el.classList.remove('inactive');
                                } else {
                                    el.classList.remove('inactive');
                                }   
                            }
                        })
                    }
    
                    if(input.hasAttribute('data-hide-element-by-id')) {
                        let actionEl = document.querySelector(`[data-id="${input.dataset.hideElementById}"]`);
                        
                        if(actionEl) {
                            actionEl.classList.add('d-none');
                        }
                    }
    
                    if(input.hasAttribute('data-show-element-by-id')) {
                        let actionEl = document.querySelector(`[data-id="${input.dataset.showElementById}"]`);
                        if(actionEl) {
                            actionEl.classList.remove('d-none');
                        }
                    }

                    if(input.hasAttribute('data-hide-elements-by-id')) {
                        let allId = input.dataset.hideElementsById.split(',').map(i => i.trim());
                        let actionElements = allId.map(id => document.querySelector(`[data-id="${id}"]`));
                        
                        actionElements.forEach(el => {
                            if(el) {
                                el.classList.add('d-none');
                            }
                        })
                    }

                    if(input.hasAttribute('data-show-elements-by-id')) {
                        let allId = input.dataset.showElementsById.split(',').map(i => i.trim());
                        let actionElements = allId.map(id => document.querySelector(`[data-id="${id}"]`));
                        
                        actionElements.forEach(el => {
                            if(el) {
                                el.classList.remove('d-none');
                            }
                        })
                    }

                } else {

                    if(input.hasAttribute('data-set-element-as-inactive-by-id')) {
                        let actionEl = document.querySelector(`[data-id="${input.dataset.setElementAsInactiveById}"]`);
                        
                        if(actionEl) {
                            if(actionEl.nodeName === 'SELECT') {
                                actionEl.parentElement.classList.remove('inactive');
                                actionEl.classList.remove('inactive');
                            } else {
                                actionEl.classList.remove('inactive');
                            }   
                        }
                    }
    
                    if(input.hasAttribute('data-set-element-as-active-by-id')) {
                        let actionEl = document.querySelector(`[data-id="${input.dataset.setElementAsActiveById}"]`);
                        
                        if(actionEl) {
                            if(actionEl.nodeName === 'SELECT') {
                                actionEl.parentElement.classList.add('inactive');
                                actionEl.classList.add('inactive');
                            } else {
                                actionEl.classList.add('inactive');
                            }   
                        }
                    }

                    if(input.hasAttribute('data-set-elements-as-inactive-by-id')) {
                        let allId = input.dataset.setElementsAsInactiveById.split(',').map(i => i.trim());
                        let actionElements = allId.map(id => document.querySelector(`[data-id="${id}"]`));
                        
                        actionElements.forEach(el => {
                            if(el) {
                                if(el.nodeName === 'SELECT') {
                                    el.parentElement.classList.remove('inactive');
                                    el.classList.remove('inactive');
                                } else {
                                    el.classList.remove('inactive');
                                }   
                            }
                        })
                    }

                    if(input.hasAttribute('data-set-elements-as-active-by-id')) {
                        let allId = input.dataset.setElementsAsActiveById.split(',').map(i => i.trim());
                        let actionElements = allId.map(id => document.querySelector(`[data-id="${id}"]`));
                        
                        actionElements.forEach(el => {
                            if(el) {
                                if(el.nodeName === 'SELECT') {
                                    el.parentElement.classList.add('inactive');
                                    el.classList.add('inactive');
                                } else {
                                    el.classList.add('inactive');
                                }   
                            }
                        })
                    }
    
                    if(input.hasAttribute('data-hide-element-by-id')) {
                        let actionEl = document.querySelector(`[data-id="${input.dataset.hideElementById}"]`);
                        
                        if(actionEl) {
                            actionEl.classList.remove('d-none');
                        }
                    }
    
                    if(input.hasAttribute('data-show-element-by-id')) {
                        let actionEl = document.querySelector(`[data-id="${input.dataset.showElementById}"]`);
                        if(actionEl) {
                            actionEl.classList.add('d-none');
                        }
                    }

                    if(input.hasAttribute('data-hide-elements-by-id')) {
                        let allId = input.dataset.hideElementsById.split(',').map(i => i.trim());
                        let actionElements = allId.map(id => document.querySelector(`[data-id="${id}"]`));
                        
                        actionElements.forEach(el => {
                            if(el) {
                                el.classList.remove('d-none');
                            }
                        })
                    }

                    if(input.hasAttribute('data-show-elements-by-id')) {
                        let allId = input.dataset.showElementsById.split(',').map(i => i.trim());
                        let actionElements = allId.map(id => document.querySelector(`[data-id="${id}"]`));
                        
                        actionElements.forEach(el => {
                            if(el) {
                                el.classList.add('d-none');
                            }
                        })
                    }
                }
            })
        })
    }
}   