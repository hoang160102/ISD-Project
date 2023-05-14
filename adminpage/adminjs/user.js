let getUserInfor = document.querySelector('.user-body')
let getAd = JSON.parse(localStorage.getItem('getUser'))
console.log(getAd)
fetch('http://localhost:3000/api/v1/orders', {
    method: "GET",
    headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${getAd.userToken}`
      },
})
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        console.log(data)
        let htmls = data.map(function(user) {
            return `
            <tr>
                            <td style= "text-align:center">
                                <button style="padding: 10px 15px;">Xóa<button>
                            </td>
                            <td>${user.name}</td>
                            <td>${user.email}</td>
                            <td>${user.phone}</td>
                            <td>${user.address}</td>
                            <td>${user.content}</td>
                        </tr>
            `
        })
        getUserInfor.innerHTML = htmls.join('')
    })
