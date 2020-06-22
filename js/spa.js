document.addEventListener("DOMContentLoaded", () => {

    cargarIndex();

    let container = document.querySelector("#js-container");
    let about = document.querySelector("#js-aboutBtn");
    let contact = document.querySelector("#js-contactBtn");
    let admin = document.querySelector("#js-adminBtn");
    let logo = document.querySelector("#js-logo");

    about.addEventListener("click", cargarAbout);
    logo.addEventListener("click", cargarIndex);



    function cargarAbout() {
        fetch("about.html")
            .then(response => {
                response.text().then(html => {
                    container.classList.add("about");
                    container.innerHTML = html;
                    mostrar_aside();
                })
            })
    }

    function cargarIndex() {
        fetch("main.html")
            .then(content => {
                content.text().then(html => {
                    container.classList.add("index");
                    container.innerHTML = html;
                })
            })

    }




});