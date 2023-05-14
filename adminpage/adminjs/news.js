let getModal = document.querySelector('#modal')
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

let getTable = document.querySelector('.news-table')
function renderNews() {
    fetch('http://localhost:3000/api/v1/news', {
        method: 'GET',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    })
    .then(function(response) {
        return response.json()
    })
    .then(function(news) {
        let newsList = news.data
        console.log(newsList)
        let htmls = newsList.map(function(newData) {
            return `
            <tr>
                <td style="text-align: center;">
                    <button class="delButton" onclick="deleteNews('${newData.id}')">Delete</button>
                </td>
                <td>${newData.title}</td>
                <td>
                    <img src="${newData.images[0].image0}" alt="">
                </td>
                <td>
                    <img src="${newData.images[1].image1}" alt="">
                </td>
                <td style="text-align: center;">
                    <i class="fa fa-user-pen"></i>
                </td>
            </tr>
    `
        })
        getTable.innerHTML = htmls.join('')
    })
}
renderNews()



