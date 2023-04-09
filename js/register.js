let getSubmitForm = document.querySelector('.submit-form')
let getName = document.querySelector('#username')
let getEmail = document.querySelector('#email')
let getPhone = document.querySelector('#phone')
let getPassword = document.querySelector('#password')
let getToastMessage = document.querySelector('#toast')
getSubmitForm.addEventListener('click', function() {
    let getEmailValue = getEmail.value
    let getNameValue = getName.value
    let getPhoneValue = getPhone.value
    let getPasswordValue = getPassword.value
    console.log(getEmailValue, getNameValue, getPhoneValue, getPasswordValue)
    // if (!checkRequired([getName, getEmail, getPassword, getPhone])) {
	// 	checkLength(getName, 3, 15)
	// 	checkLength(getPassword, 6, 25)
	// 	checkEmail(getEmail)
	// }
    let toasts = {
        icon: '<i class="fa fa-check-circle"></i>',
        msg: 'Đăng ký thành công'
    }
    fetch('http://localhost:3000/api/v1/users/register', {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: getEmailValue, name: getNameValue, phone: getPhoneValue, password: getPasswordValue})
      }).then(res => res.json())
        .then(res => {
            console.log(res)
            let toast = document.createElement('div')
            toast.className = `toast`
            toast.innerHTML = `
                ${toasts.icon}
                <span class="msg">${toasts.msg}</span>
                <span class="countdown"></span>
            `
            getToastMessage.appendChild(toast)
            setTimeout(() => {
                toast.style.animation = 'hide_slide 1s ease forwards'
            }, 2000)
            setTimeout(() => {
                toast.remove()
            }, 3000)
            setTimeout(() => {
                window.location.assign('./login.html')
            }, 4000)
        })
        .catch((errorMessage) => {
            console.error('Catch với tham số lỗi ' + errorMessage);
            return 456;
        })
})

// function showError(input, message) {
// 	const formControl = input.parentElement
// 	formControl.className = 'form-control error'
// 	const small = formControl.querySelector('small')
// 	small.innerText = message
// }

// function showSuccess(input) {
// 	const formControl = input.parentElement
// 	formControl.className = 'form-control success'
//     const small = formControl.querySelector('small')
// 	small.innerText = ''
// }

// function checkEmail(input) {
// 	const re =
// 		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

// 	if (re.test(input.value.trim())) {
// 		showSuccess(input)
// 	} else {
// 		showError(input, 'Email khong hop le')
// 	}
// }

// function checkRequired(inputArr) {
// 	let isRequired = false
// 	inputArr.forEach(function (input) {
// 		if (input.value.trim() === '') {
// 			showError(input, `Kiem tra du lieu nhap vao`)
// 			isRequired = true
// 		} else {
// 			showSuccess(input)
// 		}
// 	})
// 	return isRequired
// }

// function checkLength(input, min, max) {
// 	if (input.value.length < min) {
// 		showError(
// 			input,
// 			`${getFieldName(input)} must be at least ${min} characters`
// 		)
// 	} else if (input.value.length > max) {
// 		showError(
// 			input,
// 			`${getFieldName(input)} must be less than ${max} characters`
// 		)
// 	} else {
// 		showSuccess(input)
// 	}
// }