const mainSignupInterfaz = document.getElementById('main-signup');


if(mainSignupInterfaz){
    setTimeout(()=>{
        mainSignupInterfaz.classList.add('show');
    },500);
}


//Validar que se ingrese todos los campos
const nombreForm = document.getElementById('nombre');
const passwordForm = document.getElementById('password');
const telefonoForm = document.getElementById('telefono');
const correoForm = document.getElementById('correo');
const btnRegistrar = document.getElementById('btn-registrar');
const signupForm = document.getElementById('signup-form');




//Verificar que todos los campos esten llenos
const inputs = document.querySelectorAll('.signup-item  input');
inputs.forEach(campo => {
    campo.addEventListener("input", verificarCamposLlenos);
});
function verificarCamposLlenos() {
    const todosLlenos = Array.from(inputs).every(input => input.value.trim() !== "");
    
    if (todosLlenos) {
        btnRegistrar.classList.remove("hide");
    } else {
        btnRegistrar.classList.add("hide");
    }
}



//Verificar numero de telefono
function esNumeroDeTelefonoValido(numero) {
    const expresionRegular = /^\d{10}$/;
    return expresionRegular.test(numero);
}

if(signupForm){
    signupForm.addEventListener('submit',e=>{
        let error = '';
        let enviar  = true;
        if(!esNumeroDeTelefonoValido(telefonoForm.value)){
            enviar = false;
            error += `<p>Telefono incorrecto</p>`;
        }
        if(nombreForm.value.length < 8){
            enviar = false;
            error += `<p>Nombre, min 8 caract.</p>`;
        }
        if(passwordForm.value.length < 8){
            enviar = false;
            error += `<p>Password, min 8 caract.</p>`;
        }
        
        if(!enviar){
            e.preventDefault();
            const infoErrors = document.querySelector('#info-errors');
            infoErrors.querySelector('#txt-error').innerHTML = '';
            infoErrors.querySelector('#txt-error').innerHTML = error;
            infoErrors.classList.remove('hide-left');
            setTimeout(()=>{
                infoErrors.classList.add('hide-left');
            },3000)
        }
    })
}