let swiper;

export function initSlider(el) {
  swiper = new Swiper(`.swiper`, {
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    observeSlideChildren: true,
    grabCursor: true,
    loop: true,
  });
}

export function updateSlider(){
  swiper.update()
}