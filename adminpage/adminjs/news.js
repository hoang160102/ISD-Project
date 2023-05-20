let getModal = document.querySelector('#modal')
let addBtn = document.querySelector('.content button')
let getClose = document.querySelector('.modal-header i')
let getTable = document.querySelector('.news-table')
let getCancel = document.querySelector('.cancel')
let getUpload = document.querySelector('.upload')
let getDelModal = document.querySelector('#delete-user-modal')
let getCancelBtn = document.querySelector('.cancel-delete')
let getDelBtn = document.querySelector('.delete')
let getTiclose = document.querySelector('.close-del')
let getUpdateModal = document.querySelector('#update-modal')
let updateBtn = document.querySelector('.update')
let getCancelUpdate = document.querySelector('.cancel-update')
addBtn.addEventListener('click', function() {
    getModal.style.display = 'block'
})

getClose.addEventListener('click', function() {
    getModal.style.display = 'none'
})

getCancel.addEventListener('click', function() {
    getModal.style.display = 'none'
})

getCancelUpdate.addEventListener('click', function() {
    getUpdateModal.style.display = 'none'
})

window.onclick = function(event) {
    if (event.target == getModal) {
        getModal.style.display = "none";
    }
    if (event.target == getUpdateModal) {
        getUpdateModal.style.display = "none"
    }
}
let getEmploy = JSON.parse(localStorage.getItem('getUser'))
console.log(getEmploy.userToken)
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
                    <i onclick="updateNews('${newData.id}')" style="cursor: pointer" class="fa fa-user-pen"></i>
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

function createNews() {
    let getTitle = document.querySelector('#name').value
    let getFiles = document.querySelector('#file-upload').files
    let getMainInfo = document.querySelector('#main-subject').value
    let getInfo = document.querySelector('#subject').value
    getWebInfo = getInfo.split('\n\n\n')
    console.log(getWebInfo)
    console.log(getFiles)
    const formData = new FormData ()
    const docsFile = getFiles
    formData.append('image0', docsFile[0])
    formData.append('image1', docsFile[1])
    formData.append('image2', docsFile[2])
    formData.append('image3', docsFile[3])
    formData.append('image4', docsFile[4])
    formData.append('description1', getMainInfo)
    formData.append('description2', getWebInfo[0])
    formData.append('description3', getWebInfo[1])
    formData.append('description4', getWebInfo[2])
    formData.append('description5', getWebInfo[3])
    formData.append('title', getTitle)
    console.log(formData)
    fetch('http://localhost:3000/api/v1/news', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Authorization': `Bearer ${getEmploy.userToken}`
          },
        body: formData
    })
        .then(function(response) {
            return response.json()
        })
        .then(function(data) {
            console.log(data)
            alert('Đăng thành công')
            getModal.style.display = 'none'
            renderNews()
        })
}

function updateNews(newsId) {
    getUpdateModal.style.display = 'block'
    fetch('http://localhost:3000/api/v1/news' )
        .then(function(response) {
            return response.json()
        })
        .then(function(news) {
            let arrNew = news.data
            let getNewsData = arrNew.filter(function(newsItem) {
                return newsItem.id == newsId
            })
            updateBtn.addEventListener('click', function() {
                let getTitleUpdate = document.querySelector('.title-update').value
                let getContentUpdate = document.querySelector('#subject-update').value
                let getMainUpdate = document.querySelector('#main-subject-update').value
                let getImgUpdate = document.querySelector('.image-update')
                let getWebUpdate = getContentUpdate.split('\n\n\n')
                getNewsData[0] = new FormData()
                const docsFile = getImgUpdate.files
                getNewsData[0].set('image0', docsFile[0])
                getNewsData[0].set('image1', docsFile[1])
                getNewsData[0].set('image2', docsFile[2])
                getNewsData[0].set('image3', docsFile[3])
                getNewsData[0].set('image4', docsFile[4])
                getNewsData[0].set('description1', getMainUpdate)
                getNewsData[0].set('description2', getWebUpdate[0])
                getNewsData[0].set('description3', getWebUpdate[1])
                getNewsData[0].set('description4', getWebUpdate[2])
                getNewsData[0].set('description5', getWebUpdate[3])
                getNewsData[0].set('title', getTitleUpdate)
                fetch('http://localhost:3000/api/v1/news', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Authorization': `Bearer ${getEmploy.userToken}`
                    },
                    body: getNewsData[0]
                })
                .then(function(res) {
                    return res.json()
                })
                .then(function() {
                    fetch('http://localhost:3000/api/v1/news' + '/' + newsId, {
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
                            alert("Lưu thành công")
                            getUpdateModal.style.display = 'none'
                            renderNews()
                        })
                })
            })
        })
}


