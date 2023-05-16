const swiperWrapperFirst = document.querySelector(".first").querySelector(".swiper-wrapper")

const swiperWrapperThecond = document.querySelector(".thecond").querySelector(".swiper-wrapper")

for (let i = 0; i < 42; i++) {
  let inner = `
  <div class="swiper-slide">
    <div class="img">
      <img src="https://raw.githubusercontent.com/lamp4kad/shoolproject/master/assets/img/main/inter/slider1/paint${i}.webp" alt="" class="slide" loading="lazy">
    </div>
  </div>
  `
  swiperWrapperFirst.innerHTML += inner
}

for (let i = 0; i < 10; i++) {
  let inner = `
  <div class="swiper-slide">
    <div class="img">
      <img src="https://raw.githubusercontent.com/lamp4kad/shoolproject/master/assets/img/main/inter/slider2/paint${i}.webp" alt="" class="slide" loading="lazy">
    </div>
  </div>
  `
  swiperWrapperThecond.innerHTML += inner
}