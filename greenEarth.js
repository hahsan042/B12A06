const allCategory=()=>{
    fetch("https://openapi.programming-hero.com/api/plants")
    .then(Response=>Response.json())
    .then(data=>allPlant(data.plants))

}
 const allPlant=(plants)=>{
    const plantContainer=document.getElementById("plant-category")
 plants.forEach(plant => {
   const image= plant.image
   const category=plant.category
   const description=plant.description
   const name =plant.name
   const price=plant.price
    console.log(image)
    plantContainer.innerHTML +=`  
   <div
              class="w-full md:max-w-xs bg-white rounded-2xl shadow-md overflow-hidden p-4"
            >
              <!-- Image -->
              <div
                class="w-full h-40 bg-gray-100 rounded-lg flex items-center justify-center"
              >
                <img
                  src="${image}"
                  alt="${category}"
                  class="object-cover rounded-lg h-full w-full"
                />
              </div>

              <!-- Body -->
              <div class="mt-4 space-y-2">
                <!-- Title -->
                <h1 class="text-sm font-bold text-gray-800">${category}</h1>

                <!-- Description (2 lines only) -->
                <p class="text-gray-600 text-xs line-clamp-2">
                  ${description}
                </p>

                <!-- Category & Price -->
                <div class="flex justify-between items-center">
                  <span
                    class="px-3 py-1 text-xs bg-green-100 text-green-700 font-medium rounded-full"
                  >
                   ${name}
                  </span>
                  <span class="text-sm font-bold text-gray-700">৳${price}</span>
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

     
    
 });
 }
allCategory()