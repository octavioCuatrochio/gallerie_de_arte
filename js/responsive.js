document.addEventListener("DOMContentLoaded", () => {

    let screen_width = screen.width;
    if(screen_width >= 1024){
        console.log(screen_width);
        document.querySelector("#js-feed").classList.add("content_centered");
    }


    let options_btn = document.querySelector("#js-openOptions");
    let aside = document.querySelector("#js-asidebar");
    let body = document.querySelector('body');

    options_btn.addEventListener("click",mostrar_aside);


    function mostrar_aside() {
        aside.classList.toggle("asidebar_mostrada");
        aside.classList.add("transition");
       body.classList.toggle("stop_scroll");
        
    }
    



});