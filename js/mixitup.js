import {targetRopa} from './dataTarget.js';


const contentProducts = document.querySelector('#contentProducts');
const bolsaCompras = document.querySelector('.bolsa_compras');
const containerShopping = document.querySelector('.container_shopping');
const contentShopping = document.querySelector('.content_shopping');
const shoppingTotal = document.querySelector('.shopping_total');
const btnBuy = document.querySelector('#btnBuy');
const infoQuantityProduct = document.querySelector('.infoQuantityProduct')


const shoppingObj = {};

contentShopping.addEventListener(('click'), (event) => {
    if(event.target.classList.contains('rest')) {

        const id = parseInt(event.target.parentElement.id);

        shoppingObj[id].amount--;
    }

    if(event.target.classList.contains('add')) {

        const id = parseInt(event.target.parentElement.id);

        if(shoppingObj[id].stock > shoppingObj[id].amount) {
            shoppingObj[id].amount++
        } else {
            alert('ya no hay nada!!!')
        }

        // shoppingObj[id].amount++;
    }

    if(event.target.classList.contains('del')) {

        const id = parseInt(event.target.parentElement.id);

        delete shoppingObj[id];
    }

    amountProductInCar();
    printTotalPrice();
    printShoppingCar();
})

contentProducts.addEventListener(('click'), (event) => {
    if (event.target.classList.contains('add_principal')) {
        const id = parseInt(event.target.parentElement.id);

        const [currentProduct] = targetRopa.filter((n) => n.id === id);

        if (shoppingObj[id]) {
            if(shoppingObj[id].stock > shoppingObj[id].amount) {
                shoppingObj[id].amount++
            } else {
                alert('ya no hay nada!!!')
            }
        }else {
            shoppingObj[id] = currentProduct;
            shoppingObj[id].amount = 1;
        }

        
        
        amountProductInCar();
        printTotalPrice();
        printShoppingCar();
        printCard();
    }
})



bolsaCompras.addEventListener('click', () => {
    containerShopping.classList.toggle("mostrar_carshopping")
});

function amountProductInCar() {
    // const infoQuantityProduct = document.querySelector('.infoQuantityProduct');

    infoQuantityProduct.textContent =  Object.values(shoppingObj).length;
}

function printTotalPrice() {
    const shoppingArray = Object.values(shoppingObj);

    let suma = 0;

    shoppingArray.forEach((n) => {
        suma = n.amount * n.price
    })

    shoppingTotal.textContent = suma;
}

function printShoppingCar() {
    const shoppinArray = Object.values(shoppingObj);


    let html = '';

    shoppinArray.forEach(({id,ruta, classFilter,price,stock,amount,name}) => {
        html += `<div class="shopping">
                    <div class="shopping_header">
                        <div class="shopping_img">
                            <img src="${ruta}" alt="${name}">
                        </div>
                        <div class="shopping_info">
                            <p>Nombre ${name}</p>
                            <p>Precio ${price}</p>
                            <p>Stock ${stock}</p>
                        </div>
                    </div>
                    <div class="shopping_actions" id="${id}">
                        <span class="rest">-</span>
                        <span class="amount">${amount}</span>
                        <span class="add">+</span>
                        <i class='bx bx-trash del'>
                    </div>
                </div>`;
    })
    contentShopping.innerHTML = html;
}


// funcion para mostrar las tarjetas del los productos
function printCard() {
    let html = '';

    targetRopa.forEach(({id,ruta, classFilter,price,stock}) => {
        html += `<div class="element ${classFilter}">
                    <img src="${ruta}" alt="">
                    <div class="pie_product">
                        <div class="price_stock">
                            <h3>${price}</h3>
                            <span>stock: ${stock}</span>
                        </div>
                        <span>Hoodies</span>
                    </div>
                    <div class="btn_mas" id="${id}">
                        <button class="add_principal">+</button>
                    </div>
                </div>`;
    })

    contentProducts.innerHTML = html
}

printCard();

mixitup(".content_element", {
    selectors: {
        target: '.element'
    },
    animation: {
        duration: 300
    }
}).filter('all')

btnBuy.addEventListener('click', () => {
    // const infoQuantityProduct = document.querySelector('.infoQuantityProduct');

    const res = confirm('tu compra esta lista');

    if(res) {
        shoppingTotal.textContent = 0;
        infoQuantityProduct.textContent = 0;
    }
    
})