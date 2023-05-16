
const burger = document.querySelector(".burger")
document.querySelectorAll('a[href^="#"').forEach(link => {

  link.addEventListener('click', function (e) {
    burger.click()
    e.preventDefault();

    let href = this.getAttribute('href').substring(1);

    const scrollTarget = document.getElementById(href);

    const topOffset = document.querySelector('.header-container').offsetHeight;
    //const topOffset = 0; // если не нужен отступ сверху 
    const elementPosition = scrollTarget.getBoundingClientRect().top;
    const offsetPosition = elementPosition - topOffset;

    window.scrollBy({
      top: offsetPosition,
      behavior: 'smooth'
    });
  });
});


function toggleMenu() {
  burger.classList.toggle("active");
  document.querySelector(".navigation").classList.toggle("active")
  document.querySelector("header").classList.toggle("active")
  document.querySelector("body").classList.toggle("active")
}

burger.addEventListener("click", toggleMenu)

//let links = document.querySelectorAll(".nav-item")

//let sections = Array.from(document.querySelectorAll("section"));
//sections.push(document.querySelector("footer"))
//let secTop = sections.map(item =>item.offsetTop+item.offsetHeight)
//function dellActive(){
//  links.forEach(item => item.classList.contains("active")?item.classList.remove("active"):item)
//}

//window.addEventListener("scroll", function(){
//  let some = secTop.filter(item =>item-this.window.scrollY-100>0)
//  console.log(links)
//  if(!links[5-some.length].classList.contains("active")){
//    dellActive()
//    links[5-some.length].classList.add("active")
//  }
//})