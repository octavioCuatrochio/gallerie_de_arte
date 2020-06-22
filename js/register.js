document.addEventListener("DOMContentLoaded", () => {

    document.querySelector("#js-register").addEventListener("click", () => {
        comprobar_form(event, captcha);
    });

    let captcha = crear_captcha();

    function comprobar_form(event, captcha) {
        event.preventDefault();

        let error_displayer = document.querySelector("#error_displayer");
        let form = document.querySelector("#js-aside_register");
        //creo un array con todos los imputs en el form 
        let info = form.querySelectorAll("input");

        // error_displayer.innerHTML = "";
        //les doy nombres
        let correo = info[0].value;
        let contra1 = info[1].value;
        let contra2 = info[2].value;
        let captcha_input = info[3].value;

        let comprobador = false;
        for (let item of info) {
            if (item.value == "") {
                comprobador = true;
            }
        }
        if (comprobador == true) {
            error_displayer.classList.add("error");
            error_displayer.innerHTML = "Complete todos los campos";
            return 0;
        }
        else if (contra1 != contra2) {
            error_displayer.classList.add("error");
            error_displayer.innerHTML = "Las contraseñas no coinciden";
            return 0;
        }
        else if (captcha != captcha_input) {
            error_displayer.classList.add("error");
            error_displayer.innerHTML = "Los captchas no coinciden";
            return 0;
        }

        else {
            error_displayer.classList.remove("error");
            error_displayer.classList.add("checked");
            error_displayer.innerHTML = "Te has registrado exitosamente!";
            setTimeout(mostrar_registro, 1000);
        }
    }

    function crear_captcha() {
        let captcha = Math.floor((Math.random() + 1) * 1000);
        let captcha_output = document.querySelector("#js-captcha_output");
        captcha_output.innerHTML = captcha;
        return captcha;
    }

});