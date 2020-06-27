// document.addEventListener("DOMContentLoaded", () => {

function cargar(){

    console.log("avance?");
    let baseURL = 'http://web-unicen.herokuapp.com/api/groups/';
    let groupID = '148clgallery';
    let collectionID = 'obras';
    let pos_tabla = document.querySelector("#js-tablaObras");

    document.querySelector("#js-filter").addEventListener("click", mostrarTabla);
    document.querySelector("#js-add").addEventListener("click", agregarObra);

    //para mandar info
    function enviarDato(dato) {
        event.preventDefault();
        fetch(baseURL + groupID + "/" + collectionID, {
            'method': 'POST',
            'headers': {
                'Content-Type': 'application/json'
            },
            'body': JSON.stringify(dato)
        })
            //devuelve el comrpobante del envio
            .then(comprobacion => {
                comprobacion.json().then(json => {
                    crearRow(json.information);
                })
            })
            .catch(function (e) {
                console.log(e)
            })

    }

    // para recibir info especifica
    // GET
    function recibirDato(id) {
        event.preventDefault();
        fetch(baseURL + groupID + "/" + collectionID + "/" + id, {
            'method': 'GET',
        })
            //devuelve el comrpobante del envio
            .then(response => {
                response.json().then(json => {
                    console.log(json);
                    let contenedor = document.querySelector("#result");
                    if (json.status == "OK") {
                        //recibir y mostrar todos los datos
                        // for (let data of json.obras) {
                        contenedor.innerHTML = data.thing.obra + "<br />";
                        // }
                    }
                    else {
                        contenedor.innerHTML = json.message;
                    }
                })
            })
            .catch(function (e) {
                console.log(e)
            })

    }

    function recibirTodosDatos() {

        // event.preventDefault();
        fetch(baseURL + groupID + "/" + collectionID, {
            'method': 'GET',
        })
            //devuelve el comrpobante del envio
            .then(response => {
                response.json().then(json => {
                    if (json.status == "OK") {
                        //recibir y mostrar todos los datos
                        Filter(json);
                    }
                    else {
                        console.log(json.message);
                    }
                })
            })
            .catch(function (e) {
                console.log(e)
            })
    }


    function agregarObra() {
        let form = this.parentElement;
        let values = form.querySelectorAll("input");

        let json = armarObjeto(values);
        enviarDato(json);
    }



    function armarObjeto(array) {
        return json = {
            "thing":
            {
                "obra": array[0].value,
                "precio": array[1].value,
                "autor": array[2].value,
                "vendedor": array[3].value
            }
        }
    }


    //para borrar info
    function borrarDato(id) {
        event.preventDefault();
        //hay que pasarle la id
        fetch(baseURL + groupID + "/" + collectionID + "/" + id, {
            'method': 'DELETE',
        })
            //devuelve el comrpobante del envio
            .then(comprobacion => {
                comprobacion.json().then(json => {
                    console.log("borrado");
                })
            })
            .catch(function (e) {
                console.log(e)
            })

    }

    function borrarFila() {

        let td = this.parentElement;
        let tr = td.parentElement;
        let id = td.previousElementSibling.innerHTML;

        tr.innerHTML = "";
        borrarDato(id);
    }


    function Filter(json) {
        let condition = document.querySelector("#js-input-filter").value;
        let vacio = true;
        pos_tabla.innerHTML = "";

        if (condition == "") {

            for (let obra of json.obras) {
                crearRow(obra);
            }
            let botones = pos_tabla.querySelectorAll(".table_btn");
            for (let boton of botones) {
                boton.addEventListener("click", borrarFila);
            }
        }
        else {
            for (let piece of json.obras) {
                if (condition == piece.thing.obra) {
                    vacio = false;
                    crearRow(obra);
                }
                else {
                    pos_tabla.innerHTML = "No hay nada que coincida con ese filtro";
                }

            }
        }
    }


    function mostrarTabla() {

        recibirTodosDatos();

        //no anda si lo llamo desde recibirTodosDatos?
    }


    function crearRow(json) {

        let row = document.createElement("tr");
        console.log(json);
        if (json.thing.precio >= 5000) {
            row.classList.add("prioritario");
        }

        row.innerHTML = `
                    <tr>
                        <td>${json.thing.obra}</td>
                        <td>${json.thing.precio}</td>
                        <td>${json.thing.autor}</td>
                        <td>${json.thing.vendedor}</td>
                        <td>${json._id}</td>
                        <td>
                        <button class="table_btn">Borrar</button>
                        </td>
                    </tr>
                  `;

        let btn = row.querySelector("button").addEventListener("click", borrarFila);
        pos_tabla.appendChild(row);
    }

    // recibirTodosDatos();
    // enviarDato(data);
    // recibirTodosDatos();
    // enviarDato(data);
    mostrarTabla();

}