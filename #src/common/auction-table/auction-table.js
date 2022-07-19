{
    let auctionTableCards = document.querySelectorAll('[data-auction-table-card]');
    if(auctionTableCards.length) {
        auctionTableCards.forEach(auctionTableCard => {
            let head = auctionTableCard.querySelector('.auction-table-card__head-mob');
            let inner = auctionTableCard.querySelector('.auction-table-card__inner');

            if(head && inner) {
                head.addEventListener('click', () => {
                    auctionTableCard.classList.toggle('auction-table-card--open');
                    this.utils.slideToggle(inner, 300);
                });
            }
        });
    }
}