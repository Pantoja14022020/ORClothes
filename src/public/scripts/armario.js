const armario = document.getElementById('armario');

if(armario){
    setTimeout(()=>{
        armario.classList.add('show-interfaz-armario');
    },500);
}






/*
const disponiblesSeccion = document.getElementById('disponibles');
const reparacionSeccion = document.getElementById('reparacion');
const suciosSeccion = document.getElementById('sucios');
const lavanderiaSeccion = document.getElementById('lavanderia');


if(disponiblesSeccion){
    disponiblesSeccion.addEventListener('click',e => {
        console.log("click en disponibles")       
    });
}

if(reparacionSeccion){
    reparacionSeccion.addEventListener('click', e => {
        console.log("click en reparacion");
    });
}

if(suciosSeccion){
    suciosSeccion.addEventListener('click', e => {
        console.log("click en sucios")
    });
}

if(lavanderiaSeccion){
    lavanderiaSeccion.addEventListener('click', e => {
        console.log("click en lavanderia")
    });
}*/



const menuBars = document.getElementById('menu-bars');
const menuArmario = document.getElementById('menu-armario');

if(menuBars && menuArmario){
    menuBars.addEventListener('click', e => {
        menuArmario.classList.toggle('show-menu');
    });
}