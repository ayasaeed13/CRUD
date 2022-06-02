var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var taxes =document.getElementById("taxes");
var ads =document.getElementById("Ads");
var discount =document.getElementById("Discount");
var totalPrice =document.getElementById("total");
var productCategory = document.getElementById("productCategory");
var productDesc = document.getElementById("productDesc");
var usreInput = document.getElementById("searchname");
var inputcategory = document.getElementById("searchCategory");
var mainBtn = document.getElementById("mainBtn");
var scrollBtn = document.querySelector("#scrollBtn");
var productList , updateProductDataindex;

if (localStorage.getItem("productList") != null) {
    productList = JSON.parse(localStorage.getItem("productList"));
    displayProduct(productList);
} else {
    productList = [];
}

function addproduct() {
    if (mainBtn.innerText == "update"){
        updateProductData(updateProductDataindex);

    }else{
        var product = {
            name: productName.value,
            price: productPrice.value,
            tax:taxes.value,
            ads: ads.value,
            discount: discount.value,
            total: totalPrice.innerHTML,
            category: productCategory.value,
            desc: productDesc.value,
        }
        productList.push(product);
        addToLocalStorage()
        clearproduct();
        displayProduct(productList);
    }
}

function clearproduct() {
    productName.value = "";
    productPrice.value = "";
    taxes.value = "";
    ads.value="";
    discount.value="";
    totalPrice.innerHTML="";
    productCategory.value = "";
    productDesc.value = "";
}

function displayProduct(list) {
    var cartona = "";
    for (i = 0; i < list.length; i++) {
        cartona +=
            `<tr>
            <td>${i + 1}</td>
            <td>${list[i].name}</td>
            <td>${list[i].price}</td>
            <td>${list[i].tax}</td>
            <td>${list[i].ads}</td>
            <td>${list[i].discount}</td>
            <td>${list[i].total}</td>
            <td>${list[i].category}</td>
            <td>${list[i].desc}</td>
            <td> <button class="btn btn-info fw-bold" onclick="updateProduct(${i})"> updated </button> </td>
            <td> <button class="btn btn-danger fw-bold" onclick="deleteProduct(${i})"> Deleted </button> </td>
        </tr>`;
    }
    document.getElementById("myData").innerHTML = cartona;
}


function deleteProduct(deletedIndex) {
    productList.splice(deletedIndex, 1);
    displayProduct(productList);
    addToLocalStorage();
}

function addToLocalStorage() {
    localStorage.setItem("productList", JSON.stringify(productList));
}

function searchByName(searchedItem) {
    var searchedItem = [];
    for (var i = 0; i < productList.length; i++) {
        if (productList[i].name.toLowerCase().includes(usreInput.value.toLowerCase()))
            searchedItem.push(productList[i]);
        displayProduct(searchedItem);
    }

}

function updateProduct(updateIndex) {
    productName.value = productList[updateIndex].name;
    productPrice.value = productList[updateIndex].price;
    taxes.value = productList[updateIndex].tax;
    ads.value=productList[updateIndex].ads;
    discount.value=productList[updateIndex].discount;
    totalPrice.innerHTML=productList[updateIndex].total;
    productCategory.value = productList[updateIndex].category;
    productDesc.value = productList[updateIndex].desc;
    mainBtn.innerText="update" ;
    updateProductDataindex = updateIndex;
}

function updateProductData(updateProductDataindex){
   productList.splice (updateProductDataindex ,1,{name:productName.value , price :productPrice.value ,
    tax:taxes.value,ads:ads.value,discount:discount.value,total: totalPrice.innerHTML, 
    category:productCategory.value , desc:productDesc.value})
   displayProduct(productList);
   addToLocalStorage();
   clearproduct();
   mainBtn.innerText="Add Product"
   
}

window.onscroll = function() {scrollFunction()};
scrollBtn.onclick = function() {toUpPage()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    scrollBtn.style.display = "block";
  } else {
    scrollBtn.style.display = "none";
  }
}
function toUpPage(){
    window.scrollTo({
        top:0,
        left:0,
        behavior:"smooth",
    })
}

productPrice.addEventListener("keyup", getTotal);
ads.addEventListener("keyup" ,getTotal);
taxes.addEventListener("keyup", getTotal);
discount.addEventListener("keyup" ,getTotal);
function getTotal(){
    if(productPrice.value != "") {
        let result =(+productPrice.value + +taxes.value + +ads.value) - +discount.value ;
        totalPrice.innerHTML = result ;
        totalPrice.classList.backgroundColor = "#229f0f"
    }
    }

//validation for inputs and category limits