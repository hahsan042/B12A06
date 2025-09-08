const categoryName = document.getElementById("category-Name");
const catItems = document.getElementsByClassName("cat-items");
const plantContainer = document.getElementById("plant-category");
const cartContainer = document.getElementById("cart-container");
const cartCount =document.getElementById("cart-count");
let bookMarks=[];

const loading = document.getElementById("loading");

const showLoading = () => loading.classList.remove("hidden");
const hideLoading = () => loading.classList.add("hidden");




const loadCategory = () => {
  showLoading();
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => {
      const categories = data;
      console.log(categories);
      showCategory(categories.categories);
    })
    .finally(() => hideLoading());
};
const showCategory = (categories) => {
  categories.forEach((cat) => {
    categoryName.innerHTML += `
  <p id="${cat.id}"class="cat-items w-full mt-3 p-2 hover:bg-green-700 hover:text-white rounded-lg transition">${cat.category_name}</p>  
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
    console.log(plant);
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
                <h1 class="text-sm font-bold text-gray-800">${plant.category}</h1>

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
};
const allplants = () => {
  fetch("https://openapi.programming-hero.com/api/plants")
    .then((res) => res.json())
    .then((data) => {
      const plantsData = data;
      allplantsShow(plantsData.plants);
    });
};
const allplantsShow = (plantsFn) => {
  plantsFn.forEach((singlePlant) => {
    // console.log(singlePlant.id)
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
                <h1 class="text-sm font-bold text-gray-800">${singlePlant.category}</h1>

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
};
// plantContainer.addEventListener("click", (e) => {
//   if (e.target.innerText === "Add to Cart") {
  
//     bookMark(e);
//   }
// });
// const bookMark = (e) => {
// const title=e.target.parentNode.children[0].innerText;
// const price=e.target.parentNode.children[2].children[1].children[0].innerText
// const Id=e.target.parentNode.parentNode.id
// console.log(Id)
// bookMarks.push({
//   title: title,
//   id: Id,
//   price: price

// })
// showBookMarks(bookMarks)

// };

plantContainer.addEventListener("click", (e) => {
  if (e.target.innerText === "Add to Cart") {
    bookMark(e);
  }
});



// const bookMark = (e) => {
//   // কার্ড div খুঁজে বের করি
//   const card = e.target.closest("div.w-full");

//   // কার্ডের ভেতর থেকে title, price নিই
//   const title = card.querySelector("h1").innerText;
//   const priceText = card.querySelector(".text-gray-700").innerText; // যেমন "৳120"

//   // শুধু সংখ্যাটা বের করি
//   const price = priceText.replace("৳", "").trim();

//   const Id = card.id || Math.random().toString(36).substr(2, 9); // যদি id না থাকে fallback id

//   // বুকমার্কে যোগ করি
//   bookMarks.push({ title, id: Id, price });
//   showBookMarks(bookMarks);
// };
const bookMark = (e) => {
  const card = e.target.closest("div[id]"); // কার্ড div খুঁজে বের করি
  const Id = card.id;
  const title = card.querySelector("h1").innerText;
  const priceText = card.querySelector(".text-gray-700").innerText;
  const price = parseFloat(priceText.replace("৳", "").trim());

  // আগে থেকে আছে কি না চেক করি
  const existing = bookMarks.find(item => item.id === Id);

  if (existing) {
    // quantity এবং totalPrice update
    existing.qty += 1;
    existing.totalPrice = existing.qty * existing.price;
  } else {
    // নতুন প্রোডাক্ট push
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





// const showBookMarks=(bookMarks)=>{
//   cartContainer.innerHTML=""
//   bookMarks.forEach(boo=>{
//     cartContainer.innerHTML +=`<div class=" flex my-5 justify-between items-center p-2 bg-yellow-100 rounded-lg">
//             <div class=" ">
//             <h1 class="font-semibold">${boo.title}</h1>
//             <p>৳<span>${Number(boo.price)} </span>x <span id="cart-count">1</span></p>
//           </div>
//           <div>
//             <button class="font-semibold hover:border hover:border-1" onclick="deletedBookmark('${boo.id}')" >X</button>
//           </div>
//           </div>`
          
    
//   })

// }


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

  // total
  const total = bookmarks.reduce((sum, item) => sum + item.totalPrice, 0);
  cartContainer.innerHTML += `
    <div class="mt-2 font-bold text-right">Total: ৳${total}</div>
  `;
};



//  const deletedBookmark=(bookmarkId)=>{
  
//   const filterbookmarks=bookMarks.filter(book=>book.id !== bookmarkId)
//   bookMarks = filterbookmarks
//   showBookMarks(bookMarks)

//  }

 const deletedBookmark = (bookmarkId) => {
  bookMarks = bookMarks.filter(item => item.id !== bookmarkId);
  showBookMarks(bookMarks);
};


allplants();
loadCategory();
