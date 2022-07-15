// hacemos un arreglo, que maneje ID´s
const arrayFoods = [
    {
        id: 0,
        name: 'comida1',
        price: 2500,
        stock:10,
        img: '../carrito/images/img1.png',
    },
    {
        id: 1,
        name: 'comida2',
        price: 1500,
        stock:4,
        img: '../carrito/images/img2.png',
    },
    {
        id: 2,
        name: 'comida3',
        price: 23500,
        stock:7,
        img: '../carrito/images/img3.png',
    },
    {
        id: 3,
        name: 'comida4',
        price: 22500,
        stock:5,
        img: '../carrito/images/img4.png',
    },
    {
        id: 4,
        name: 'comida5',
        price: 2600,
        stock:9,
        img: '../carrito/images/img5.png',
    },
    {
        id: 5,
        name: 'comida6',
        price: 28800,
        stock:3,
        img: '../carrito/images/img6.png',
    },
    {
        id: 6,
        name: 'comida7',
        price: 25300,
        stock:5,
        img: '../carrito/images/img7.png',
    },
    {
        id: 7,
        name: 'comida8',
        price: 3400,
        stock:8,
        img: '../carrito/images/img8.png',
    },
];

const order = {}

document.addEventListener(('DOMContentLoaded'), function() {
    document.addEventListener(('click'), function(event) {
        if (event.target.classList.contains('btn')) {
            const idUser = event.target.parentElement.dataset.iduser;

            let currentFood = null;

            // console.log(arrayFoods[0].id,idUser);
            for (let i = 0; i < arrayFoods.length; i++) {
                if (arrayFoods[i].id === parseInt(idUser)) {
                    currentFood = arrayFoods[i];
                }
            }

            if(order[currentFood.id]) {
                // aqui hacemos la validacion de la cantidad del stock por las que se pidieron
                if (
                    order[currentFood.id].amount === order[currentFood.id].stock
                ) {  
                    alert('No hay mas platos');
                    return;  
                } 
                        
                order[currentFood.id].amount++;
            }else {
                order[currentFood.id] = currentFood;
                order[currentFood.id].amount = 1;
            }

            const amount = document.querySelector('#amount');
            amount.textContent = Object.entries(order).length;

        }
    })
    prinCardFood ();

    openCloseCart();
})

// creamos una funcion donde copiamos todo el codigo para las tajetas y despues solo mandamos a llamar la funcion dentro del addEventListener
function prinCardFood () {
    const foods = document.querySelector('.foods');

    let html = "";

    for (let i = 0; i < arrayFoods.length; i++) {
        // para no crear una por una de las tarjetas, pero primero se maqueta en html
        html += `<div class="food">
                    <div class="food_img">
                        <img src='${arrayFoods[i].img}' alt='${arrayFoods[i].name}'>
                    </div>
                    <div class="food_info">
                        <p>nombre:${arrayFoods[i].name}</p>
                        <p>precio:${arrayFoods[i].price}</p>
                        <p><small>stock:${arrayFoods[i].stock}</small></p>
                    </div>
                    <div class="food_actions" data-iduser = '${arrayFoods[i].id}'>
                        <button class="btn">agregar</button>
                    </div>
                    </div>`;
        
    }

    foods.innerHTML = html;
}

// creamos esta funcion para la entrada y salida del sidebar
function openCloseCart() {
    // a este le asigamos la clase cuando va a estar abierto y cuando cerrado
    const sidebarCart = document.querySelector('.sidebar_cart');
    // a este le asignamos el evento del click
    const shopping = document.querySelector('.shopping');

    shopping.addEventListener('click', function() {
        sidebarCart.classList.toggle('show_sidebar_cart');
    })
}