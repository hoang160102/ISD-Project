let getSubmitForm = document.querySelector('.submit-form')
let getEmail = document.querySelector('#email')
let getPassword = document.querySelector('#password')
let getPassMessage = document.querySelector('.pass-msg')
let getEmailMessage = document.querySelector('.email-msg')
console.log(getEmailMessage)
getSubmitForm.addEventListener('click', function() {
    let getEmailValue = getEmail.value
    let getPasswordValue = getPassword.value
    console.log(getEmailValue, getPasswordValue)
    fetch('http://localhost:3000/api/v1/users/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: getEmailValue, password: getPasswordValue})
      }).then(res => res.json())
        .then(res => {
            console.log(res)
            window.location.assign('../adminpage/admin.html')
        })
        .catch((errorMessage) => {
            console.log(errorMessage)
            if(errorMessage.toString().includes("The user not found")) {
                getEmailMessage.innerText = 'Email khong ton tai'
                getPassMessage.innerText = ''
            }
            if(errorMessage.toString().includes("password is wrong")) {
                getPassMessage.innerText = 'Mat khau khong chinh xac, xin vui long nhap lai'
                getEmailMessage.innerText = ''
            }
            return 456;
        })
})  
