var ProdName = document.getElementById("ProdName");
var ProdPrice = document.getElementById("ProdPrice");
var ProdCategory = document.getElementById("ProdCategory");
var ProdDescription = document.getElementById("ProdDescription");
var productImg = document.getElementById("productImg");

//for update operation
var btnAdd = document.getElementById("btnAddUpdate");
let btnstatus = "Create";
let proId;

var ProductContainer; //array
if (localStorage.getItem("ProductData") == null) {
  ProductContainer = []; //empty array
} else {
  ProductContainer = JSON.parse(localStorage.getItem("ProductData"));
  DisplayProducts();
}

function AddProduct() {
  console.log(productImg.files[0].name);
  if (ChechInputs() == true) {
    if (ValidOrNot() == true) {
      var product = {
        name: ProdName.value,
        price: ProdPrice.value,
        category: ProdCategory.value,
        description: ProdDescription.value,
        image: `Images/Products/${productImg.files[0].name}`,
      };

      //if add or update
      if (btnstatus === "Create") {
        ProductContainer.push(product);
      }
      //update
      else {
        btnAdd.innerHTML = "Add product";
        ProductContainer[proId] = product;
        btnstatus = "Create";
      }
    } else {
      alert("product name invalid");
    }

    console.log(ProductContainer);
    DisplayProducts();
    localStorage.setItem("ProductData", JSON.stringify(ProductContainer));
    ClearForm();
  } else {
    alert("you must fill all data");
  }
}

//LocalStorage
// localStorage.setItem("name","Hazonbol")
// alert(localStorage.getItem("name"))
// alert(localStorage.length)
// localStorage.removeItem("name ")
// localStorage.clear();

function ClearForm() {
  ProdName.value = "";
  ProdPrice.value = "";
  ProdCategory.value = "";
  ProdDescription.value = "";
}
function DisplayProducts() {
  var cartoona = ``;
  for (var i = 0; i < ProductContainer.length; i++) {
    cartoona += `<tr>
<td>${i}</td>
<td>${ProductContainer[i].name}</td>
<td>${ProductContainer[i].price}</td>
<td>${ProductContainer[i].category}</td>
<td>${ProductContainer[i].description}</td>
 <td>
   <img
   src="${ProductContainer[i].image}"
   alt="Product Image"
  width="50"
     height="50"
   />
    </td>
<td><button class="btn btn-outline-warning" onclick="Edit(${i})">update</button></td>
<td><button class="btn btn-outline-danger" onclick="DeleteProduct(${i});">delete</button></td>
</tr>`;
  }
  document.getElementById("tableBody").innerHTML = cartoona;
}

function ChechInputs() {
  if (
    ProdName.value != "" &&
    ProdPrice.value != "" &&
    ProdCategory.value != "" &&
    ProdDescription.value != ""
  ) {
    return true;
  } else {
    return false;
  }
}

function DeleteProduct(index) {
  var confirmDeleted = confirm("هل أنت متأكد أنك تريد حذف هذا المنتج؟");
  if (confirmDeleted) {
    ProductContainer.splice(index, 1);
    localStorage.setItem("ProductData", JSON.stringify(ProductContainer));
    DisplayProducts();
  } else {
    alert("تم الغاء عمليه الحذف");
  }
}

function Edit(id) {
  ProdName.value = ProductContainer[id].name;
  ProdPrice.value = ProductContainer[id].price;
  ProdCategory.value = ProductContainer[id].category;
  ProdDescription.value = ProductContainer[id].description;

  btnstatus = "Edit";
  proId = id;
  btnAdd.innerHTML = "Update";
}

//search Notes
console.log("Ali ".includes("a")); //false as includes function case sensitive
console.log("Ali ".toLowerCase().includes("a".toLowerCase())); //true
// console.log("ali ".includes('x'));
//onkeyup()//when up from writing       key is relaesed
//onkeydown()//when write  key pressed down

function searchProduct(searchTerm) {
  var cartoona = ``;
  for (var i = 0; i < ProductContainer.length; i++) {
    if (
      ProductContainer[i].name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) == true ||
      ProductContainer[i].category
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) == true
    ) {
      cartoona += `<tr>
<td>${i}</td>
<td>${ProductContainer[i].name}</td>
<td>${ProductContainer[i].price}</td>
<td>${ProductContainer[i].category}</td>
<td>${ProductContainer[i].description}</td>
<td><button class="btn btn-outline-warning" onclick="Edit(${i})">update</button></td>
<td><button class="btn btn-outline-danger" onclick="DeleteProduct(${i});">delete</button></td>
</tr>`;
    } else {
      console.log("Sorry ! product isn't found");
    }
  }
  document.getElementById("tableBody").innerHTML = cartoona;
}

// validation Regular expression 1

function ValidOrNot() {
  var regex = /^[A-Z][a-z]{3,8}$/;
  //test   boollean function
  if (regex.test(ProdName.value) == true) {
    return true;
  } else {
    return false;
  }
}

// validation Regular expression 2
// in top of code page
var divAlert = document.getElementById("alert");
divAlert.style.display = "none";

//inside function
function ValidateName() {
  var regex = /^[A-Z][a-z]{3,10}$/;
  if (regex.test(ProdName.value) == true) {
    divAlert.style.display = "none";
  } else {
    divAlert.style.display = "block";
    document.getElementById(
      "alert"
    ).innerHTML = `<p>Product name is in-valid Must begin with capital letter then 3 to 10 small letters</p>`;
  }
}
//call this function in onkeyup() in input tag ProdName

// validation Regular expression 3
function ValidateName3() {
  var regex = /^[A-Z][a-z]{3,10}$/;
  if (regex.test(ProdName.value) == true) {
    // console.log('name is valid')
    ProdName.classList.add("is-valid");
    ProdName.classList.remove("is-invalid");
    divAlert.classList.replace("d-block", "d-none");
  } else {
    // console.log('name is invalid')
    ProdName.classList.add("is-invalid");
    ProdName.classList.remove("is-valid");
    divAlert.classList.replace("d-none", "d-block");
  }
}

//here we need not calling function anywhere   using blur must navigate next input control
//ProdName.addEventListener("blur", ValidateName3);
ProdName.addEventListener("keyup", ValidateName3);
