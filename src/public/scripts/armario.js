const armario = document.getElementById('armario');

if(armario){
    setTimeout(()=>{
        armario.classList.add('show-interfaz-armario');
    },500);
}