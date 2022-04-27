'use strict';

/**
 * Класс представляет продукт
 */
class Product {
    qty = 1; // количество товара одного наименования
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}

let cart = []; // Сюда будем добавлять выбранные продукты
let totalCost = 0;
let productCount = 0;

/**
 * Функция округляет число до 2-х знаков после запятой
 */
function toFixed2(num) {
    let number = 0;
    number = +num;
    return number.toFixed(2);
}

/**
 * Функция добавления выбранного товара
 */
function addToCart(id, name, price) {
    // Проверяем, есть ли уже такой товар в массиве
    productCount++;
    const cartLineEls = document.querySelectorAll('.cartLine');
    let productExist = false;
    let productQty = 1;
    cart.forEach(product => {
        if (product.id === id) {
            productExist = true;
            product.qty++; // если уже есть, до добавляем кол-во
            cartLineEls.forEach(cartLine => {
                if (cartLine.dataset.id === id) {
                    cartLine.querySelector('.productQty').textContent = product.qty + 'шт.';
                    cartLine.querySelector('.price').textContent = '$' + toFixed2(product.price);
                    cartLine.querySelector('.totalPrice').textContent = '$' + toFixed2(product.price * product.qty);
                    totalCost += product.price * product.qty;
                }
            });
        }
    });
    // Если нет, то добавляем
    if (!productExist) {
        cart.push(new Product(id, name, price));
        let newLine = document.createElement('div');
        // Формируем новую строку продуктов в окне корзины
        newLine.innerHTML = `<div class="cartLine" data-id="${id}">` +
            `<div>${name}</div>` +
            `<div class="productQty">${productQty} шт.</div>` +
            `<div class="price">$${toFixed2(price)}</div>` +
            `<div class="totalPrice">$${toFixed2(price * productQty)}</div></div>`;
        document.querySelector('.cartHeader').after(newLine);
        totalCost += price * productQty;
    }
    document.querySelector('.totalCost').textContent = '$' + totalCost.toFixed(2);
    document.querySelector('.productCount').textContent = productCount;
}


document.querySelector('.featuredItems').addEventListener('click', event => {
    if (event.target.tagName === 'BUTTON') {
        // Тут мы ищем главного родителя нажатой кнопки
        let card = event.target;
        while (!card.classList.contains('featuredItem')) {
            card = card.parentNode;
        }
        addToCart(card.dataset.id, card.dataset.name, card.dataset.price);
    }
})