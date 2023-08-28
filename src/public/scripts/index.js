const mainWelcomeInterfaz = document.getElementById('main-welcome');

if(mainWelcomeInterfaz){
    setTimeout(()=>{
        mainWelcomeInterfaz.classList.add('slice-screen');
        setTimeout(()=>{
            window.location.href = "https://orclothesapp.onrender.com/signin";
        },500);
    },3000);
}