const btnsNavbar = document.querySelectorAll('.btn-navbar');
const prendasTodo =  document.querySelectorAll('.item-prenda');
const btnAllPrendas = document.getElementById('all-prendas');

if(btnsNavbar && prendasTodo && btnAllPrendas){

    btnsNavbar.forEach(btn => {
        btn.addEventListener('click', e => {
            
            btnsNavbar.forEach(boton => {
                if(boton.textContent == e.target.textContent){
                    e.target.classList.add('active-navbar');
                }else{
                    if(boton.classList.contains('active-navbar')){
                        boton.classList.remove('active-navbar');
                    }
                }
            });
            
            const prendasContainer = document.getElementById('prendas');//Selecciono el contenedor que tiene las prendas
            //let items = '';
            const idOptionSelected = parseInt(e.target.getAttribute('data-id'));//Se obtiene el id de la opcion escogida
            //const prendasTodo =  document.querySelectorAll('.item-prenda');//Selecciono todas la prendas
            prendasContainer.innerHTML = '';
            prendasTodo.forEach(prenda => {
                if(idOptionSelected == parseInt(prenda.getAttribute('data-id'))){
                    //console.log(prenda)
                    prendasContainer.appendChild(prenda)
                }
            })

        });
    });


    btnAllPrendas.addEventListener('click', e => {
        const prendasContainer = document.getElementById('prendas');
        prendasContainer.innerHTML = '';
        prendasTodo.forEach(prenda => {
            prendasContainer.appendChild(prenda)
        })
    });
}