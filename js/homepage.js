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

let getLeftServiceContent = document.querySelector('#service .left-content')
let getRightServiceContent = document.querySelector('#service .right-content')
console.log(getLeftServiceContent)
fetch('http://localhost:3000/api/v1/services', {
    method: 'GET',
    headers: {
        'Content-type': 'application/json'
    }
})
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        console.log(data)
        getLeftServiceContent.innerHTML += 
        `
        <a href="./servicedetail.html?id=${data[0].id}" class="left-box">
            <img src="${data[0].image}" alt="">
            <div class="title-service">
                <div class="name-content">${data[0].name}</div>
            </div>
        </a>
        `
        for (let i = 1; i < 3; i++) {
            getRightServiceContent.innerHTML += 
            `
            <div class="right-menu-content">
                <a href="./servicedetail.html?id=${data[i].id}" class="img-box">
                    <img src="${data[i].image}" alt="" >   
                </a>
                <a href="./servicedetail.html?id=${data[i].id}" class="desc">
                    <div style="font-size: 17px;">${data[i].name}</div>
                </a>
            </div>
            `
        }
    })
    .catch(function(error) {
        console.log(error)
    })
    