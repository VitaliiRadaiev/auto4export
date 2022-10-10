{
    let calendarCards = document.querySelectorAll('[data-calendar-card]');
    if(calendarCards.length) {
        calendarCards.forEach(calendarCard => {
            let list = calendarCard.querySelector('.calendar__list');
            if(list) {
                if(list.children.length > 3) {
                    let collapseList = document.createElement('ul');
                    collapseList.className = 'calendar__list calendar__list--collapse';
                    collapseList.append(...Array.from(list.children).slice(3));
                    list.after(collapseList);

                    let btn = calendarCard.querySelector('.calendar__more');
                    if(btn) {
                        btn.classList.add('calendar__more--visible');
                        btn.addEventListener('click', () => {
                            btn.classList.toggle('calendar__more--list-open');
                            this.utils.slideToggle(collapseList, 300);
                        })
                    }
                }
            }
        })
    }
}