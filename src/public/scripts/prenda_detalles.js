const modalPrendaDetallesContainer =  document.getElementById('modal-prenda-detalles-container');
const btnSolicitar =  document.getElementById('btn-solicitar');
const closeModal = document.getElementById('close-modal');

if(modalPrendaDetallesContainer && btnSolicitar && closeModal){
    btnSolicitar.addEventListener('click', e => {
        modalPrendaDetallesContainer.classList.add('show-modal-prenda');
    });

    closeModal.addEventListener('click', e => {
        modalPrendaDetallesContainer.classList.remove('show-modal-prenda');
    });
}


const btnSolicit = document.getElementById('btn-solicit');
const emailApartar = document.getElementById('email-apartar');
const nombreCliente = document.getElementById('nombre_cliente');
if(btnSolicit && emailApartar && nombreCliente){
    emailApartar.addEventListener("input", validarInputs);
    nombreCliente.addEventListener("input", validarInputs);
}

function validarInputs() {
    const emailValue = emailApartar.value.trim();
    const textValue = nombreCliente.value.trim();

    if (emailValue !== "" && textValue !== "") {
        btnSolicit.classList.remove('hide-btn-prenda');
    } else {
        btnSolicit.classList.add('hide-btn-prenda');
    }
}




const successPrendaDetalles = document.getElementById('success-prenda-detalles');
if(successPrendaDetalles){
    setTimeout(()=>{
        successPrendaDetalles.classList.add('show-success-prenda-det');
    },3000)
}