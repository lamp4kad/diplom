const swiper = new Swiper(`.swiper`, {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  },
  observeSlideChildren: true,
  grabCursor: true,
  loop: true,
});