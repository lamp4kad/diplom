import { getUsers, setUser } from "./firebase.js"
import { validate, removeInvalid } from "./validation.js";

const signIn = document.querySelector(".signIn");

const auth = document.querySelector(".auth");
const reg = document.querySelector(".reg");
const blackBackground = document.querySelector(".blackBackground");
const regLink = document.querySelector(".regLink");

const authBtn = document.querySelector(".authBtn")
const regBtn = document.querySelector(".regBtn")

signIn.addEventListener("click", openAuth)
blackBackground.addEventListener("click", closeBackground)
regLink.addEventListener("click", (e) => {
  e.preventDefault();
  reg.classList.toggle("open")
  auth.classList.toggle("open")
})

authBtn.addEventListener("click", authUser);
regBtn.addEventListener("click", regUser)

function authUser(e) {
  e.preventDefault();
  let login = document.querySelector(".login");
  let password = document.querySelector(".password");
  getUsers().then(users => {
    let res = false
    for (let item of users) {
      if (item.login == login.value && item.password == password.value) {
        res = true
        localStorage.setItem("user", `${JSON.stringify({ login: login.value, id: item.id, fio: item.fio })}`);
        signIn.classList.add("hide");
        document.querySelector(".user").classList.remove("hide");
        document.querySelector(".userName").innerHTML = item.fio;
        openAuth();
        document.querySelectorAll('[data-auth-field]').forEach(item => item.value = "")
        document.querySelectorAll('[data-reg-field]').forEach(item => item.value = "")
        return res
      }
    }
    return res
  }).then(res => {
    if (!res) {
      validate([login, password])
    }
    else {
      [login, password].forEach(item => removeInvalid(item))
      location.replace("../pages/index.html")
    }
  })
}

function regUser(e) {
  e.preventDefault()
  let fio = document.querySelector('[data-reg-fio]');
  let login = document.querySelector('[data-reg-login]');
  let email = document.querySelector('[data-reg-email]');
  let phone = document.querySelector('[data-reg-phone]');
  let password = document.querySelector('[data-reg-password]');
  let city = document.querySelector('[data-reg-city]');
  let town = document.querySelector('[data-reg-town]');
  let data = {
    fio: fio.value,
    login: login.value,
    phone: phone.value,
    password: password.value,
    city: city.textContent,
    town: town.textContent,
    email: email.value
  }
  validate([fio, login, email, phone, password]).then(res => {
    if (res) {
      setUser(data)
      auth.classList.contains("open") ? auth.classList.remove("open") : 0;
      blackBackground.classList.contains("open") ? blackBackground.classList.remove("open") : 0;
      reg.classList.contains("open") ? reg.classList.remove("open") : 0;
      document.querySelectorAll('[data-auth-field]').forEach(item => item.value = "")
      document.querySelectorAll('[data-reg-field]').forEach(item => item.value = "")
      document.querySelector("html").classList.toggle("overflowHidden");
    }
  })

}

function openAuth() {
  blackBackground.classList.toggle("open")
  auth.classList.toggle("open")
  document.querySelector("html").classList.toggle("overflowHidden");
}

function closeBackground(e) {
  if (e.target.classList.contains("open") && e.target === blackBackground) {
    auth.classList.contains("open") ? auth.classList.remove("open") : 0;
    blackBackground.classList.contains("open") ? blackBackground.classList.remove("open") : 0;
    reg.classList.contains("open") ? reg.classList.remove("open") : 0;
  }
  document.querySelectorAll('[data-auth-field]').forEach(item => {
    item.value = "";
    removeInvalid(item)
  })
  document.querySelectorAll('[data-reg-field]').forEach(item => {
    item.value = ""
    removeInvalid(item)
  })
  document.querySelector("html").classList.toggle("overflowHidden");
}

