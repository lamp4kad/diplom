import { getUsers } from "./firebase.js"
let valid = []

export function validate(els) {
  valid = []
  return getUsers().then(users => {
    els.forEach(el => {
      removeInvalid(el)
      //add item
      if (el.classList.contains("itemTitle")) {
        let value = el.value.trim()
        if (value.length <= 0 || value.length >= 60) {
          addInvalid(el, "Заголовок объявления не может быть пустым или содержать более 60-и символов")
        }
      }

      if (el.classList.contains("itemPrice")) {
        let reg = /\D|\S/gi;
        let value = el.value
        if ((value.length <= 0 || value.length >= 10) || !reg.test(value)) {
          addInvalid(el, "Цена не может быть пустой или содержать более 10 символов")
        }
      }
      //reg
      if (el.classList.contains("fio")) {
        if (el.value.trim().split(" ").length != 3) {
          addInvalid(el, "Введите корректное ФИО")
        }
      }

      if (el.classList.contains("login") && el.hasAttribute("data-reg-field")) {
        for (let i = 0; i < users.length; i++) {
          if (users[i].login == el.value) {
            addInvalid(el, "Данный логин уже зарегистрирован")
            break;
          }
          if (el.value.trim().length < 5) {
            addInvalid(el, "Логин должен быть не менее 5-и символов")
            break;
          }
        }
      }

      if (el.classList.contains("email") && el.hasAttribute("data-reg-field")) {
        let reg = /\S+@\S+\.\S+/;
        for (let i = 0; i < users.length; i++) {
          const user = users[i];
          if (user.email == el.value) {
            addInvalid(el, "Данная почта уже зарегистрирована")
          }
          if (!reg.test(el.value.trim())) {
            addInvalid(el, "Проверьте правильность почты")
          }
        }
      }

      if (el.classList.contains("telephone")) {
        let value = el.value;
        if (value.length < 18) {
          addInvalid(el, "Введите корректный номер телефона")
        }
      }

      if (el.classList.contains("password") && el.hasAttribute("data-reg-field")) {
        let value = el.value;
        if (value.length < 8) {
          addInvalid(el, "Пароль должен быть не менее 8-и символов")
        }
      }
      //auth
      if ((el.classList.contains("login") || el.classList.contains("password")) && el.hasAttribute("data-auth-field")) {
        let value = el.value.trim()
        getUsers().then(users => {
          let res = false
          for (let item of users) {
            if (el.classList.contains("login")) {
              if (item.login == value) {
                res = true
                return res
              }
            }
            else {
              if (item.password == value) {
                res = true
                return res
              }
            }
          }
          return res
        }).then(res => {
          if (!res) {
            el.closest(".auth-container").querySelectorAll("[data-auth-field]").forEach(item => {
              addInvalid(item, "Проверьте правильность ввода")
            })
          }
        })
      }

    })
    if (valid.length == 0) {
      return true
    }
    return false
  })
}

function addInvalid(el, message) {
  if (el.hasAttribute("data-add-item")) {
    let data = el.closest(".data")
    el.classList.add("invalid")
    data.querySelector(".input-container").classList.add("invalid")
    data.querySelector(".title").classList.add("invalid")
    if (!el.parentElement.parentElement.querySelector(".invalidText").classList.contains("open")) {
      el.parentElement.parentElement.querySelector(".invalidText").classList.add("open")
      el.parentElement.parentElement.querySelector(".invalidText").innerHTML = message
    }
  }
  else if (el.hasAttribute("data-reg-field")) {
    el.classList.add("invalid")
    el.parentElement.classList.add("invalid")
    if (!el.parentElement.querySelector(".invalidText").classList.contains("open")) {
      el.parentElement.querySelector(".invalidText").classList.add("open")
      el.parentElement.querySelector(".invalidText").innerHTML = message
    }

  }
  else if (el.hasAttribute("data-auth-field")) {
    el.classList.add("invalid")
    el.parentElement.classList.add("invalid")
    if (!el.parentElement.querySelector(".invalidText").classList.contains("open")) {
      el.parentElement.querySelector(".invalidText").classList.add("open")
      el.parentElement.querySelector(".invalidText").innerHTML = message
    }
  }
  valid.push(el)
}

export function removeInvalid(el) {
  if (el.hasAttribute("data-add-item")) {
    let data = el.closest(".data")
    el.classList.remove("invalid")
    data.querySelector(".input-container").classList.remove("invalid")
    data.querySelector(".title").classList.remove("invalid")
    el.parentElement.parentElement.querySelector(".invalidText").classList.contains("open") ? el.parentElement.parentElement.querySelector(".invalidText").classList.remove("open") : 0
  }
  else if (el.hasAttribute("data-reg-field")) {
    el.classList.remove("invalid")
    el.parentElement.classList.remove("invalid")
    el.parentElement.querySelector(".invalidText").classList.contains("open") ? el.parentElement.querySelector(".invalidText").classList.remove("open") : 0
  }
  else if (el.hasAttribute("data-auth-field")) {
    el.parentElement.querySelector(".invalidText").classList.contains("open") ? el.parentElement.querySelector(".invalidText").classList.remove("open") : 0
    el.classList.remove("invalid")
    el.parentElement.classList.remove("invalid")
  }
}