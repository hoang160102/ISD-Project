let getModal = document.querySelector('#modal')
let getModalContent = document.querySelector('.modal-content')
let addBtn = document.querySelector('.content button')
let getClose = document.querySelector('.modal-header i')
let getCancel = document.querySelector('.cancel')
let getUpload = document.querySelector('.upload')
addBtn.addEventListener('click', function() {
    getModal.style.display = 'block'
})

getClose.addEventListener('click', function() {
    getModal.style.display = 'none'
})

getCancel.addEventListener('click', function() {
    getModal.style.display = 'none'
})

getUpload.addEventListener('click', function() {
    getModal.style.display = 'none'
})

window.onclick = function(event) {
    if (event.target == getModal) {
        getModal.style.display = "none";
    }
}