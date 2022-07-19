{
    let calendarCards = document.querySelectorAll('[data-calendar-card]');
    if(calendarCards.length) {
        calendarCards.forEach(calendarCard => {
            let list = calendarCard.querySelector('.calendar__list');
            if(list) {
                if(list.children.length > 4) {
                    calendarCard.classList.add('calendar__card--big')
                    let btn = calendarCard.querySelector('.calendar__more');
                    if(btn) {
                        btn.classList.remove('d-none');
                        btn.addEventListener('click', () => {
                            calendarCard.classList.toggle('calendar__card--open')
                        })
                    }
                }
            }
        })
    }
}