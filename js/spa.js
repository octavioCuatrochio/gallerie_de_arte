document.addEventListener("DOMContentLoaded", () => {
    
    cargarIndex();

let container = document.querySelector("#js-container");

function cargarIndex(){

fetch("main.html")
    .then(content => {
        content.text().then(page => {
            container.classList.add("index");
            container.innerHTML = page;
        })
    })

}




});