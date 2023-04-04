let thirdNavMenu = document.querySelector('.nav-menu:nth-child(3)')
let fourthNavMenu = document.querySelector('.nav-menu:nth-child(4)')
let lastNavMenu = document.querySelector('.nav-menu:last-child')
let getContent = document.querySelector('.content')
let getList = document.querySelector('.list')
thirdNavMenu.addEventListener('click', function () {
    getList.innerText = 'Quản trị tài khoản'
    if (getContent.hasChildNodes()) {
        getContent.removeChild(getContent.firstChild)
        getContent.innerHTML = `
    <table>
                    <thead>
                        <tr>
                            <th>Họ và tên</th>
                            <th>Email</th>
                            <th>Số điện thoại</th>
                            <th>Địa chỉ</th>
                            <th>Nội dung</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Nguyễn Việt Hoàng</td>
                            <td>hoang160102@gmail.com</td>
                            <td>0948213060</td>
                            <td>Hà Nội dsadasdasdasdasdasdasd</td>
                            <td>Tôi muốn thuê dịch vụ của coongh ty ở địa chỉ số 4 ngách 21/31 và địa chỉ ở abcd abcd abcd abcd abcd abcd abcd</td>
                        </tr>
                        <tr>
                            <td>Nguyễn Việt Hoàng</td>
                            <td>hoang160102@gmail.com</td>
                            <td>0948213060</td>
                            <td>Hà Nội dsadasdasdasdasdasdasd</td>
                            <td>Tôi muốn thuê dịch vụ của coongh ty ở địa chỉ số 4 ngách 21/31 và địa chỉ ở abcd abcd abcd abcd abcd abcd abcd</td>
                        </tr>
                        <tr>
                            <td>Nguyễn Việt Hoàng</td>
                            <td>hoang160102@gmail.com</td>
                            <td>0948213060</td>
                            <td>Hà Nội dsadasdasdasdasdasdasd</td>
                            <td>Tôi muốn thuê dịch vụ của coongh ty ở địa chỉ số 4 ngách 21/31 và địa chỉ ở abcd abcd abcd abcd abcd abcd abcd</td>
                        </tr>
                        <tr>
                            <td>Nguyễn Việt Hoàng</td>
                            <td>hoang160102@gmail.com</td>
                            <td>0948213060</td>
                            <td>Hà Nội dsadasdasdasdasdasdasd</td>
                            <td>Tôi muốn thuê dịch vụ của coongh ty ở địa chỉ số 4 ngách 21/31 và địa chỉ ở abcd abcd abcd abcd abcd abcd abcd</td>
                        </tr>
                    </tbody>
                </table>
    `
    }
})

fourthNavMenu.addEventListener('click', function() {
    getList.innerText = 'Quản trị dịch vụ'
    if (getContent.hasChildNodes()) {
        getContent.removeChild(getContent.firstChild)
        getContent.innerHTML = `<div>ahihi</div>`
    }
})

lastNavMenu.addEventListener('click', function() {
    getList.innerText = 'Quản trị tin tức'
    if (getContent.hasChildNodes()) {
        getContent.removeChild(getContent.firstChild)
        getContent.innerHTML = `<div>ahuhuh</div>`
    }
}) 
