const user = document.querySelector(".user")
const userBtn = document.querySelector(".userName")
const actionsContainer = document.querySelector(".userActions")

const actionsLinks = document.querySelectorAll(".actionLink");

const addItem = document.querySelector(".addItem");

const myItems = document.querySelector(".myItems");

const favItems = document.querySelector(".favItems");

const userSettings = document.querySelector(".userSettings");

const exit = document.querySelector(".exit");

//actionsLinks.forEach(item => item.addEventListener("click", (e) => e.preventDefault()))

addItem.addEventListener("click", () => location.href = "./addItem.html")

myItems.addEventListener("click", () => location.href = "./myItems.html")

favItems.addEventListener("click", () => location.href = "./favItems.html")

userSettings.addEventListener("click", () => location.href = "./userSettings.html")

userBtn.addEventListener("click", openActions);

exit.addEventListener("click", exitAction);

function openActions() {
  actionsContainer.classList.toggle("open");
}

function exitAction(e) {
  e.preventDefault();
  openActions();
  localStorage.setItem("user", JSON.stringify({ login: "", id: "" }))
  user.classList.add("hide");
  document.querySelector(".signIn").classList.remove("hide");
  location.replace("../pages/index.html");
}