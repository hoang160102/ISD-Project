let sliderIndex = 0
let getSlide = document.getElementsByClassName('slider-img')
showSlides()
function showSlides() {
    let i
    for (i = 0; i < getSlide.length; i++) {
        getSlide[i].style.display = 'none'
    }
    sliderIndex++
    if (sliderIndex > getSlide.length) {
        sliderIndex = 1
    }
    getSlide[sliderIndex-1].style.display = 'block'
    setTimeout(showSlides, 3000)
}

window.onscroll = function() {
    stickyNavbar()
}
let getHeader = document.querySelector('#header')
let stick = getHeader.offsetTop
function stickyNavbar() {
    if (window.pageYOffset >=stick) {
        getHeader.classList.add("sticky")
    }
    else {
        getHeader.classList.remove("sticky")
    }
}

function displayTopNav() {
    let getTopNav = document.querySelector('.menu')
    getTopNav.classList.toggle('res-menu')
}