let getModal = document.querySelector('#modal')
let addBtn = document.querySelector('.content button')
let getClose = document.querySelector('.modal-header i')
let getCancel = document.querySelector('.cancel')
let getCate = document.querySelector('#category')
let getServiceTable = document.querySelector('.service-table')
addBtn.addEventListener('click', function() {
    getModal.style.display = 'block'
})

getClose.addEventListener('click', function() {
    getModal.style.display = 'none'
})

getCancel.addEventListener('click', function() {
    getModal.style.display = 'none'
})

window.onclick = function(event) {
    if (event.target == getModal) {
        getModal.style.display = "none";
    }
}

let api = 'http://localhost:3000/api/v1/services'
function renderServices() {
    fetch(api, {
        method: 'GET',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    })
        .then(function(response) {
            return response.json()
        })
        .then(function(services) {
            console.log(services)
            let htmls = services.map(function(service) {
                return `
                <tr class="service-item-${service.id}">
                    <td style="text-align: center;">
                        <button onclick="deleteService('${service.id}')" class="delButton">Xóa</button>
                    </td>
                    <td>${service.category.name}</td>
                    <td>${service.name}</td>
                    <td>
                        <img src="${service.image}" alt="">
                    </td>
                    <td style="text-align: center;">
                        <input type="checkbox" id="myCheck">
                    </td>
                    <td style="text-align: center;">
                        <i class="fa fa-user-pen"></i>
                    </td>
                </tr>
        `
            })
    getServiceTable.innerHTML = htmls.join('')
        })
}

renderServices()
function renderCategories() {
    fetch('http://localhost:3000/api/v1/categories', {
        method: 'GET',
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
    })
    .then(function(response) {
        return response.json()
    })
    .then(function(categories) {
        console.log(categories)
        for(let i = 0; i < categories.length; i++) {
            getCate.innerHTML += `
            <option value="${categories[i].id}">${categories[i].name}</option>
            `
        }
    })
}
renderCategories()

let getAdmin = JSON.parse(localStorage.getItem('getUser'))
function createService() {
    console.log(getCate.value)
    let getTitle = document.querySelector('.title').value
    let getImg = document.querySelector('.image')
    let getContent = document.querySelector('#subject').value
    console.log([getImg]) 
    const formData = new FormData();
    const docsfile = getImg.files
    formData.append("image", docsfile[0])
    formData.append("name", getTitle)
    formData.append("description", getContent)
    formData.append("category", getCate.value)
    fetch(api, {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Authorization': `Bearer ${getAdmin.userToken}`
          },
        body: formData
    })
        .then(function(response) {
            return response.json()
        })
        .then(function(data) {
            console.log(data)
        })
        
}

function deleteService(id) {
    fetch(api + '/' + id, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getAdmin.userToken}`
        }
    })
    .then(function(response) {
        return response.json()
    })
    .then(function() {
        let serviceItem = document.querySelector('.service-item-' + id)
        if (serviceItem) {
            serviceItem.remove()
        }
    })
}


