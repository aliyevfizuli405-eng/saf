const $ = (id) => document.getElementById(id);

let menuItemsElement = $("menu__items");
let user__commentsElement = $("user__comments");
let MenuBtnElement = $("MenuBtn");
let MenuListElement = $("MenuList");
let Menuchecker = false;
let AntiPastiElemenet = $("AntiPasti");
let PrimiElement=$("Primi");
let SecondiElement=$("Secondi");
let DolciElement=$("Dolci");
let employeerElemenet=$("employeer");
let galleryPhotosElement=$("galleryPhotos");
let allBtnElement=$("all");
let interiorElement=$("interior");
let foodElement=$("food");
let drinksELement=$("drinks");

async function GetItems(link) {
    const res = await fetch(link);
    const data = await res.json();
    return data;
}

async function RenderMenuItems(link) {
    const data = await GetItems(link);
    for (let i = 0; i < data.length; ++i) {
        menuItemsElement.innerHTML += `
        <div class="menu__item">
            <div class="menu__item__image">
                            <img src="${data[i].imageUrl}" alt="">
                        </div>
                        <div class="menu__item__texts">
                            <div style="display:flex;justify-content:space-between;">
                            <h3>${data[i].title}</h3>
                            <span class="subtitle">$${data[i].price}</span>
                            </div>
                            <p>${data[i].desc}</p>
                            <span class="pick">Chef's Pick</span>
                        </div>
                    </div> 
            `
    }
}

RenderMenuItems("http://localhost:3000/foods");

async function RenderTestimonials(link) {
    const comments = await GetItems(link);
    for (let i = 0; i < comments.length; ++i) {
        user__commentsElement.innerHTML +=
            `
        <div class="testimonial__card">
        <span style="display:flex;gap:0.5rem;">
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-fill"></i>
        </span>
                        <p style="margin-top:30px">${comments[i].comment}</p>
                        <p style="margin-top:24px">${comments[i].username}</p>
                        <p>${comments[i].time}</p>
        </div>
        `
    }
}
RenderTestimonials("http://localhost:3000/testimonials");

MenuBtnElement.addEventListener("click", () => {
    if (!Menuchecker) {
        MenuListElement.classList.remove("d-none");
        MenuBtnElement.innerHTML = `<i class = "gg-close"></i>`
    }
    else {
        MenuListElement.classList.add("d-none");
        MenuBtnElement.innerHTML = `<i class="gg-menu"></i>`;
    }
    Menuchecker = !Menuchecker;
})

async function RenderAntiPasti(link,category,element) {
    const AntiPasti = await GetItems(link);

    for (let i = 0; i < AntiPasti.length; ++i) {
        if (AntiPasti[i].category == category) {
            element.innerHTML += `
         <div class="foodCard">
                        <span class="foodCardSeperator">
                            <h3 class="foodCardTitle">${AntiPasti[i].name}</h3>
                            <span class="foodCardPrice">${AntiPasti[i].price}</span>
                        </span>
                        <p class="foodCardDesc">${AntiPasti[i].description}</p>
                    </div>
        `
        }
    }
}

RenderAntiPasti("http://localhost:3000/Menu","Antipasti",AntiPastiElemenet);
RenderAntiPasti("http://localhost:3000/Menu","Primi",PrimiElement);
RenderAntiPasti("http://localhost:3000/Menu","Secondi",SecondiElement);
RenderAntiPasti("http://localhost:3000/Menu","Dolci",DolciElement);

async function RenderEmplooyers(link){
    const employeer= await GetItems(link);

    for(let i=0;i<employeer.length;++i){
        employeerElemenet.innerHTML+=`
         <div class="employeer__card">
                        <img src="${employeer[i].imageUrl}" style="width:100%;border-top-left-radius:20px;border-top-right-radius:20px;" alt="">
                        <div class="employeer__info">
                            <h3 class=foodCardTitle>${employeer[i].name}</h3>
                            <h6 class="subtitle">${employeer[i].position}</h6>
                            <p class="foodCardDesc">${employeer[i].desc}</p>
                        </div>
                    </div>
        `
    }
}

RenderEmplooyers("http://localhost:3000/employeers");

async function RenderGalleryPhotos(link,category){
    galleryPhotosElement.innerHTML=``; 
    let photos = await GetItems(link);
    const temp=photos.filter(photo=>photo.category.includes(category))
    for(let i =0;i<temp.length;++i){
        galleryPhotosElement.innerHTML+=`<img class="galleryPhoto" src="${temp[i].imageUrl}">`
    }
}


allBtnElement.addEventListener("click",()=>{
    RenderGalleryPhotos("http://localhost:3000/gallery","All");
});
interiorElement.addEventListener("click",()=>{
    RenderGalleryPhotos("http://localhost:3000/gallery","Interior");
});
foodElement.addEventListener("click",()=>{
    RenderGalleryPhotos("http://localhost:3000/gallery","Food");
});
drinksELement.addEventListener("click",()=>{
    RenderGalleryPhotos("http://localhost:3000/gallery","Drinks");
})