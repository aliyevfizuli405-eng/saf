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










async function GetItems() {
    const res = await fetch("http://localhost:3000/foods");
    const data = await res.json();
    return data;
}

async function RenderMenuItems() {
    const data = await GetItems();
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

RenderMenuItems();

async function GetTestimonials() {
    const res = await fetch("http://localhost:3000/testimonials")
    const comments = await res.json();
    return comments;
}

async function RenderTestimonials() {
    const comments = await GetTestimonials();
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
RenderTestimonials();


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

async function GetAntiPasti() {
    const res = await fetch("http://localhost:3000/Menu");
    const AntiPasti = res.json();
    return AntiPasti;
}

async function RenderAntiPasti(category,element) {
    const AntiPasti = await GetAntiPasti();

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

RenderAntiPasti("Antipasti",AntiPastiElemenet);
RenderAntiPasti("Primi",PrimiElement);
RenderAntiPasti("Secondi",SecondiElement);
RenderAntiPasti("Dolci",DolciElement);

async function GetEmplooyers(){
    const res = await fetch("http://localhost:3000/employeers");
    const employeer= await res.json();
    return employeer
}

async function RenderEmplooyers(){
    const employeer= await GetEmplooyers();

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
RenderEmplooyers();