let auctionHistory = document.querySelector('[data-auction-history]');
if(auctionHistory) {
    let head = auctionHistory.querySelector('.auction-history__head');
    let listWrap = auctionHistory.querySelector('.auction-history__list-wrap');

    head.addEventListener('click', () => {
        auctionHistory.classList.toggle('auction-history--open');
        this.utils.slideToggle(listWrap, 300);
    })
}