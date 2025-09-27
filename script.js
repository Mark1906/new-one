let productsGrid = document.getElementById('products-grid');
let productsArray = [];
let xhr = new XMLHttpRequest();
let url = 'https://newdatabase-f3aa.restdb.io/rest';

xhr.open("GET",url+'/product');

xhr.setRequestHeader("content-hype", "application/json");
xhr.setRequestHeader("x-apikey", "63f1dd07478852088da68441");
xhr.setRequestHeader("cache-control", "no-cache");

xhr.responseType = 'json'
xhr.onload = function() {
    productsArray = xhr.response
    productsGrid.innerHTML = null;
    productsArray.forEach(p => {
        productsArray.push(p);
        let pElem = document.createElement('div');
        pElem.classList.add('product');
        pElem.innerHTML =`
            <h2 class='product-name'>${p.name}</h2>
            <img class='product-photo' src='${p.photo_url}' alt='${p.name}'>
            <p class='product-price'><b>Ціна: </b>${p.price}PLN</p>
            <p class='product-descripton'><b>Опис: </b>${p.description}</p>
            <br>
            <button onclick="addProductToCart('${p._id}')>Купити</button>
        `;
    });
}
xhr.send();

let cartProd = document.getElementById('cart-products');

let cart = [];
if(localStorage.getItem('cart')) {
    cart = JSON.parse(localStorage.getItem('cart'));
    drawCatProducts();
}

function deletProductToCart() {
    cart = [];
          cartProd.innerHTML = 'Корзина очищена';
          localStorage.setItem("cart", '[]');
}

function addProductToCart(id) {
    let product = productsArray.find(function(p) {
        return p._id == id;
    })
    cart.push(product);
    drawCartProduct();
    localStorage.setItem("cart", JSON.stringify(cart));

    document.getElementById('cart-button').classList.add('active');
    setTimeout(function(){
        document.getElementById('cart-button').classList.remove('active');
    },500);
}

function drawCartProducts() {
    if(cart.length === 0) return cartProd.innerHTML = 'Cart is empty';
    cartProd.innerHTML = null;
    let sum = 0;
    cart.forEach(function(p){
        cartProd.innerHTML +=`
            <p><img src="${p.photo_url}"> ${p.name} |${p.price}PLN</p>
            <hr>
        `;
        sum += +p.price;
    });
    cartProd.innerHTML +=`
        <p>Сума: ${sum}PLN</p>
        <button onclick="buyAll()">Купити все</button>
        <button onclick="deletAll()">Очистити кошик</button>
    `;
}

let orderBlock = document.getElementById('order-block');

let modal = document.getElementById('myModal');

let span = document.getElementsByClassName('close')[0];

span.onclick = function() {
    modal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

function buyAll() {
    modal.style.display = "block";
    let sum = 0;
    orderBlock.innerHTML = null;

    cart.forEach(function(p){
        orderBlock.innerHTML +=`
            <div class="item">
                 <img width="100px" src="${p.photo_url}">
                 <h2>${p.name} | ${p.price}PLN</h2>
            </div>     
        `;
        sum +=p.price;
    });
    document.getElementById('price').innerHTML = sum + 'PLN';
}

function deletAll() {
    cart = [];
          cartProd.innerHTML = 'Корзина очищена';
          localStorage.setItem("cart", '[]');
}

function openCart() {
    cartProd.classList.toggle('hide');            
}

document.getElementById('order-form').addEventListener('submit', function(e){ 
    e.preventDefault();//
    let data = JSON.stringify({
        "name": e.target['name'].value,
        "address": e.target['address'].value,
        "phone": e.target['phone'].value,
        "post_number": e.target['post_number'].value,
        "status": "New",
        "products": localStorage.getItem('cart')
    });
    
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url+'/orders');
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("x-apikey", "63f1dd07478852088da68441");
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.send(data);


    modal.style.display = "none";
    cart = [];
    cartProd.innerHTML = 'Замовлення оформлено';
    localStorage.setItem("cart", '[]')
 })








