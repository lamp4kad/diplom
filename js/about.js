import { getItemByID, getUserByID } from "./firebase.js";
import { initSlider } from "./slider.js";
let id = JSON.parse(localStorage.getItem("id"))
let swiper = document.querySelector(".swiper")
let swiperWrapper = document.querySelector(".swiper-wrapper")
let product = document.querySelector(".product")
let title = product.querySelector(".title")
let price = product.querySelector(".price")
let description = product.querySelector(".discription")

let FIOInfo = document.querySelector(".FIOinfo")
let phoneInfo = document.querySelector(".phoneinfo")
let addressInfo = document.querySelector(".addressinfo")

getItemByID(id).then(item => { 
  item.photos.forEach(photo => {
    let swiperSlide = document.createElement("div")
    swiperSlide.classList.add("swiper-slide")
    swiperSlide.innerHTML += ` 
    <div class="img">
      <img src="${photo}" alt="">
    </div>`
    swiperWrapper.appendChild(swiperSlide)
  })
  initSlider(swiper)
  title.innerHTML = item.title;
  price.innerHTML = item.price + " р.";
  item.description.split("\n").forEach(text => {
    description.innerHTML += `
    <p class="discriptionText">
      ${text}
    </p>
    `
  })

  getUserByID(item.author).then(user => {
    FIOInfo.innerHTML = user.fio
    phoneInfo.innerHTML = user.phone
    addressInfo.innerHTML = `${user.city},${user.town}`
  })
})