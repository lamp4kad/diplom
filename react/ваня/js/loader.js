window.onload = function(){
  opacity();
  setTimeout(()=> display(),500)
}

function opacity(){
  document.querySelector(".loader-container").style.opacity = "0"
}

function display(){
  document.querySelector(".loader-container").style.display = "none"
}