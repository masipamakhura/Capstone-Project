const discountValue = 0.30;
const deliveryCost = 40;
let totalPrice = 00;
let list = null;

function getCardInformation() {

    list = JSON.parse(localStorage.getItem('savedProducts'));

    if (list !== null || list !== undefined) {
        let temp = '';
        let listContainer = document.querySelector('.cart__products-list');
        for (let i = 0; i < list.length; i++) {

            str = `<div>${list[i].productName}</div>
             <div>${list[i].productPrice}</div>
            <div>${1}</div>
            <div>${list[i].productPrice}<div>`;

            listContainer.innerHTML = listContainer.innerHTML + str.trim('');



        }

    }
}

function calcAmountAfterDiscount(amount) {

    return amount - (amount * discountValue);
}

function calcTotalPrice() {
    let total = 0;

    if (list !== null) {
        console.log(list)

        for (let i = 0; i < list.length; i++) {

            let temp = list[i]['productPrice'].slice(1)
            total += parseFloat(temp)


        }
    }
    document.querySelector('.cart__checkout-total').innerHTML = 'TOTAL : R' + total
    return total;
}

function updateFinalPrice() {


    document.querySelector('.cart__checkout-total').innerHTML = 'TOTAL : R' + localStorage.getItem('total');





}


/*
function toggleForm() {

    let button = document.querySelector('.toggle-form');
    let form = document.querySelector('form');
    form.querySelector('div[type="button"]').addEventListener('click', function() {
        updateFinalPrice();
    })
    button.addEventListener('click', function() {

        let overlay = document.querySelector('.overlay__container');
        document.querySelector('.btn-close').addEventListener('click', function() {
            overlay.classList.remove('overlay-open');
            overlay.classList.add('overlay-closed')
        })
        if (overlay.classList.contains('overlay-closed')) {
            overlay.classList.remove('overlay-closed');
            overlay.classList.add('overlay-open')
        } else {
            overlay.classList.remove('overlay-open')
            overlay.classList.add('overlay-closed')
        }
    })
}
*/

window.onload = function() {
    getCardInformation();
    updateFinalPrice();

}