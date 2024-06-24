let menu = document.querySelector(".menu");
let hamburger = document.querySelector(".hamburger");
let closeMenu = document.getElementById("closeMenu");
let closeIcon = document.querySelector(".closeIcon");
let menuIcon = document.querySelector(".menuIcon");

function menuOpen(){
    if(menu.classList.contains("active")){
        menu.classList.remove("active");
        closeIcon.style.display = "none";
        menuIcon.style.display = "block";
    }else {
        menu.classList.add("active");
        closeIcon.style.display = "block";
    }
}

hamburger.addEventListener("click", menuOpen);
closeMenu.addEventListener("click", menuOpen);