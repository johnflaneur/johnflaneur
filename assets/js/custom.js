// Products and shopping cart
const openCart = document.querySelector('#cart-btn');
const closeCart = document.querySelector('.close__cart');
const productDOM = document.querySelector('.product__center');
const cartDOM = document.querySelector('.cart__center');
const itemsTotal = document.querySelector('.item__total');
const cartTotal = document.querySelector('.cart__total');

let cart = [];

let buttonDOM = [];

// UI
class UI{
    displayProduct(obj){
        let results = '';
        obj.forEach(({precio, id, title, picture})=>{
            results += `
                <div class="container ">
                    <div class="row">
                    <div class="col-md-4">
                        <div class="card mb-4 product-wap rounded-0 d-flex align-items-between">
                    <div class="card rounded-0">
                        <img class="card-img rounded-0 img-fluid" src="${picture}">
                        <div class="card-img-overlay rounded-0 product-overlay d-flex align-items-between justify-content-center">
                            <ul class="list-unstyled">
                                <li><a class="btn btn-success text-white" href="shop-single.html"><i class="far fa-heart"></i></a></li>
                                <li><a class="btn btn-success text-white mt-2" href="shop-single.html"><i class="far fa-eye"></i></a></li>
                                <li><button data-id= "${id}" class="btnn btn btn-success text-white mt-2"><i class="fas fa-cart-plus"></i></button></li>
                            </ul>
                        </div>
                    </div>
                    <div class="card-body">
                        <a href="shop-single.html" class="h3 text-decoration-none">${title}</a>
                        <ul class="w-100 list-unstyled d-flex justify-content-between mb-0">
                            <li>100-50 Grs</li>
                            <li class="pt-2">
                                <span class="product-color-dot color-dot-red float-left rounded-circle ml-1"></span>
                                <span class="product-color-dot color-dot-blue float-left rounded-circle ml-1"></span>
                                <span class="product-color-dot color-dot-black float-left rounded-circle ml-1"></span>
                                <span class="product-color-dot color-dot-light float-left rounded-circle ml-1"></span>
                                <span class="product-color-dot color-dot-green float-left rounded-circle ml-1"></span>
                            </li>
                        </ul>
                        <ul class="list-unstyled d-flex justify-content-center mb-1">
                            <li>
                                <i class="text-warning fas fa-sun"></i>
                            <i class="text-warning fas fa-sun"></i>
                            <i class="text-warning fas fa-sun"></i>
                            <i class="text-warning fas fa-sun"></i>
                            <i class="text-warning fas fa-sun"></i>
                            </li>
                        </ul>
                        <p class="text-center mb-0">$${precio}</p>
                    </div>
                </div>
                </div>
            </div></div>` 
        });
        productDOM.innerHTML = results;
    }
    getButtons(){
        const buttons = [...document.querySelectorAll('.btnn')];
        
        buttonDOM = buttons;

        buttons.forEach(button => {
            const id = button.dataset.id;
            const inCart = cart.find(item => item.id === id);

            if(inCart){
                button.innerText = 'In Cart';
                button.disabled = true;
            }

            button.addEventListener('click', (e) =>{
                e.preventDefault();
                e.target.innerText = 'In Cart';
                e.target.disabled = true;

                const cartItem = { ...Storage.getProducts(id), amount: 1};
                console.log(cartItem);
                
                cart = [... cart, cartItem];

                Storage.saveCart(cart);

                this.setItemValues(cart);

                this.addToCart(cartItem)
            })
        })
    }
    setItemValues(cart){
        let tempTotal = 0;
        let itemTotal = 0;
        
        cart.map(item =>{
            tempTotal += item.precio * item.amount;
            itemTotal += item.amount;
        });

        itemsTotal.innerText = itemTotal;
        cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
        }

        addToCart(title, precio, picture, id){
        let div = document.createElement('div');
        div.classList.add('cart__item');

            div.innerHTML = ` <img src=${picture} alt="">
            <div>
              <h3>${title}</h3>
              <h3 class="price">$${precio}</h3>
            </div>
            <div>
              <span data-id=${id}>
              <span class="remove__item">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/>
</svg>
              </span>
              <p>1</p>
              <span data-id=${id}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
            </svg>
              </span>
            </div>
            <div>
            <span class="remove__item">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
          </svg>
          </span>
            </div>`

            cartDOM.appendChild(div);
        }
};

// localStorage
class Storage{
    static saveProducts(obj){
        localStorage.setItem('products', JSON.stringify(obj));
    }; 

    static saveCart(cart){
        localStorage.setItem('carts', JSON.stringify(cart));
    }
    static getProducts(id){
        const products = JSON.parse(localStorage.getItem('products'));
        return products.find(item => item.id === parseInt(id));

    }
};

// Productos
class Products{
async getProducts(){
try{
    const results = await fetch('api.json');
    const data = await results.json();
    const products = data.items;
    return products;
} catch (err){
    console.log(err);
}
}
};

document.addEventListener('DOMContentLoaded', async () =>{
    const ui = new UI();
    const products = new Products();

    const productsObj = await products.getProducts();
    ui.displayProduct(productsObj);
    ui.getButtons();
    Storage.saveProducts(productsObj); 
});


//API MERCADOPAGO
const finalizarCompra = async () => {

    const itemsAMPago = carrito.map( (prod) => {
        return {
            title: prod.nombre,
            description: "",
            picture_url: "",
            category_id: prod.id,
            quantity: prod.cantidad,
            currency_id: "ARS",
            unit_price: prod.precio
        }
    })
    const responseAPIMPago = await fetch('https://api.mercadopago.com/checkout/preferences', {
                method: 'POST',
                headers: {
                    Authorization: "Bearer TEST-1974925028503957-110423-1b4639cbbe186d505ba5f69dc49eae31-67920033"
                },
                body: JSON.stringify({
                    items: itemsAMPago,
                    back_urls: {
                        success: window.location.href,
                        failure: window.location.href
                    }

                })
            })
    const dataMPAgo = await responseAPIMPago.json()

    window.location.replace(dataMPAgo.init_point)
}


const guardarLocalStorage = (pVarString, pVarAlLS, pKey, pVarLS) => {
  pVarString = JSON.stringify(pVarAlLS);
  pVarLS = localStorage.setItem(pKey, pVarString);
};

const eliminarLocalStorage = (pVariable, pKey, pVarParse) => {
  pVariable = localStorage.removeItem(pKey, pVarParse);
};