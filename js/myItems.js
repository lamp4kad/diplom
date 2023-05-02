import { getItems, deleteItemById } from "./firebase.js";

const itemsWrapper = document.querySelector(".items-wrapper")
const user = JSON.parse(localStorage.getItem("user"))

getItems().then(items => {
  items.forEach(item => {
    if (item.author == user.id) {
      let div = document.createElement("div")
      div.classList.add("item")
      div.innerHTML += `
          <div class="item-wrapper">
            <a href="./change.html" class="itemLink" data-id="${item.id}">
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
            <div class="buttons">
              <button class="item-change" data-id="${item.id}">
                Изменить
              </button>
              <button class="item-remove" data-id="${item.id}">
                Удалить
              </button>
            </div>
          </div>
    `
      div.querySelectorAll("a").forEach(el => el.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.setItem("id", `${JSON.stringify(el.dataset.id)}`);
        location.href = "../pages/change.html"
      }))
      div.querySelector(".item-remove").addEventListener("click", (e) => {
        deleteItemById(e.target.dataset.id).then(res => {
          e.target.closest(".item").remove()
        })
      })
      div.querySelector(".item-change").addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.setItem("id", `${JSON.stringify(e.target.dataset.id)}`);
        location.href = "../pages/change.html"
      })
      itemsWrapper.appendChild(div);
    }
  });
});