const mainSigninInterfaz = document.getElementById('main-signin');

const emailInput = document.getElementById('email-input');
const passwordInput = document.getElementById('password-input');
const signinForm = document.getElementById('signin-form');
const mnsgSignin = document.querySelector('#msg-signin'); //selecciono el item de notiifcaicon sobre campos

if(signinForm){
    signinForm.addEventListener('submit',e=>{
        if(emailInput.value.length <= 0 || passwordInput.value.length <= 0){
            e.preventDefault();
            mnsgSignin.classList.remove('slice-right-hide');
            setTimeout(()=>{
                mnsgSignin.classList.add('slice-right-hide');
            },2000);
        }
    });
}