const categoryName=document.getElementById("category-Name")
const catItems=document.getElementsByClassName("cat-items")
const plantContainer=document.getElementById("plant-category")
 const loadCategory=()=>{
  fetch("https://openapi.programming-hero.com/api/categories")
  .then(res=>res.json())
  .then(data=>{
    const categories=data
    console.log(categories)
    showCategory(categories.categories)
  })
 }
 const showCategory=(categories)=>{
 categories.forEach(cat => {
  
  categoryName.innerHTML +=`
  <p id="${cat.id}"class="cat-items w-full mt-3 p-2 hover:bg-green-700 hover:text-white rounded-lg transition">${cat.category_name}</p>  
  `
 });
   categoryName.addEventListener("click",(e)=>{
    const allP=document.querySelectorAll("p")
    allP.forEach(p=>{
     p.classList.remove("bg-green-800","text-white")
    })
    if(e.target.localName ==="p"){
      e.target.classList.add("bg-green-800","text-white")
      categoryCard(e.target.id)
    }
  })
 

 }
const categoryCard=(Catid)=>{
  console.log(Catid)
  fetch(`https://openapi.programming-hero.com/api/category/${Catid}`)
  .then(res=>res.json())
  .then(data=>{
    const onlyOneCategory=data
    
    categoryCardShow(onlyOneCategory.plants)
  })

 }
 const categoryCardShow=(plants)=>{
   plantContainer.innerHTML=""
  plants.forEach(plant=>{
    console.log(plant)
    plantContainer.innerHTML +=`  
   <div
              class="w-full md:max-w-xs bg-white rounded-2xl shadow-md overflow-hidden p-4"
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
                  class="w-full mt-3 py-2 bg-green-700 text-white font-semibold rounded-full hover:bg-green-800 transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
    `
    
  })

 }
 const allplants=()=>{
  fetch("https://openapi.programming-hero.com/api/plants")
  .then(res=>res.json())
  .then(data=>{
    const plantsData=data
    allplantsShow(plantsData.plants)
  })
 }
const allplantsShow=(plantsFn)=>{
  plantsFn.forEach(singlePlant=>{
    console.log(singlePlant)
    plantContainer.innerHTML +=  ` <div
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
                  <span class="text-sm font-bold text-gray-700">৳${singlePlant.price}</span>
                </div>

                <!-- Button -->
                <button
                  class="w-full mt-3 py-2 bg-green-700 text-white font-semibold rounded-full hover:bg-green-800 transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
    `
    
  })
}
 allplants()
 loadCategory()