function navigateToUser() {
    window.location.assign('./user.html')
}

function navigateToService() {
    window.location.assign('./serviceadmin.html')
}

function navigateToNews() {
    window.location.assign('./newsadmin.html')
}


let getName = JSON.parse(localStorage.getItem('getUser')).nameOfUser
let getUserNameElement = document.querySelector('.username')
getUserNameElement.innerText = getName

let getLogOutBtn = document.querySelector('.logout')
getLogOutBtn.addEventListener('click', function() {
    localStorage.removeItem('getUser')
    setTimeout(() => {
        window.location.assign('./login.html')
    }, 1000)
})

