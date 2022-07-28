{
    let rangeAll = document.querySelectorAll('[data-range]');
    if (rangeAll.length) {
        rangeAll.forEach(range => {
            let min = range.dataset.min;
            let max = range.dataset.max;
            let numStart = range.dataset.start;
            let numEnd = range.dataset.end;
            let step = range.dataset.step;
            let slider = range.querySelector('.price-range__slider');
            let inputStart = range.querySelector('.price-range__input--start');
            let inputEnd = range.querySelector('.price-range__input--end');
            let elStart = range.querySelector('.price-range__start-value');
            let elEnd = range.querySelector('.price-range__end-value');

            let qualityRange = range.dataset.range === 'quality' ? true : false;
            let oneThumb = range.dataset.range === 'one-thumb' ? true : false;

            noUiSlider.create(slider, {
                start: oneThumb ? +numStart : [+numStart, +numEnd],
                connect: oneThumb ? 'lower' : true,
                range: {
                    'min': [+min],
                    'max': [+max],
                },
                step: +step,
                tooltips: oneThumb,
                format: wNumb({
                    decimals: qualityRange ? 1 : 0,
                    thousand: oneThumb ? ',' : '',
                    prefix: oneThumb ? '$' : ''
                })
            });

            this.allRangeSliders.push({slider, min, max});

            let numFormat = wNumb({ decimals: 0, prefix: '$' });

            slider.noUiSlider.on('update', function (values, handle) {
                let value = values[handle].replace(/[,|$]/g, '');
                if (handle) {
                    if(qualityRange) {
                        inputEnd.value = value;
                        elEnd.innerHTML = value;
                    } else if(oneThumb) {
                        inputEnd.value = Math.round(value);
                    } else {
                        inputEnd.value = Math.round(value);
                        elEnd.innerHTML = numFormat.to(+value);
                    }
                } else {
                    if(qualityRange) {
                        inputStart.value = value;
                        elStart.innerHTML = value;
                    } else if(oneThumb) {
                        inputStart.value = Math.round(value);
                    } else {
                        inputStart.value = Math.round(value);
                        elStart.innerHTML = numFormat.to(+value);
                    }
                }


                if(document.documentElement.clientWidth >= 768) {
                    if((value / +max * 100) < 20) {
                        range.classList.add('price-range--start');
                    } else {
                        range.classList.remove('price-range--start');
                    }
    
                    if((value / +max * 100) > 80) {
                        range.classList.add('price-range--end');
                    } else {
                        range.classList.remove('price-range--end');
                    }
                } else {
                    if((value / +max * 100) < 30) {
                        range.classList.add('price-range--start');
                    } else {
                        range.classList.remove('price-range--start');
                    }
    
                    if((value / +max * 100) > 60) {
                        range.classList.add('price-range--end');
                    } else {
                        range.classList.remove('price-range--end');
                    }
                }
            }); 

            slider.noUiSlider.on('change', (values, handle) => {
                let value = values[handle];
                if (handle) {
                    let event = new Event("change", { bubbles: true });
                    inputEnd.dispatchEvent(event);
                } else {
                    let event = new Event("change", { bubbles: true });
                    inputStart.dispatchEvent(event);
                }

            })

            inputStart.addEventListener('change', function () {
                slider.noUiSlider.set([this.value, null]);
            });
            inputEnd.addEventListener('change', function () {
                slider.noUiSlider.set([null, this.value]);
            });
        })
    }

}
