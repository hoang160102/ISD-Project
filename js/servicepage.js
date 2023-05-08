let getServiceBox = document.querySelector('.rest-service')
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
        for (let i = 0; i < data.length; i++) {
            getServiceBox.innerHTML += 
            `
            <div class="rest-service-box service">
                <a href="./servicedetail.html?id=${data[i].id}">
                    <div class="scale">
                        <img class="scale" src="${data[i].image}" alt="">
                    </div>
                    <div class="top-service-desc">
                        <a class="hover" href="./servicedetail.html?id=${data[i].id}">${data[i].name}</a>
                    </div>
                </a>
            </div>
            `
        }
    })