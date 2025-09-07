// *****
// Showing Category
// *****
let allCategoryContainer = document.querySelector(".all-category");

const loadCategory = async () => {
  let categoriesUrl = "https://openapi.programming-hero.com/api/categories";

  let response = await fetch(categoriesUrl);
  let data = await response.json();
  displayCategory(data.categories);
};

const displayCategory = (categories) => {
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
  let categoryItemUrl = `https://openapi.programming-hero.com/api/category/${id}`;
  let response = await fetch(categoryItemUrl);
  let data = await response.json();

  displayCategoryItem(data.plants);
  addActiveClass(id);
};

const displayCategoryItem = (categoryItems) => {
  cardContainer.innerHTML = categoryItems
    .map((item) => {
      return `
            <div class="card-item p-3 bg-white rounded-md overflow-hidden">
              <div class="min-w-[310px] min-h-[186px]"> 
                <img class="w-full max-h-[186px] bg-contain rounded-md" src="${item.image}" alt="" />
              </div>
              <h2 class="font-bold mb-3 mt-3">${item.name}</h2>
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
  cart.unshift({ treeName, price, id });
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
              <span class="text-[#1F2937]/50">৳${cartItem.price} x 1</span>
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

loadCategory();
loadCategoryItem(1);
