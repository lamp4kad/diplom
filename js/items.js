import { getItems, getUserByID, setFavoritesByID } from "./firebase.js";

const itemsWrapper = document.querySelector(".items-wrapper")
let user = JSON.parse(localStorage.getItem("user"))

let elementsCount = ""

let callback = function(entries, observer) {
  if (entries[0].isIntersecting) {
    getItems(elementsCount).then(itemsList => {
      let items = itemsList.itemsList
      elementsCount = itemsList.lastVisible
      if(!elementsCount){
        observer.disconnect()
        return "itemsEnd"
      }
      items.forEach(item => {
        let div = document.createElement("div")
        div.classList.add("item")
        div.innerHTML += `
            <div class="item-wrapper">
              <a href="./about.html" class="itemLink" data-id="${item.id}">
                <div class="item-picture">
                  <img src="${item.hasOwnProperty("photos") && item.photos.length > 0 ? item.photos[0] : `https://dk.maz.by/images/dishes/no_image.jpg`}" alt="" loading="lazy">
                </div>
                <div class="item-title">
                  <p class="title">${item.title}</p>
                </div>
                <p class="cost">${item.price} р.</p>
                <div class="item-description">
                  <p class="description">${item.description}</p>
                </div>
              </a>
                <div class="item-open">
                  <a href="./about.html" class="open-item" data-id="${item.id}">Подробнее</a>
                </div>
                <svg class="heard" version="1.0" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
       width="800px" height="800px" viewBox="0 0 64 64" enable-background="new 0 0 64 64" xml:space="preserve">
    
       <style type="text/css" >
                    <![CDATA[
                        path.background {
                            fill:   #FFF;
                            transition: all 0.3s;
                        }
                        path.background.fav {
                            fill:   #f23000;
                        }
                    ]]>
        </style>
    
      <path d="M58.714,29.977c0,0-0.612,0.75-1.823,1.961S33.414,55.414,33.414,55.414C33.023,55.805,32.512,56,32,56
        s-1.023-0.195-1.414-0.586c0,0-22.266-22.266-23.477-23.477s-1.823-1.961-1.823-1.961C3.245,27.545,2,24.424,2,21
        C2,13.268,8.268,7,16,7c3.866,0,7.366,1.566,9.899,4.101l0.009-0.009l4.678,4.677c0.781,0.781,2.047,0.781,2.828,0l4.678-4.677
        l0.009,0.009C40.634,8.566,44.134,7,48,7c7.732,0,14,6.268,14,14C62,24.424,60.755,27.545,58.714,29.977z"/>
      <path class="background"  d="M58.714,29.977c0,0-0.612,0.75-1.823,1.961S33.414,55.414,33.414,55.414C33.023,55.805,32.512,56,32,56
        s-1.023-0.195-1.414-0.586c0,0-22.266-22.266-23.477-23.477s-1.823-1.961-1.823-1.961C3.245,27.545,2,24.424,2,21
        C2,13.268,8.268,7,16,7c3.866,0,7.366,1.566,9.899,4.101l0.009-0.009l4.678,4.677c0.781,0.781,2.047,0.781,2.828,0l4.678-4.677
        l0.009,0.009C40.634,8.566,44.134,7,48,7c7.732,0,14,6.268,14,14C62,24.424,60.755,27.545,58.714,29.977z"/>
    
        <path fill="#394240" d="M48,5c-4.418,0-8.418,1.791-11.313,4.687l-3.979,3.961c-0.391,0.391-1.023,0.391-1.414,0
          c0,0-3.971-3.97-3.979-3.961C24.418,6.791,20.418,5,16,5C7.163,5,0,12.163,0,21c0,3.338,1.024,6.436,2.773,9
          c0,0,0.734,1.164,1.602,2.031s24.797,24.797,24.797,24.797C29.953,57.609,30.977,58,32,58s2.047-0.391,2.828-1.172
          c0,0,23.93-23.93,24.797-24.797S61.227,30,61.227,30C62.976,27.436,64,24.338,64,21C64,12.163,56.837,5,48,5z M58.714,29.977
          c0,0-0.612,0.75-1.823,1.961S33.414,55.414,33.414,55.414C33.023,55.805,32.512,56,32,56s-1.023-0.195-1.414-0.586
          c0,0-22.266-22.266-23.477-23.477s-1.823-1.961-1.823-1.961C3.245,27.545,2,24.424,2,21C2,13.268,8.268,7,16,7
          c3.866,0,7.366,1.566,9.899,4.101l0.009-0.009l4.678,4.677c0.781,0.781,2.047,0.781,2.828,0l4.678-4.677l0.009,0.009
          C40.634,8.566,44.134,7,48,7c7.732,0,14,6.268,14,14C62,24.424,60.755,27.545,58.714,29.977z"/>
        <path fill="#394240" d="M48,11c-0.553,0-1,0.447-1,1s0.447,1,1,1c4.418,0,8,3.582,8,8c0,0.553,0.447,1,1,1s1-0.447,1-1
          C58,15.478,53.522,11,48,11z"/>
    </svg>
            </div>
      `
        div.querySelectorAll("a").forEach(el => el.addEventListener("click", (e) => {
          e.preventDefault();
          localStorage.setItem("id", `${JSON.stringify(el.dataset.id)}`);
          location.href = "../pages/about.html"
        }))
        if (user && user.id != "") {
          div.querySelector("svg").addEventListener("click", (e) => {
            getUserByID(user.id).then(user => user.favorites ? user.favorites : []).then(favorites => {
              let itemID = e.target.closest(".item-wrapper").querySelector("a").dataset.id
              if (favorites.indexOf(itemID) == -1) {
                favorites.push(itemID)
              }
              else {
                favorites.splice(favorites.indexOf(itemID), 1)
              }
              return favorites
            }).then(favArr => {
              setFavoritesByID(favArr, user.id).then(res => e.target.closest("svg").querySelector(".background").classList.toggle("fav"))
            })
          })
        }
        itemsWrapper.appendChild(div);
      });
    }).then(res => {
      if (user && user.id != "") {
        getUserByID(user.id).then(user => user.favorites ? user.favorites : false).then(favorites => {
          favorites.forEach(fav => {
            if (document.querySelector(`[data-id='${fav}']`))
              document.querySelector(`[data-id='${fav}']`).closest(".item-wrapper").querySelector(".background").classList.add("fav")
            else {
              if(res == "itemsEnd"){
                favorites.splice(favorites.indexOf(fav), 1)
                setFavoritesByID(favorites, user.id)
              }
            }
          })
        })
      }
    })
  }
};

let observer = new IntersectionObserver(callback);

observer.observe(document.querySelector('footer'))