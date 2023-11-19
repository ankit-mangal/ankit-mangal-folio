var menu = document.querySelector(".smallscreen-nav")
var open = document.querySelector(".fa-bars")
var close = document.querySelector(".fa-xmark")

open.addEventListener("click", ()=>{
  menu.style.display = "block"
})

close.addEventListener("click", ()=>{
  menu.style.display = "none"
})