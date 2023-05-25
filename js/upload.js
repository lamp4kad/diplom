import { initSlider, updateSlider } from "./slider.js";
const pictureInput = document.querySelector(".upIMG");
const swiperWrapper = document.querySelector(".swiper-wrapper");

pictureInput.addEventListener("change", getFile)

initSlider()

let fileItem;
export let photos = [];

function getFile(e) {
  fileItem = e.target.files[0];
  let reader = new FileReader();
  reader.onload = function (e) {
    let swiperSlide = document.createElement("div");
    swiperSlide.classList.add("swiper-slide")
    swiperSlide.innerHTML += `
      <div class="img">
        <button class="deleteBtn">X</button>
        <img src="${e.target.result}" alt="" loading="lazy" data-name = "${fileItem.name}">
      </div>
    `
    swiperSlide.querySelector(".deleteBtn").addEventListener("click", (e) => {
      e.preventDefault()
      e.target.closest(".swiper-slide").remove()
      photos.splice(photos.map(item => item.name).indexOf(fileItem.name), 1)
      updateSlider()
    })
    swiperWrapper.appendChild(swiperSlide)
  }
  reader.readAsDataURL(fileItem);
  photos.push(fileItem)
}