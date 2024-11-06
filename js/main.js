var productNameInput = document.getElementById("productNameInput");
var productPriceInput = document.getElementById("productPriceInput");
var productTypeInput = document.getElementById("productTypeInput");
var productDescInput = document.getElementById("productDescInput");
var searchInput = document.getElementById("searchInput");
var nameMsg = document.getElementById("nameMsg");
var addBtn=document.getElementById("addBtn")
var updateBtn=document.getElementById("updateBtn")
var indexUpdate=0
var productList = [];
if (localStorage.getItem("products") != null) {
  productList = JSON.parse(localStorage.getItem("products"));
  display();
}


function addProduct() {
  if (validationName()) {
    var product = {
      name: productNameInput.value,
      price: productPriceInput.value,
      type: productTypeInput.value,
      desc: productDescInput.value,
    };

    productList.push(product);
    localStorage.setItem("products", JSON.stringify(productList));
    display();
  productNameInput.classList.remove("is-valid");

    clearForm();
  }

}
function clearForm() {
  productNameInput.value = "";
  productPriceInput.value = "";
  productTypeInput.value = "";
  productDescInput.value = "";
}

function display() {
  var cartona = "";
  for (var i = 0; i < productList.length; i++) {
    cartona += `  <tr>
        <td>${i}</td>
        <td>${productList[i].name}</td>
        <td>${productList[i].price}</td>
        <td>${productList[i].type}</td>
        <td>${productList[i].desc}</td>
           <td><button class="btn btn-warning" onclick="setData(${i})">update</button>
            <button class="btn btn-danger" onclick="deleteProduct(${i})">delete</button></td>
    </tr>`;
  }
  document.getElementById("tableBody").innerHTML = cartona;
}
function deleteProduct(index) {
  productList.splice(index, 1);
  localStorage.setItem("products", JSON.stringify(productList));
  display();
}
function searchProduct() {
  var cartona = "";
  var term = searchInput.value;
  for (var i = 0; i < productList.length; i++) {
    if (productList[i].name.toLowerCase().includes(term.toLowerCase())) {
      cartona += `  <tr>
             <td>${i}</td>
             <td>${productList[i].name}</td>
             <td>${productList[i].price}</td>
             <td>${productList[i].type}</td>
             <td>${productList[i].desc}</td>
                <td><button class="btn btn-warning" onclick="setData(${i})>update</button>
                 <button class="btn btn-danger" onclick="deleteProduct(${i})">delete</button></td>
         </tr>`;
    }
  }
  document.getElementById("tableBody").innerHTML = cartona;
}
function setData(index){
indexUpdate=index
var currentProduct=productList[index]
productNameInput.value=currentProduct.name;
productPriceInput.value=currentProduct.price;
productTypeInput.value=currentProduct.type;
productDescInput.value=currentProduct.desc
addBtn.classList.add("d-none")
updateBtn.classList.remove("d-none")
}
function updateProduct(){
     var product = {
       name: productNameInput.value,
       price: productPriceInput.value,
       type: productTypeInput.value,
       desc: productDescInput.value,
     };

productList.splice(indexUpdate,1,product)
localStorage.setItem("products", JSON.stringify(productList));
addBtn.classList.remove("d-none");
updateBtn.classList.add("d-none");
display();
clearForm()
}



function validationName(){
var regex = /^[A-Z][a-z]{3,8}$/;
var text=productNameInput.value

if (regex.test(text)) {
  productNameInput.classList.add("is-valid");
  productNameInput.classList.remove("is-invalid");
  nameMsg.classList.add("d-none");

  return true

} else {
  productNameInput.classList.add("is-invalid");
  productNameInput.classList.remove("is-valid");
  nameMsg.classList.remove("d-none");
  return false

}

  
}

