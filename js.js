let productsGrid = document.getElementById('products-grid');
let productsArray =[];
let xhr = new XMLHttpRequest();
let url = 'https://my-json-server.typicode.com/Mark1906/second-new';

xhr.open('GET',url + '/products');
xhr.responseType = 'json'
xhr.onload = function() {
       let poducts = xhr.response;
       productsGrid.innerHTML = null;
       productsArray.forEach(p => {
           productsArray.push(p);
           let pElem = document.createElement('div');
           pElem.classList.add('product');
           pElem.innerHTML =`
              <h2 class='product-name'>${p.name}</h2>
              <img class='product-photo' src='${p.photo-url}' alt='${p.name}'>
              <p class='product-price'><b>Description: </b>${p.description}</p>
              <button>Buy</button>
           `;  
           productsGrid.append(pElem); 
       });
}
xhr.send();