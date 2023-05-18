let getModal = document.querySelector('#modal')
let addBtn = document.querySelector('.content button')
let getClose = document.querySelector('.modal-header i')
let getCancel = document.querySelector('.cancel')
let getUpload = document.querySelector('.upload')
let getDelModal = document.querySelector('#delete-user-modal')
let getCancelBtn = document.querySelector('.cancel-delete')
let getDelBtn = document.querySelector('.delete')
let getTiclose = document.querySelector('.close-del')
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
let getEmploy = JSON.parse(localStorage.getItem('getUser'))
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
            <tr class="news-item-${newData.id}">
                <td style="text-align: center;">
                    <button class="delButton" onclick="deleteNews('${newData.id}')">Xóa</button>
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

function deleteNews(id) {
    getDelModal.style.display = 'block'
    getCancelBtn.addEventListener('click', function() {
        getDelModal.style.display = 'none'
    })
    getTiclose.addEventListener('click', function() {
        getDelModal.style.display = 'none'
    })
    window.onclick = function(event) {
        if (event.target == getDelModal) {
            getDelModal.style.display = "none";
        }
    }
    getDelBtn.addEventListener('click', function() {
        fetch('http://localhost:3000/api/v1/news' + '/' + id, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getEmploy.userToken}`
            }
            })
            .then(function(response) {
                return response.json()
            })
            .then(function() {
                let newsItem = document.querySelector('.news-item-' + id)
                if (newsItem) {
                    newsItem.remove()
                    getDelModal.style.display = 'none'
                    alert("Xóa thành công")
                }
            })
    })
}



