document.addEventListener("DOMContentLoaded", () => {

    cargarIndex();

    let container = document.querySelector("#js-container");
    let about = document.querySelector("#js-aboutBtn");
    let contact = document.querySelector("#js-contactBtn");
    let admin = document.querySelector("#js-adminBtn");
    let logo = document.querySelector("#js-logo");

    about.addEventListener("click", cargarAbout);
    logo.addEventListener("click", cargarIndex);
    contact.addEventListener("click", cargarContact);
    admin.addEventListener("click", cargarAdmin);



    function cargarAdmin() {
        fetch("table.html")
            .then(response => {
                response.text().then(html => {
                    restaurarClases(container);
                    container.classList.add("admin");
                    container.classList.add("content_centered");
                    container.innerHTML = html;
                    mostrar_aside();
                    cargarTabla();
                })
            })
    }


    function cargarContact() {
        fetch("contact.html")
            .then(response => {
                response.text().then(html => {
                    restaurarClases(container);
                    container.classList.add("contact");
                    container.classList.add("content_centered");
                    container.innerHTML = html;
                    mostrar_aside();
                })
            })
    }



    function cargarAbout() {
        fetch("about.html")
            .then(response => {
                response.text().then(html => {
                    restaurarClases(container);
                    container.classList.add("about");
                    container.classList.add("content_centered");
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
                    container.classList.remove("content_centered");
                    container.innerHTML = html;
                    cargarRecientes();
                })
            })

    }

    function restaurarClases(container) {
        container.classList.remove(...container.classList);
        container.classList.add("container");
    }

});