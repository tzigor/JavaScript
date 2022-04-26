'use strict';

class Product {

}

document.querySelector('.featuredItems').addEventListener('click', event => {
    if (event.target.tagName === 'BUTTON') {
        console.log(event.target.parentNode.parentNode.parentNode.dataset.id);
        console.log(event.target.parentNode.parentNode.parentNode.dataset.name);
        console.log(event.target.parentNode.parentNode.parentNode.dataset.price);
    }
})