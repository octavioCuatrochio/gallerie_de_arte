document.addEventListener("DOMContentLoaded", () => {

let container = document.querySelector("#js-container");

function cargarIndex(){

fetch("main.html")
    .then(content => {
        content.text().then(page => {
            container.innerHTML = page;
        })
    })

}


cargarIndex();


});