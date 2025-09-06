let productsGrid=document.getElementById('products-grid');
let productsArray=[];
let xhr =new XMLHttpRequest();
let url = 'https://hellomynameis2000-9bc3.restdb.io/rest';
xhr.open('GET',url + '/product');

xhr.setRequestHeader("content-type", "application/json");
xhr.setRequestHeader("x-apikey", "68bc1846b349a356684b6ded");
xhr.setRequestHeader("cache-control", "no-cache");

xhr.send(data);

xhr.responseType='json'
xhr.onload=function(){
    let products=xhr.response;
    productsGrid.innerHTML=null;
    products.forEach(p=>{
        productsArray.push(p);
        let pElem=document.createElement('div');
        pElem.classList.add('product'
        );
        pElem.innerHTML=`
        <h2 class='product-name'>${p.name}</h2>
        <img class='product-photo' src='${p.photo_url}' alt ='${p.name}'>
        <p class='product-price'><b>Price: </b>${p.price}</p>
        <p class='product-description'><b>Description: </b>${p.description}</p>
        <br>
        <button onclick="addProductToCart('${p._id}')">Buy</button>
        `;
        productsGrid.append(pElem);
        });
}
xhr.send();
function openCart(){
    cartProd.classList.toggle('hide');
}

let cartProd = document.getElementById('cart-products');

let cart = [];
if(localStorage.getItem('cart')) {
    cart = JSON.parse(localStorage.getItem('cart'));
    drawCartProducts();
}

function deletProductToCart() {
cart = [];
      cartProd.innerHTML ='Корзина очишчена';
      localStorage.setItem("cart", '[]');    
}

function addProductToCart(id) {
    let product = productsArray.find(function(p) {
        return p.id == id;
    })
    cart.push(product);
    drawCartProducts();
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
            <p> ${p.name} |${p.price}PLN</p>
            <hr>          
        `;
        sum += p.price;
    });
    cartProd.innerHTML +=`
        <p>Сума: ${sum}PLN</p>
        <button onclick="buyAll()">Купити все</button>
        <button onclick="deleteAll()">Очистити кошик</button>
    `;
}

function buyAll() {
    model.style.display = "block";
    let sum = 0;
    orderBlock.innerHTML = null;

    cart.forEach(function(p){ 
    orderBlock.innerHTML += `
        <div class="item">
             <img width="100px" src="${p.photo_url}">
             <h2>${p.name} | ${p.price}PLN</h2>
        </div>     
    `;
    sum += +p.price;
   }); 
   document.getElementById('price').innerHTML = sum + 'PLN'; 
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