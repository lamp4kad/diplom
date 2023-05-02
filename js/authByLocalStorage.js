let user = JSON.parse(localStorage.getItem("user"))
if (user && user.id !== "") {
  document.querySelector(".signIn").classList.add("hide");
  document.querySelector(".user").classList.remove("hide");
  document.querySelector(".userName").innerHTML = user.fio
}