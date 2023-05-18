let getModal = document.querySelector('#modal')
let getUpdateModal = document.querySelector('#update-modal')
let addBtn = document.querySelector('.content button')
let getClose = document.querySelector('.modal-header i')
let getCancel = document.querySelector('.cancel')
let getCate = document.querySelector('#category')
let getCateUpdate = document.querySelector('#category-update')
let getServiceTable = document.querySelector('.service-table')
let getDelModal = document.querySelector('#delete-user-modal')
let getCancelBtn = document.querySelector('.cancel-delete')
let getDelBtn = document.querySelector('.delete')
let getTiclose = document.querySelector('.close-del')
let updateBtn = document.querySelector('.update')
let getCancelupdate = document.querySelector('.cancel-update')
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
    if (event.target == getUpdateModal) {
        getUpdateModal.style.display = "none"
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
                        <i onclick="updateService('${service.id}')"style="cursor: pointer" class="fa fa-user-pen"></i>
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
        for(let i = 0; i < categories.length; i++) {
            getCate.innerHTML += `
            <option value="${categories[i].id}">${categories[i].name}</option>
            `
            getCateUpdate.innerHTML += `
            <option value="${categories[i].id}">${categories[i].name}</option>
            `
        }
    })
}
renderCategories()

let getAdmin = JSON.parse(localStorage.getItem('getUser'))
function createService() {
    let getImg = document.querySelector('.image')
    console.log([getImg]) 
    let getTitle = document.querySelector('.title').value
    let getContent = document.querySelector('#subject').value
    const formData = new FormData();
    const docsfile = getImg.files
    formData.append("image", docsfile[0])
    formData.append("name", getTitle)
    formData.append("description", getContent)
    formData.append("category", getCate.value)
    console.log(formData)
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
            alert('Đăng thành công')
            getModal.style.display = 'none'
        })
        
}

function deleteService(id) {
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
                    getDelModal.style.display = 'none'
                    alert("Xóa thành công")
                }
            })
        })
    
}

function updateService(serviceId) {
    getUpdateModal.style.display = 'block'
    // fetch('http://localhost:3000/api/v1/services')
    // .then(function(response) {
    //     return response.json()
    // })
    // .then(function(existedData) {
    //     let getItemData = existedData.filter(function(dataItem) {
    //         return dataItem.id == serviceId
    //     })
    //     console.log(typeof getItemData[0])
    //     updateBtn.addEventListener('click', function() {
    //         let getTitleUpdate = document.querySelector('.title-update').value
    //         let getContentUpdate = document.querySelector('#subject-update').value
    //         let getImgUpdate = document.querySelector('.image-update')
    //         getItemData[0] = new FormData()
    //         const docsFile = getImgUpdate.files
    //         getItemData[0].append("image", docsFile[0])
    //         getItemData[0].append("name", getTitleUpdate)
    //         getItemData[0].append("description", getContentUpdate)
    //         getItemData[0].append("category", getCateUpdate.value)
    //         console.log(typeof getItemData[0])
    //         fetch('http://localhost:3000/api/v1/services', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer ${getAdmin.userToken}`
    //             },
    //             body: getItemData[0]
    //         })
    //         .then(function(res) {
    //             return res.json()
    //         })
    //         .then(function(dataUpdate) {
    //             console.log(dataUpdate)
    //         })
    //     })
    // })

}