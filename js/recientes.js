function cargarRecientes() {

    let baseURL = 'http://web-unicen.herokuapp.com/api/groups/';
    let groupID = '148clgallery';
    let collectionID = 'obras';
    let lista = document.querySelector("#js-recent_artwork");

    function recibirObras() {
        fetch(baseURL + groupID + "/" + collectionID, {
            'method': 'GET',
        })
            .then(response => {
                response.json().then(json => {
                    if (json.status == "OK") {
                        for (let obra of json.obras) {
                            if(obra.thing.imagen == ""){
                                obra.thing.imagen = "https://www.dekrs.com/img/image_not_found.png";
                            }
                            mostrarObra(obra);
                        }
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

    function mostrarObra(json) {
        // json.thing.autor, etc
        let li = document.createElement("li");

        li.innerHTML = `
        <article class="card__container">
            <img src="${json.thing.imagen}"
                alt="${json.thing.obra}" class="img__featured">
            <article class="card__text">
            <div class= "card__name_price">
                <h2>${json.thing.obra}</h2>
                <div class= "price_box">
                    <h3> $${json.thing.precio}</h3>
                </div>
            </div>
                <h4>Autor: ${json.thing.autor}</h4>
                <h5> Vendedor: ${json.thing.vendedor}.</h5>
            </article>
        </article>
                    `;

        lista.appendChild(li);

        let divisor = document.createElement("hr");
        divisor.classList.add("divider_transparent");

        lista.appendChild(divisor);

    }

    recibirObras();

}