import { getItems } from "./firebase.js";

const acceptFiltersBtn = document.querySelector(".asseptBtn")

const clearFiltersBtn = document.querySelector(".clearBtn")

const minPrice = document.querySelector(".minPrice");

const maxPrice = document.querySelector(".maxPrice");

const nameToSearch = document.querySelector(".search");

const itemsWrapper = document.querySelector(".items-wrapper")

minPrice.addEventListener("keypress", function (evt) {
  if (evt.which != 8 && evt.which != 0 && evt.which < 48 || evt.which > 57) {
    evt.preventDefault();
  }
});

maxPrice.addEventListener("keypress", function (evt) {
  if (evt.which != 8 && evt.which != 0 && evt.which < 48 || evt.which > 57) {
    evt.preventDefault();
  }
});

acceptFiltersBtn.addEventListener("click", search)

clearFiltersBtn.addEventListener("click", () => {
  minPrice.value = ""
  maxPrice.value = ""
  nameToSearch.value = ""
  search()
})

function search() {
  getItems().then(items => {
    let res = items
    if (minPrice.value != "") {
      res = res.filter(item => {
        if (+item.price > +minPrice.value) {
          return true
        }
      })
    }
    if (maxPrice.value != "") {
      res = res.filter(item => {
        if (+item.price < +maxPrice.value) {
          return true
        }
      })
    }

    if (nameToSearch.value.trim().length != 0) {
      res = res.filter(item => {
        if (item.title.toLowerCase().includes(nameToSearch.value.trim().toLowerCase())) {
          return true
        }
      })
    }
    return res
  }).then(searchingItems => {
    itemsWrapper.innerHTML = "";
    searchingItems.forEach(item => {
      let div = document.createElement("div")
      div.classList.add("item")
      div.innerHTML += `
        <div class="item-wrapper">
          <a href="./about.html" class="itemLink" data-id="${item.id}">
            <div class="item-picture">
              <img src="${item.hasOwnProperty("photos") && item.photos.length > 0 ? item.photos[0] : `https://dk.maz.by/images/dishes/no_image.jpg`}" alt="" loading="lazy">
            </div>
            <div class="item-title">
              <p class="title">${item.title}</p>
            </div>
            <p class="cost">${item.price} р.</p>
            <div class="item-description">
              <p class="description">${item.description}</p>
            </div>
          </a>
            <div class="item-open">
              <a href="./about.html" class="open-item" data-id="${item.id}">Подробнее</a>
            </div>
        </div>
  `
      div.querySelectorAll("a").forEach(el => el.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.setItem("id", `${JSON.stringify(el.dataset.id)}`);
        location.href = "../pages/about.html"
      }))
      itemsWrapper.appendChild(div);
    })
  })
}