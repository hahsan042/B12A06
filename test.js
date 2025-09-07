const category=()=>{
    fetch("https://news-api-fs.vercel.app/api/categories")
    .then(response=>response.json())
    .then(data=>displayNav(data.categories))
}


const displayNav=(catFn)=>{
   const categoriesContaoner = document.getElementById("categories-contaoner")
   catFn.forEach(cat=>{
    categoriesContaoner.innerHTML +=`
     <li id="${cat.id}" class="nav-li hover:border-b-3 hover: border-red-500">${cat.title}</li>`
   })
  const navLi= document.getElementsByClassName("nav-li")
  
  for(const li of navLi){
  li.addEventListener("click",function(){
     for (const item of navLi){
    item.style.borderBottom = "none";
  }
  li.style.borderBottom = "3px solid red";
  categoryPost(li.id)
  
  console.log(li.id)
  })
 
  }
}
const categoryPost=(categoryId)=>{
fetch(`https://news-api-fs.vercel.app/api/categories/${categoryId}`)
.then(res=>res.json())
.then(dat=>displayPost(dat.articles))
  
}
const displayPost=(postFn)=>{
  const postContainer =document.getElementById("post-Container");
  postContainer.innerHTML=""
  postFn.forEach(post=>{
    
    const imaGe=post.image.srcset[8].url
    const title =post.title
    
    const time=post.time
   
  postContainer.innerHTML +=`
         <div class="shadow p-5 bg-white rounded-lg space-y-3 hover:shadow-lg transition duration-300">
        <img src="${imaGe}" alt="" class="w-full h-48 object-cover rounded-md">
        <h1 class="text-base md:text-lg font-bold line-clamp-2">${title}</h1>
        <p class="italic text-sm md:text-base text-gray-600">${time}</p>
      </div>
  `

  })

}

  category()
categoryPost('main')