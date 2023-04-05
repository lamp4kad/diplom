const signIn = document.querySelector(".signIn");

const auth = document.querySelector(".auth");
const reg = document.querySelector(".reg");
const blackBackground = document.querySelector(".blackBackground");
const regLink = document.querySelector(".regLink");

signIn.addEventListener("click", openAuth)
blackBackground.addEventListener("click", closeBackground)
regLink.addEventListener("click", () => {
  reg.classList.toggle("open")
  auth.classList.toggle("open")
})

function openAuth(){
  blackBackground.classList.toggle("open")
  auth.classList.toggle("open")
}

function closeBackground(e){
  if(e.target.classList.contains("open") && e.target === blackBackground){
    auth.classList.contains("open")?auth.classList.remove("open"):0;
    blackBackground.classList.contains("open")?blackBackground.classList.remove("open"):0;
    reg.classList.contains("open")?reg.classList.remove("open"):0;
  }
  document.querySelectorAll('[data-auth-field]').forEach(item => item.value = "")
  document.querySelectorAll('[data-reg-field]').forEach(item => item.value = "")

}

