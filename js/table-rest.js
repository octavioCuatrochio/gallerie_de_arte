// document.addEventListener("DOMContentLoaded", () => {

function cargar() {
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
    function recibirDato(id) {
        fetch(baseURL + groupID + "/" + collectionID + "/" + id, {
            'method': 'GET',
        })
            //devuelve el comrpobante del envio
            .then(response => {
                response.json().then(json => {
                    if (json.status == "OK") {
                        crearRow(json.information);
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
                console.log("Error, no hay internet.");
            })
    }


    function cambiarDatos(id, datos) {
        fetch(baseURL + groupID + "/" + collectionID + "/" + id, {
            'method': 'PUT',
            'headers': {
                'Content-Type': 'application/json'
            },
            'body': JSON.stringify(datos)
        })
            //devuelve el comrpobante del envio
            .then(comprobacion => {
                comprobacion.json().then(json => {
                    recibirDato(id);
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

    function editarFila() {
        let tr = this.parentElement.parentElement;
        let all_td = tr.querySelectorAll("td");

        editar_tr(all_td);
    }

    function editar_tr(td_list) {

        //los paso a inputs
        for (td of td_list) {
            if (!td.classList.contains("important")) {
                let value = td.innerHTML;
                td.innerHTML = "";
                let input = document.createElement("input");
                input.value = value;
                td.appendChild(input);
            }
        }

        //reemplazo el boton editar por el boton guardar cambios
        td_list[6].innerHTML = `<button class="table_edit"> Guardar Cambios </button> `;

        //me servia cualquiera, y agarre el 6 porque..si qsy
        let tr = td_list[6].parentElement;
        let button_container = tr.lastElementChild;
        let btn = button_container.children[0];

        btn.addEventListener("click", guardarCambios);


    }

    function guardarCambios() {
        //del button al tr
        let tr = this.parentElement.parentElement;
        //estoy en el boton borrar
        let td_borrar = tr.lastElementChild.previousElementSibling;
        //selecciono el id
        let id = td_borrar.previousElementSibling.innerHTML;

        //agarro todos los input del usuario, osea los cambios
        let values = tr.querySelectorAll("input");

        let json = armarObjeto(values);

        tr.innerHTML = "";

        cambiarDatos(id, json);


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

        pos_tabla.innerHTML = "";

        if (condition == "") {

            for (let obra of json.obras) {
                crearRow(obra);
            }
        }
        else {
            for (let piece of json.obras) {
                if (condition == piece.thing.obra) {
                    crearRow(piece);
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
        if (json.thing.precio >= 5000) {
            row.classList.add("prioritario");
        }

        row.innerHTML = `
                    <tr>
                    <td>${json.thing.obra}</td>
                    <td>${json.thing.precio}</td>
                    <td>${json.thing.autor}</td>
                    <td>${json.thing.vendedor}</td>
                    <td class = "important">${json._id}</td>
                    <td class = "important">
                        <button class="table_delete">Borrar</button>
                    </td>
                    <td class = "important">
                        <button class="table_edit">Editar</button>
                    </td>
                    </tr>
                    `;

        let btn_borrar = row.querySelector(".table_delete").addEventListener("click", borrarFila);
        let btn_editar = row.querySelector(".table_edit").addEventListener("click", editarFila);
        pos_tabla.appendChild(row);
    }

    function autoActualizar() {
        
    }

    // recibirTodosDatos();
    // enviarDato(data);
    // recibirTodosDatos();
    // enviarDato(data);
    mostrarTabla();

}