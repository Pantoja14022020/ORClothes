const mainWelcomeInterfaz = document.getElementById('main-welcome');

if(mainWelcomeInterfaz){
    setTimeout(()=>{
        mainWelcomeInterfaz.classList.add('slice-screen');
        setTimeout(()=>{
            //window.location.href = "https://orclothesapp.onrender.com/signin";
            window.location.href = "http://localhost:8080/signin";
        },500);
    },3000);
}