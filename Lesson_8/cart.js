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
let totalCost = 0; // Общая сумма заказа
let productCount = 0; // Количество товаров в корзине

// Слушаем клик по корзинке
const cartContentEl = document.querySelector('.cartContent');
document.querySelector('.cartIconWrap').addEventListener('click', () => {
    cartContentEl.classList.toggle('hide');
});

/**
 * Метод добавления выбранного товара
 * @param {id: number, name: string, price: number} параметры товара
 */
function addToCart(id, name, price) {
    productCount++; // раз мы сюда попали, то товар мы точно добавили
    const cartLineEls = document.querySelectorAll('.cartLine');
    let productExist = false;
    // Проверяем, есть ли уже такой товар в массиве
    cart.forEach(product => {
        if (product.id === id) {
            productExist = true;
            product.qty++; // если уже есть, до добавляем кол-во
            // ищем нужную строку в блоке корзинки и редактируем содержимое
            cartLineEls.forEach(cartLine => {
                if (cartLine.dataset.id === id) {
                    cartLine.querySelector('.productQty').
                        textContent = product.qty + 'шт.';
                    cartLine.querySelector('.price').
                        textContent = '$' + price.toFixed(2);
                    cartLine.querySelector('.totalPrice').
                        textContent = '$' + (price * product.qty).toFixed(2);
                    totalCost += price * product.qty;
                }
            });
        }
    });
    // Если такого товара в нашем массиве нет, то добавляем
    if (!productExist) {
        cart.push(new Product(id, name, price));
        let newLine = document.createElement('div');
        // Формируем новую строку продуктов в окне корзины
        newLine.innerHTML = `<div class="cartLine" data-id="${id}">` +
            `<div>${name}</div>` +
            `<div class="productQty">1 шт.</div>` +
            `<div class="price">$${price.toFixed(2)}</div>` +
            `<div class="totalPrice">$${price.toFixed(2)}</div></div>`;
        document.querySelector('.cartHeader').after(newLine);
        totalCost += price;
    }
    // показываем общие параметры корзины: общую цену и количество
    document.querySelector('.totalCost').textContent = '$' + totalCost.toFixed(2);
    document.querySelector('.productCount').textContent = productCount;
}

// Тут слушаем клики внутри блока "featuredItems" отбрасывая лишние кнопки вовне
document.querySelector('.featuredItems').addEventListener('click', event => {
    if (event.target.tagName === 'BUTTON') {
        // Тут мы ищем главного родителя нажатой кнопки
        // сначала сделал так, но потом нашел вариант попроще 
        // while (!card.classList.contains('featuredItem')) {
        //     card = card.parentNode;
        // }
        let card = event.target.closest('.featuredItem');
        // если всё срослось, добавим товар
        if (card !== null)
            addToCart(card.dataset.id, card.dataset.name, +card.dataset.price);
    }
})