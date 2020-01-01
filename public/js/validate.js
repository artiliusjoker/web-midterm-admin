const password = document.getElementById("inputPassword")
    , confirmPassword = document.getElementById("confirmPassword")
    , errorMessage = document.getElementById('errorMessage')
    , button = document.getElementById('signupButton');
const regEx = /(?=.{6,})/m;

function validatePassword() {
    if (password.value != confirmPassword.value) {
        confirmPassword.setCustomValidity('Không giống nhau !');
        errorMessage.classList.remove('d-none');
    } else {
        errorMessage.classList.add('d-none');
        confirmPassword.setCustomValidity('');
    }
}

password.onchange = validatePassword;
confirmPassword.onkeyup = validatePassword;
button.onclick = function (){
    if(!regEx.test(password.value))
    {
        password.setCustomValidity('Mật khẩu phải có ít nhất 6 kí tự !');
    }
    else password.setCustomValidity('');
}