const armario = document.getElementById('armario');

if(armario){
    setTimeout(()=>{
        armario.classList.add('show-interfaz-armario');
    },500);
}


const marcaSeccion = document.getElementById('marca');
const tallasSeccion = document.getElementById('tallas');
const categoriaSeccion = document.getElementById('categoria');
const subcategoriaSeccion = document.getElementById('subcategoria');


if(marcaSeccion){
    marcaSeccion.addEventListener('click',e=>{
        console.log("click marca")
    });
}

if(tallasSeccion){
    tallasSeccion.addEventListener('click',e=>{
        console.log("click talla")
    });
}

if(categoriaSeccion){
    categoriaSeccion.addEventListener('click',e=>{
        console.log("click categoria")
    });
}

if(subcategoriaSeccion){
    subcategoriaSeccion.addEventListener('click',e=>{
        console.log("click subcategoria")
    });
}



















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
}