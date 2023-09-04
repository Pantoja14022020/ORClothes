const messageSuccessConsulta = document.getElementById('message-success-consulta');
if(messageSuccessConsulta){
    messageSuccessConsulta.classList.add('show-message-success-consulta');

    setTimeout(()=>{
        messageSuccessConsulta.classList.remove('show-message-success-consulta');
    },2000);
}


const interfazDisponibles = document.getElementById('interfaz-disponibles');
if(interfazDisponibles){
    setTimeout(()=>{
        interfazDisponibles.classList.add('show-interfaz-disp');
    },500)
}