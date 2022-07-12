const setSize = (borderDashed, svg) => {
    let w = borderDashed.clientWidth;
    let h = borderDashed.clientHeight
    
    svg.setAttribute('viewBox', `0 0 ${w} ${h}`);

    if(borderDashed.dataset.borderDashed === 'top-right') {
        svg.innerHTML = `
        <path fill-rule="evenodd" clip-rule="evenodd"
        d="M2 28 Q 2 18  12 18 H${w - 18} L${w - 2} 2 L${w - 2} ${h - 12} Q ${w - 2} ${h - 8} ${w - 12} ${h - 2} L12 ${h - 2} Q 2 ${h - 8} 2 ${h - 12} z"
        stroke="#D4D9DB" stroke-width="3" stroke-linecap="round" stroke-dasharray="0.1 8" />
        `
    } else if (borderDashed.dataset.borderDashed === 'top-left') {

        if(document.documentElement.clientWidth < 992) {
            svg.innerHTML = `
            <path fill-rule="evenodd" clip-rule="evenodd"
            d="M12 2 H${w - 12} Q ${w - 2} 8 ${w - 2} 12 L ${w -2} ${h - 12} Q ${w - 2} ${h - 8} ${w - 12} ${h - 2} L 12 ${h - 2} Q 2 ${h - 8} 2 ${h - 12} L 2 12 Q 8 2 12 2 z"
            stroke="#D4D9DB" stroke-width="3" stroke-linecap="round" stroke-dasharray="0.1 8" />
            `

            return;
        }

        svg.innerHTML = `
        <path fill-rule="evenodd" clip-rule="evenodd"
        d="M2 2 H${w - 12} Q ${w - 2} 8 ${w - 2} 12 L ${w -2} ${h - 12} Q ${w - 2} ${h - 8} ${w - 12} ${h - 2} L 18 ${h - 2} Q 10 ${h - 8} 10 ${h - 12} L 10 12 z"
        stroke="#D4D9DB" stroke-width="3" stroke-linecap="round" stroke-dasharray="0.1 8" />
        `
    } else if (borderDashed.dataset.borderDashed === 'top-left-top') {
        
        svg.innerHTML = `
        <path fill-rule="evenodd" clip-rule="evenodd"
        d="M2 2 L 12 10 H${w-12} Q ${w-2} 15 ${w-2} 20 L ${w-2} ${h-12} Q ${w-8} ${h-2} ${w-12} ${h-2} L 12 ${h-2} Q 2 ${h-8} 2 ${h-12} z"
        stroke="#D4D9DB" stroke-width="3" stroke-linecap="round" stroke-dasharray="0.1 8" />
        `
    }
}

let borderDashedAll = document.querySelectorAll('[data-border-dashed]');
if (borderDashedAll.length) {
    borderDashedAll.forEach(borderDashed => {
        // init
        borderDashed.insertAdjacentHTML('afterBegin', `
        <svg class="border-dashed" viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd"
            d="M2 28 Q 2 18  12 18 H302 L318 2 L318 308 Q 318 312 308 318 L12 318 Q 2 312 2 308 z"
            stroke="#D4D9DB" stroke-width="3" stroke-linecap="round" stroke-dasharray="0.1 8" />
        </svg>
        `)
        let svg = borderDashed.querySelector('.border-dashed');

        setSize(borderDashed, svg);

        window.addEventListener('resize', () => {
            setSize(borderDashed, svg);
        });
    })

    window.borderDashed = {
        update() {
            let id = setInterval(() => {
                borderDashedAll.forEach(borderDashed => {
                    let svg = borderDashed.querySelector('.border-dashed');
                    setSize(borderDashed, svg);
                })
            }, 40)
            setTimeout(() => {
                clearInterval(id);
            },1000)
        }
    }
}