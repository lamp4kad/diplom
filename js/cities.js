import { changeText } from "./select.js";
const cities = document.querySelector(".cities")
const towns = document.querySelector(".towns")
const selectCites = cities.closest(".select-wrapper").querySelector(".select")
const selectTowns = towns.closest(".select-wrapper").querySelector(".select")


fetch('../js/cities.json')
  .then(response => response.json())
  .then(data => {
    changeCity(data);
    getTowns(data);
  });

function changeCity(data){
  data.forEach((item, idx) => {
    if (idx == 0) {
      selectCites.innerHTML = item.name;
    }
    else {
      let inner = `
      <div class="select-item">${item.name}</div>
      `
      cities.innerHTML += inner
    }
  })
  cities.querySelectorAll(".select-item").forEach(item => item.addEventListener("click", (e) => {
    changeText(e),
    getTowns(data);
  }))
}


function getTowns(data){
  towns.innerHTML = ""
  data.forEach(city => {
    if(city.name == selectCites.innerHTML){
      city.cities.forEach((town, idx) => {
        if (idx == 0) {
          selectTowns.innerHTML = town.name;
        }
        else {
          let inner = `
          <div class="select-item">${town.name}</div>
          `
          towns.innerHTML += inner
        }
      })
    }
  })
  towns.querySelectorAll(".select-item").forEach(item => item.addEventListener("click", changeText))
}