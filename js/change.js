import { changeItemByID, getItemByID } from "./firebase.js";
import { photos } from "./upload.js";
import { setPicture, loadedFlags, links, updateItemByID } from "./firebase.js";
import { validate } from "./validation.js";
import { updateSlider } from "./slider.js";

const title = document.querySelector(".itemTitle");
const price = document.querySelector(".itemPrice");
const description = document.querySelector(".itemDescription");

const changeItemBtn = document.querySelector(".changeItemBtn");
const loader = document.querySelector(".loaderBackground");
const swiperWrapper = document.querySelector(".swiper-wrapper");


getItemByID(JSON.parse(localStorage.getItem("id"))).then(item => {
  loader.classList.add("open");
  title.value = item.title
  price.value = item.price
  description.value = item.description
  item.photos.forEach(photo => {
    let swiperSlide = document.createElement("div")
    swiperSlide.classList.add("swiper-slide")
    swiperSlide.innerHTML += ` 
    <div class="img">
      <button class="deleteBtn">X</button>
      <img src="${photo}" alt="" data-old>
    </div>`
    
    swiperWrapper.appendChild(swiperSlide)
  })
}).then(some => loader.classList.remove("open"))
.then(res => {
  Array.from(document.querySelectorAll(".deleteBtn")).forEach(btn => {
    btn.addEventListener("click", (e)=> {
      e.preventDefault()
      e.target.closest(".swiper-slide").remove()
      updateSlider()
    })
  })
})

changeItemBtn.addEventListener("click", changeItem);

let inputs = [title, price, description]

price.addEventListener("keypress", function (evt) {
  if (evt.which != 8 && evt.which != 0 && evt.which < 48 || evt.which > 57) {
    evt.preventDefault();
  }
});

let user = JSON.parse(localStorage.getItem("user"))
if (user.id !== "") {
  document.querySelector(".signIn").classList.add("hide");
  document.querySelector(".user").classList.remove("hide");
  document.querySelector(".userName").innerHTML = user.fio
}
else {
  location.replace("../pages/index.html");
}

function changeItem(e) {
  e.preventDefault()
  validate(inputs).then(res => {
    if (res) {
      let data = {
        title: title.value.trim(),
        price: price.value.trim(),
        description: description.value.trim(),
        author: user.id
      }
      let ID = JSON.parse(localStorage.getItem("id"))
      loader.classList.add("open");
      changeItemByID(ID, data).then(item => {
        let user = JSON.parse(localStorage.getItem("user"));
        let watch = setInterval(function () {
          if (loadedFlags.length == 0) {
            clearInterval(watch);
            let oldImgs = Array.from(document.querySelectorAll("[data-old]")).map(item => item.src);
            loader.classList.remove("open")
            updateItemByID([...links, ...oldImgs], ID).then(item => location.replace("../pages/index.html"))
          }
        }, 2000);
        photos.forEach(photo => {
          let path = `${user.login}/${ID}/${photo.name}`
          console.log(photo)
          setPicture(photo, `${path}`)
        })
      });
    }
  })
}