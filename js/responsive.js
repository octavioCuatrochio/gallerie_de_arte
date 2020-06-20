document.addEventListener("DOMContentLoaded", () => {

    let screen_width = screen.width;
    if(screen_width >= 1024){
        console.log(screen_width);
        document.querySelector("#js-feed").classList.add("content_centered");
    }


    let options_btn = document.querySelector("#js-openOptions");
    let register_btn = document.querySelector("#js-userRegister");
    let aside_register = document.querySelector("#js-aside_register");
    let aside = document.querySelector("#js-asidebar");
    let body = document.querySelector('body');

    options_btn.addEventListener("click",mostrar_aside);

    register_btn.addEventListener("click", mostrar_registro);

    function mostrar_aside() {
        aside.classList.toggle("asidebar_mostrada");
        aside.classList.add("transition");
       body.classList.toggle("stop_scroll");
        
    }

    function mostrar_registro() {
        console.log("asasasa");
        aside_register.classList.toggle("register_aside_mostrado");
        aside_register.classList.add("transition");
        body.classList.toggle("stop_scroll");
    }
    



});