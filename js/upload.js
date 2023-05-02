import { initSlider } from "./slider.js";
const pictureInput = document.querySelector(".upIMG");
const swiperWrapper = document.querySelector(".swiper-wrapper");

pictureInput.addEventListener("change", getFile)

initSlider(document.querySelector(".swiper"))

let fileItem;
export let photos = [];

function getFile(e) {
  fileItem = e.target.files[0];
  let reader = new FileReader();
  reader.onload = function (e) {
    swiperWrapper.innerHTML += `
    <div class="swiper-slide">
      <div class="img">
        <img src="${e.target.result}" alt="" loading="lazy">
      </div>
    </div>
  `
  }
  reader.readAsDataURL(fileItem);
  photos.push(fileItem)
}