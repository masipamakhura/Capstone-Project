function updatePage() {

    let data = window.location.search.split('&');
    let image = document.querySelector('.product__picture img');
    let url = data[0].split('=')[1];
    let name = data[1].split('=')[1];
    let price = data[2].split('=')[1];
    let str = ` <ul> <li>${name}</li> <li>${price}</li> </ul>`;



    image.src = '/images/' + url;
    document.querySelector('.product__details').innerHTML = str;


    console.log(data)
        // data = window.location.pathname;
        // console.log(data)
}

window.onload = function() {

    updatePage();
}