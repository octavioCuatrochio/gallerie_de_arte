document.addEventListener("DOMContentLoaded", () => {

    let baseURL = 'http://web-unicen.herokuapp.com/api/groups/';
    let groupID = '148clgallery';
    let collectionID = 'obras';


    let data = {
        "thing":
        {
            "obra": "La noche estrellada",
            "precio": 35040,
            "autor" : "Van Gogh",
            "vendedor": "The Louvre Inc"
        }
    };

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
                    let contenedor = document.querySelector("#result");
                    contenedor.innerHTML = json;
                    console.log(json);
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
        event.preventDefault();
        fetch(baseURL + groupID + "/" + collectionID, {
            'method': 'GET',
        })
            //devuelve el comrpobante del envio
            .then(response => {
                response.json().then(json => {
                    // console.log(json);
                    let contenedor = document.querySelector("#result");
                    if (json.status == "OK") {
                        //recibir y mostrar todos los datos
                        for (let data of json.obras) {
                        contenedor.innerHTML += data.thing.obra + "<br />";
                        console.log(data.thing.obra);
                        }
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
                    let contenedor = document.querySelector("#result");
                    contenedor.innerHTML = "Lo Borró rey";
                    console.log(json);
                })
            })
            .catch(function (e) {
                console.log(e)
            })

    }

    // recibirTodosDatos();
    // enviarDato(data);
    recibirTodosDatos();

});