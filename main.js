// *****
// Showing Category
// *****
let allCategoryContainer = document.querySelector(".all-category");

const loadCategory = async () => {
  loadingSpinner(true, allCategoryContainer);
  let categoriesUrl = "https://openapi.programming-hero.com/api/categories";

  let response = await fetch(categoriesUrl);
  let data = await response.json();
  displayCategory(data.categories);
};

const displayCategory = (categories) => {
  loadingSpinner(false);
  allCategoryContainer.innerHTML = categories
    .map((category) => {
      return `
        <li onclick="loadCategoryItem(${category.id})" id="${category.id}" class="category cursor-pointer hover:bg-[#15803D] hover:text-white py-2 px-3 hover: rounded-sm" >
            ${category.category_name}
        </li>
    
    `;
    })
    .join(" ");
};

// *****
// Showing Category Item as a Card
// *****
let cardContainer = document.querySelector(".card-container");

const loadCategoryItem = async (id) => {
  loadingSpinner(true, cardContainer);
  let categoryItemUrl = `https://openapi.programming-hero.com/api/category/${id}`;
  let response = await fetch(categoryItemUrl);
  let data = await response.json();

  displayCategoryItem(data.plants);
  addActiveClass(id);
};

const displayCategoryItem = (categoryItems) => {
  loadingSpinner(false);
  cardContainer.innerHTML = categoryItems
    .map((item) => {
      return `
            <div class="card-item p-3 bg-white rounded-md shadow-md overflow-hidden">
              <div class="w-full h-full max-h-[206px] object-cover overflow-hidden"> 
                <img class="w-full h-full bg-cover object-cover rounded-md" src="${item.image}" alt="" />
              </div>

              <h2 onclick="loadDetails(${item.id})" class="font-bold mb-3 mt-3 cursor-pointer">${item.name}</h2>
              <p class="text-sm text-[#1F2937]/80 mb-3">
                ${item.description}
              </p>

              <div class="flex justify-between items-center">
                <span
                  class="text-[#15803D] bg-[#DCFCE7] py-2 px-3 rounded-[35px]"
                  >${item.category}</span
                >
                <span class="font-medium">$${item.price}</span>
              </div>

              <button
                onclick="addToCart('${item.name}', ${item.price}, '${item.id}')"
                class="add-cart-btn btn bg-[#15803D] text-white rounded-3xl w-full py-3 mt-3"
              >
                Add to Card
              </button>
            </div>
        `;
    })
    .join(" ");
};

const removeActiveClass = () => {
  let allCategory = document.querySelectorAll(".category");
  allCategory.forEach((category) => {
    category.classList.remove("bg-[#15803D]", "text-white");
  });
};

const addActiveClass = (id) => {
  removeActiveClass();
  let clickedItem = document.getElementById(`${id}`);
  clickedItem.classList.add("bg-[#15803D]", "text-white");
};

// *****
// Add to Cart Functionality
// *****

let cart = [];
let cartContainer = document.querySelector(".cart-container");

const addToCart = (treeName, price, id) => {
  let count = 1;
  let matchedItem = cart.find((cartItem) => cartItem.id === id);

  if (matchedItem) {
    matchedItem.price += price;
    matchedItem.count += 1;
    displayAddToCart(id);
    sumOfTotalPrice();
    return;
  }

  cart.unshift({ treeName, price, id, count });
  displayAddToCart(id);
  sumOfTotalPrice();
};

const removeCart = (id) => {
  cart = cart.filter((cartItem) => cartItem.id !== id);

  displayAddToCart();
  sumOfTotalPrice();
};

const displayAddToCart = () => {
  cartContainer.innerHTML = cart
    .map((cartItem) => {
      return `
        <div class="flex items-center justify-between p-2 rounded-sm bg-[#F0FDF4] cursor-pointer">
            <div>
              <h2 class="font-bold mb-1.5">${cartItem.treeName}</h2>
              <span class="text-[#1F2937]/50">৳ ${cartItem.price} x ${cartItem.count}</span>
            </div>
            <span onclick="removeCart('${cartItem.id}')" class="cursor-pointer bg-gray-200 p-2 rounded-md text-red-600/80"><i class="fa-solid fa-trash"></i></span>
        </div>
    `;
    })
    .join(" ");
};

// *****
// Total Price of Add To Card Added
// *****
let totalPrice = document.querySelector(".total-price");

const sumOfTotalPrice = () => {
  let total = cart.reduce((sum, cartItem) => {
    sum += cartItem.price;
    return sum;
  }, 0);
  totalPrice.innerText = total;
};

// *****
// Loading Spinner Functionality
// *****

const loadingSpinner = (status, place) => {
  if (status) {
    place.innerHTML = `<div class="col-span-full text-center mt-20"><span class="loading loading-dots loading-xl"></span></div>`;
  }
};

let dialogBox = document.getElementById("card_details");
// Showing Dialog Box for every single card detail
const loadDetails = async (id) => {
  console.log(id);
  dialogBox.showModal();
  let detailsUrl = `https://openapi.programming-hero.com/api/plant/${id}`;

  let response = await fetch(detailsUrl);
  let data = await response.json();

  displayDetails(data.plants);
};

const displayDetails = (detail) => {
  dialogBox.innerHTML = `
   <div class="modal-box">
      <div> 
        <h1 class="text-2xl font-bold mb-2">Banytan Tree <h1>
        <div class="w-full max-h-[280px] overflow-hidden">
          <img class="w-full h-full bg-cover rounded-md" src="${detail.image}"> 
        </div>
        <p class="mt-2"> <span class="font-bold">Category:</span> Shade Tree</p>
        <p class="mt-2"> <span class="font-bold">Price:</span> $ ${detail.price}</p>
        <p class="mt-2"> <span class="font-bold">Description:</span> $ ${detail.description}</p>


      </div>

      <div class="modal-action">
        <form method="dialog">
          <button class="btn">Close</button>
        </form>
      </div>
  </div>
  `;
};

loadCategory();
loadCategoryItem(1);
