const categoryName = document.getElementById("category-Name");
const catItems = document.getElementsByClassName("cat-items");
const plantContainer = document.getElementById("plant-category");
const cartContainer = document.getElementById("cart-container");
const cartCount =document.getElementById("cart-count");
const myModal5 =document.getElementById("my_modal_5")
const modalContainer= document.getElementById("modal-container")
let bookMarks=[];
let modaL=[]



const loading = document.getElementById("loading");

const showLoading = () => loading.classList.remove("hidden");
const hideLoading = () => loading.classList.add("hidden");




const loadCategory = () => {
  showLoading();
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => {
      const categories = data;

      showCategory(categories.categories);
      modaL.push({ type: "categories", data: data.categories });
    })
    .finally(() => hideLoading());
};
const showCategory = (categories) => {
  categories.forEach((cat) => {
    

    categoryName.innerHTML += `
  <p id="${cat.id}"class="cat-items font-bold md:font-normal border-1 md:border-none  text-center md:text-left h-12 rounded-lg p-1 md:p-0 md:bg-none text-sm md:w-full md:mt-3 md:p-2 md:hover:bg-green-700 md:hover:text-white md:rounded-lg md:transition">${cat.category_name}</p>  
  `;
  });
  categoryName.addEventListener("click", (e) => {
    const allP = document.querySelectorAll("p");
    allP.forEach((p) => {
      p.classList.remove("bg-green-800", "text-white");
    });
    if (e.target.localName === "p") {
      e.target.classList.add("bg-green-800", "text-white");
      categoryCard(e.target.id);
    }
  });
   
};
const categoryCard = (Catid) => {
 showLoading();
  fetch(`https://openapi.programming-hero.com/api/category/${Catid}`)
    .then((res) => res.json())
    .then((data) => {
      const onlyOneCategory = data;
  

      categoryCardShow(onlyOneCategory.plants);
    })
    .finally(() => hideLoading())
};

const categoryCardShow = (plants) => {
  plantContainer.innerHTML = "";
  plants.forEach((plant) => {
    plantContainer.innerHTML += `  
   <div
              id="${plant.id}" class="w-full md:max-w-xs bg-white rounded-2xl shadow-md overflow-hidden p-4"
            >
              <!-- Image -->
              <div
                class="w-full h-40 bg-gray-100 rounded-lg flex items-center justify-center"
              >
                <img
                  src="${plant.image}"
                  alt="${plant.category}"
                  class="object-cover rounded-lg h-full w-full"
                />
              </div>

              <!-- Body -->
              <div class="mt-4 space-y-2">
                <!-- Title -->
                <h1 class="title text-sm font-bold text-gray-800">${plant.category}</h1>

                <!-- Description (2 lines only) -->
                <p class="text-gray-600 text-xs line-clamp-2">
                  ${plant.description}
                </p>

                <!-- Category & Price -->
                <div class="flex justify-between items-center">
                  <span
                    class="px-3 py-1 text-xs bg-green-100 text-green-700 font-medium rounded-full"
                  >
                   ${plant.name}
                  </span>
                  <span class="text-sm font-bold text-gray-700">৳${plant.price}</span>
                </div>

                <!-- Button -->
                <button
                 class=  "w-full mt-3 py-2 btn bg-green-700 text-white font-semibold rounded-full hover:bg-green-800 transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
    `;
  });
  addTitleListeners()
};
const allplants = () => {
  fetch("https://openapi.programming-hero.com/api/plants")
    .then((res) => res.json())
    .then((data) => {
      const plantsData = data;
      allplantsShow(plantsData.plants);
      modaL.push({ type: "plants", data: data.plants });
    });
};
const allplantsShow = (plantsFn) => {
  plantsFn.forEach((singlePlant) => {
   
    plantContainer.innerHTML += ` <div id="${singlePlant.id}"
              class="w-full md:max-w-xs bg-white rounded-2xl shadow-md overflow-hidden p-4"
            >
              <!-- Image -->
              <div
                class="w-full h-40 bg-gray-100 rounded-lg flex items-center justify-center"
              >
                <img
                  src="${singlePlant.image}"
                  alt="${singlePlant.category}"
                  class="object-cover rounded-lg h-full w-full"
                />
              </div>

              <!-- Body -->
              <div class="mt-4 space-y-2">
                <!-- Title -->
                <h1 class=" title text-sm font-bold text-gray-800">${singlePlant.category}</h1>

                <!-- Description (2 lines only) -->
                <p class="text-gray-600 text-xs line-clamp-2">
                  ${singlePlant.description}
                </p>

                <!-- Category & Price -->
                <div class="flex justify-between items-center">
                  <span
                    class="px-3 py-1 text-xs bg-green-100 text-green-700 font-medium rounded-full"
                  >
                   ${singlePlant.name}
                  </span>
                  <p class="text-sm font-bold text-gray-700">৳ <span>${singlePlant.price}</span></p>
                </div>

                <!-- Button -->
                <button id="btns"
                  class="w-full mt-3 py-2  btn bg-green-700 text-white font-semibold rounded-full hover:bg-green-800 transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
    `;
  });
  addTitleListeners();
};
plantContainer.addEventListener("click", (e) => {
  if (e.target.innerText === "Add to Cart") {
    alert("your cart added  successfully")
    bookMark(e);
  }
});





const bookMark = (e) => {
  const card = e.target.closest("div[id]"); 
  const Id = card.id;
  const title = card.querySelector("h1").innerText;
  const priceText = card.querySelector(".text-gray-700").innerText;
  const price = parseFloat(priceText.replace("৳", "").trim());

  
  const existing = bookMarks.find(item => item.id === Id);

  if (existing) {
   
    existing.qty += 1;
    existing.totalPrice = existing.qty * existing.price;
  } else {
    
    bookMarks.push({
      id: Id,
      title: title,
      price: price,
      qty: 1,
      totalPrice: price
    });
  }

  showBookMarks(bookMarks);
};

const showBookMarks = (bookmarks) => {
  cartContainer.innerHTML = "";
  bookmarks.forEach(item => {
    cartContainer.innerHTML += `
      <div class="flex justify-between items-center p-2 bg-yellow-100 rounded-lg my-2">
        <div>
          <h1 class="font-semibold">${item.title}</h1>
          <p>৳${item.price} * ${item.qty} = ৳${item.totalPrice}</p>
        </div>
        <div>
          <button class="font-semibold hover:border hover:border-1"
                  onclick="deletedBookmark('${item.id}')">X</button>
        </div>
      </div>
    `;
  });


  const total = bookmarks.reduce((sum, item) => sum + item.totalPrice, 0);
  cartContainer.innerHTML += `
    <div class="mt-2 font-bold text-right">Total: ৳${total}</div>
  `;
};





 const deletedBookmark = (bookmarkId) => {
  bookMarks = bookMarks.filter(item => item.id !== bookmarkId);
  showBookMarks(bookMarks);
};




const addTitleListeners = () => {
  const allTitles = document.querySelectorAll(".title");

  allTitles.forEach(titleEl => {
    titleEl.addEventListener("click", () => {
      const clickedTitle = titleEl.innerText;

      
      const plantsArray = modaL.find(item => item.type === "plants").data;

    
      const plant = plantsArray.find(p => p.category === clickedTitle);

      if (!plant) return;

    
      modalContainer.innerHTML = `
        <div class="space-y-5 ">
          <h1 class="text-sm text-xl font-bold text-gray-800">${plant.name}</h1>

          <!-- Image -->
          <div class="w-full h-80 bg-gray-100 rounded-lg flex items-center justify-center">
            <img
              src="${plant.image}"
              alt="${plant.category}"
              class="object-cover rounded-lg h-full w-full"
            />
          </div>

          <!-- Body -->
          <div class="mt-4 space-y-2">
            <p class="text-gray-600 text-xs ">
              <span class="font-bold">Category Name:</span> ${plant.category}
            </p>
            <p class="text-gray-600 text-xs line-clamp-2">
              <span class="font-bold">Price:</span> ৳${plant.price}
            </p>
            <p class="text-gray-600 text-xs ">
              <span class="font-bold">Description:</span> ${plant.description}
            </p>
          </div>
        </div>
      `;

      myModal5.showModal();
    });
  });
};



allplants();
loadCategory();
