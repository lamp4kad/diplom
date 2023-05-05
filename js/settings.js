import { getUserByID, updateUserByID } from "./firebase.js";
import { validate, removeInvalid } from "./validation.js";

const changeUserSettingsBtn = document.querySelector(".changeUserSettingsBtn");

changeUserSettingsBtn.addEventListener("click", changeData)
let fio = document.querySelector('[data-reg-fio]');
let login = document.querySelector('[data-reg-login]');
let phone = document.querySelector('[data-reg-phone]');
let password = document.querySelector('[data-reg-password]');
let city = document.querySelector('[data-reg-city]');
let town = document.querySelector('[data-reg-town]');

let user = JSON.parse(localStorage.getItem("user"))

let fields = [];

let oldData = {}

getUserByID(user.id).then(user => {
  fio.value = user.fio
  login.value = user.login
  phone.value = user.phone
  password.value = user.password
  city.textContent = user.city
  town.textContent = user.town
}).then(res => {
  fields = Array.from(document.querySelectorAll("[data-reg-field]"))
  fields.push(city)
  fields.push(town)
}).then(res => {
  oldData = {
    fio: fields[0].value,
    login: fields[1].value,
    phone: fields[2].value,
    password: fields[3].value,
    city: fields[4].textContent,
    town: fields[5].textContent
  }
})

function changeData(e) {
  e.preventDefault()
  fields.forEach(item => removeInvalid(item))
  let newData = {
    fio: fio.value,
    login: login.value,
    phone: phone.value,
    password: password.value,
    city: city.textContent,
    town: town.textContent
  }
  let validateData = []
  let counter = 0;
  for (let prop in oldData) {
    if (oldData[`${prop}`] !== newData[`${prop}`]) {
      validateData.push(fields[counter])
    }
    counter++;
  }
  if (validateData.length > 0) {
    validate(validateData).then(res => {
      if (res) {
        console.log(newData)
        updateUserByID(user.id, newData).then(res => location.replace("../pages/index.html"))
      }
    })
  }
}