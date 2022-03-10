// GLOBAL VARIABLES
let count = 0;
let itemsInCard = [];
let discountPercentage = 30;
const deliveryCost = 25;

//THE FOLLOWING FUNCTION GET ALL ITEMS ADDED TO CARD AND ASSINGS THEM TO COUNT VARIABLE 
function updateCard() {


    if (localStorage.getItem('savedProducts') !== null) { // CHECK IF SAVED PRODUCTS ARRAY FROM LOCALSTORAGE IS DEFINED THEN DO OPPERATIONS ON IT
        document.querySelector('#card').innerHTML = JSON.parse(localStorage.getItem('savedProducts')).length; //CONVERTS JSON OBJECT TO JAVASCRIPT OBJECTS
        count = JSON.parse(localStorage.getItem('savedProducts')).length;
    }


}

//THE FOLLOWING FUNCTION GENERATE UNIQUE ORDER CODE FOR EVERY CONFIRMED ORDER ON A TIME STAMP 

function generateCode() {
    let num = Math.floor((Math.random() * 10) + 1);
    let timeStamp = new Date().getTime();
    return num.toString() + timeStamp
}

// THE FOLLOWING FUNCTION ADDS ITEMS TO CARD AND UPDATE LOCAL STORAGE ,IT ASO REGISTERS CLICK EVENT ON EVERY MENU ITEM IN THE PAGE 
//IT RECEIVES A CALLBACK FUNCTION THAT IS CALLED ON EVERY CLICK EVENT OF EACT MENU ITEM IN PARTICULA THE ADD TO CARD BUTTON ON THE
function quickAddToCard(callback) {
    let btnCollection = [...document.querySelectorAll(".btn-cart")];
    for (let i = 0; i < btnCollection.length; i++) {
        btnCollection[i].addEventListener("click", function(ev) {
            let productName =
                ev.target.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML;
            let productPrice = ev.target.previousElementSibling.previousElementSibling.innerHTML;

            if (productName != "undefined" && productPrice != undefined) {
                count++;
                document.getElementById("card").textContent = count;
                document.getElementById("card").style.color = "red";

                console.log({ productName: productName, productPrice: productPrice });
                itemsInCard.push({
                    productName: productName,
                    productPrice: productPrice,
                });
                saveCardDetails(itemsInCard)
                callback(itemsInCard);
                return itemsInCard;
            }
        });
    }
}

// THE FOLLOWING GETS TOTAL NUMBER OF ORDERS AND CALCULATES THE TOTAL COST 

function displayTotalPrice(arr) {
    let sum = 0;

    arr.forEach((element) => {
        let priceArr = element.productPrice.split("R")[1];

        sum = sum + parseFloat(priceArr);
    });
    alert("Current total is R " + sum.toFixed(2).toString());

    return sum.toFixed(2);
}

//THIS FUNCTION CREATES LOCALSTORAGE AND STORES DATA INTO THAT OBJECT
function saveCardDetails(arr) {

    let collec = JSON.parse(localStorage.getItem("savedProducts"));

    if (collec === null) {
        localStorage.setItem("savedProducts", JSON.stringify(arr));


    } else {

        localStorage.setItem("savedProducts", JSON.stringify(arr))
    }


}

//THE FOLLOWING FUNCTION DISPLAYS AND HIDES A FORM THAT HAS DELIVERY OPTIONS DISCOUNT OFFERS
function toggleForm() {

    let button = document.querySelector('.btn-options');


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

//THE FOLLOVING FUNCTION GETS DELIVERY OPTIONS CHOSEN FROM A  A MODAL FORM TOGGLED BY ABOVE TOGGLE FUNCTION
function getDeliveryInformation(total) {


    let yes = document.querySelector('#discountYes');
    let no = document.querySelector('#discountNo');
    let selfCollection = document.querySelector('#deliveryCollection');
    let deliveryService = document.querySelector('#delivery');

    if (yes['checked'] === true) {

        total = total - (total * discountPercentage / 100);
    } else if (no['checked'] === true) {

        total = total - (total * 0 / 100);
    }

    if (selfCollection['checked'] === true) {

        total = total + 0;

    } else if (deliveryService['checked'] === true) {
        total = total + deliveryCost;
    }
    console.log("total >> ", total)

    localStorage.setItem("total", total);
    return total;

}

// THE FOLLOWING FUNCTION ADDS REGISTERS EVENTS ON THE PAGE AMD PLAY SOME ANIMATED  FROP DOWN ACCORDION
function pageEv() {

    document.querySelector('.btn.btn-outline-success').addEventListener('click', function(ev) {

        ev.preventDefault();
        getDeliveryInformation(displayTotalPrice(JSON.parse(localStorage.getItem('savedProducts'))))

    })

    document.querySelector('.btn.btn-outline-info').addEventListener('click', function() {

        alert("Here is your order reference number \n" + generateCode())
        document.querySelector('.btn-close').click()

    })

    $('.banner-contents__discount').click(function() {
        $('.banner-contents__discount').hide()
    })
    $('#menu').click(function() {
        $('.innerMenu').toggle()
    })

    $('.toggle').click(function(e) {
        e.preventDefault();

        let $this = $(this);

        if ($this.next().hasClass('show')) {
            $this.next().removeClass('show');
            $this.next().slideUp(350);
        } else {
            $this.parent().parent().find('li .inner').removeClass('show');
            $this.parent().parent().find('li .inner').slideUp(350);
            $this.next().toggleClass('show');
            $this.next().slideToggle(350);
        }
    });
}

window.onload = function() {
    quickAddToCard(displayTotalPrice);

    toggleForm();
    pageEv()
    updateCard();
};