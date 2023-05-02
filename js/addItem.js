import { setItem } from "./firebase.js";
import { photos } from "./upload.js";
import { setPicture, loadedFlags, links, updateItemByID } from "./firebase.js";
import { validate } from "./validation.js";

const title = document.querySelector(".itemTitle");
const price = document.querySelector(".itemPrice");
const description = document.querySelector(".itemDescription");

const addItemBtn = document.querySelector(".addItemBtn");
const loader = document.querySelector(".loaderBackground");

addItemBtn.addEventListener("click", addItem);

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

function addItem(e) {
  e.preventDefault()
  validate(inputs).then(res => {
    if (res) {
      let data = {
        title: title.value.trim(),
        price: price.value.trim(),
        description: description.value.trim(),
        author: user.id
      }
      loader.classList.add("open");
      setItem(data).then(item => {
        let user = JSON.parse(localStorage.getItem("user"));
        let watch = setInterval(function () {
          if (loadedFlags.length == 0) {
            clearInterval(watch);
            loader.classList.remove("open")
            updateItemByID(links, item.id).then(item => location.replace("../pages/index.html"))
          }
        }, 2000);
        photos.forEach(photo => {
          let path = `${user.login}/${item.id}/${photo.name}`
          console.log(photo)
          setPicture(photo, `${path}`)
        })
      });
    }
  })
}