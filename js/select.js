const select = document.querySelectorAll(".select");
const selectMenu = document.querySelectorAll(".select-menu");
const selectItem = document.querySelectorAll(".select-item");

select.forEach(item => {
  item.addEventListener("click", openDropMenu);
  item.closest(".select-wrapper").querySelectorAll(".select-item").forEach(item => item.addEventListener("click", changeText))
})

function openDropMenu(e) {
  let wrapper = e.target.closest(".select-wrapper");
  let currentSelect = wrapper.querySelector(".select")
  let currentSelectMenu = wrapper.querySelector(".select-menu")
  select.forEach(item => item.classList.contains("open")&&item!=currentSelect? item.classList.remove("open"):0);
  selectMenu.forEach(item => item.classList.contains("open")&&item!=currentSelectMenu? item.classList.remove("open"):0);
  currentSelect.classList.toggle("open");
  currentSelectMenu.classList.toggle("open");
}

export function changeText(e) {
  let text = e.target.innerHTML;
  let wrapper = e.target.closest(".select-wrapper")
  let select = wrapper.querySelector(".select")
  e.target.innerHTML = select.innerHTML;
  select.innerHTML = text;
  openDropMenu(e);
}
