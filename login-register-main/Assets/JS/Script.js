//Declaración de variables
let contenedor_login_register = document.querySelector(".contenedor__login-register");  //Contenedor del login y register
let formulario_Login = document.querySelector(".formulario__login");  //Formulario del login
let formulario_register = document.querySelector(".formulario__register");  //Formulario del register
let caja_trasera_login = document.querySelector(".caja__trasera-login");  //Caja trasera del login
let caja_trasera_register = document.querySelector(".caja__trasera-register");  //Caja trasera del register

window.addEventListener("resize", anchoPagina =  () => {   //Evento que se ejecuta cuando se redimensiona la pantalla
    if(window.innerWidth >850){  //Si el ancho de la pantalla es mayor a 850px
        caja_trasera_login.style.display = "block";  //Se muestra la caja trasera del login
        caja_trasera_register.style.display = "block"; //Se muestra la caja trasera del register
    }else{
        caja_trasera_register.style.display = "block"; //Se muestra la caja trasera del register
        caja_trasera_register.style.opacity = "1"; //Se muestra la caja trasera del register
        caja_trasera_login.style.display = "none"; //Se oculta la caja trasera del login
        formulario_Login.style.display = "block"; //Se muestra el formulario del login
        formulario_register.style.display = "none"; //Se oculta el formulario del register
        contenedor_login_register.style.left = "0px"; //Se mueve el contenedor del login a la izquierda
    }
});

anchoPagina(); //Se ejecuta la función anchoPagina

document.getElementById("btn__iniciar-sesion").addEventListener("click", login = () => {  //Evento que se ejecuta cuando se hace click en el botón de iniciar sesión

    if(window.innerWidth > 850){ //Si el ancho de la pantalla es mayor a 850px
        formulario_register.style.display = "none"; //Se oculta el formulario del register
        contenedor_login_register.style.left = "10px"; //Se mueve el contenedor del login a la izquierda
        formulario_Login.style.display = "block"; //Se muestra el formulario del login
        caja_trasera_register.style.opacity = "1"; //Se muestra la caja trasera del register
        caja_trasera_login.style.opacity = "0"; //Se oculta la caja trasera del login
    }else{ //Si el ancho de la pantalla es menor a 850px
        formulario_register.style.display = "none"; //Se oculta el formulario del register
        contenedor_login_register.style.left = "0px"; //Se mueve el contenedor del login a la izquierda
        formulario_Login.style.display = "block"; //Se muestra el formulario del login
        caja_trasera_register.style.display = "block"; //Se muestra la caja trasera del register
        caja_trasera_login.style.display = "none"; //Se oculta la caja trasera del login
    }
});

document.getElementById("btn__registrarse").addEventListener("click", register = () => { //Evento que se ejecuta cuando se hace click en el botón de registrarse

    if(window.innerWidth > 850){ //Si el ancho de la pantalla es mayor a 850px
        formulario_register.style.display = "block"; //Se muestra el formulario del register
        contenedor_login_register.style.left = "410px"; //Se mueve el contenedor del login a la derecha 
        formulario_Login.style.display = "none"; //Se oculta el formulario del login
        caja_trasera_register.style.opacity = "0";  //Se oculta la caja trasera del register
        caja_trasera_login.style.opacity = "1"; //Se muestra la caja trasera del login
    }else{ //Si el ancho de la pantalla es menor a 850px
        formulario_register.style.display = "block"; //Se muestra el formulario del register
        contenedor_login_register.style.left = "0px"; //Se mueve el contenedor del login a la derecha
        formulario_Login.style.display = "none"; //Se oculta el formulario del login
        caja_trasera_register.style.display = "none"; //Se oculta la caja trasera del register
        caja_trasera_login.style.display = "block"; //Se muestra la caja trasera del login
        caja_trasera_login.style.opacity = "1"; //Se muestra la caja trasera del login
    }
});

/////////////////////////////////////////////////////////////
let modalError = document.getElementById("myModal");
let span = document.getElementById("close");
let text_modal = document.getElementById("text-modal");

span.onclick = function() {
    modalError.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modalError) {
        modalError.style.display = "none";
    }
}

//////////////////////////////////////////////////////////////
let intruccion_login = document.querySelector("#inst-login");
let intruccion_register = document.querySelector("#inst-register");

intruccion_login.addEventListener("click", ()=>{
    text_modal.innerHTML = "Puede usar cualquiera de los nombres de usuario y contraseñas de los usuarios disponibles en la API de los usuarios para obtener el token. cualquier otro nombre de usuario devuelve un error.";
    modalError.style.display = "block";
});

intruccion_register.addEventListener("click", ()=>{
    text_modal.innerHTML = "Si envía un objeto como el código anterior, le devolverá un objeto con una nueva identificación. recuerde que nada real se insertará en la base de datos. entonces, si desea acceder a la nueva identificación, obtendrá un error 404.";
    modalError.style.display = "block";
});

/////////////////////////////////////////////////////////////
//Modal de registro
const modal = document.querySelector('.modal');
const closeModal = document.querySelector('.modal__close');

closeModal.addEventListener('click', (e)=>{
    modal.classList.remove('modal--show');
    setTimeout(reiniciar, 850);
});

const reiniciar = () => {
    window.location = "../index.html";
}
/////////////////////////////////////////////////////
let btn_listo_register = document.querySelector("#btn__listo-register"); //Botón de listo del register
let correo_register = document.querySelector("#correo-register"); //Input del correo del register
let usuario_register = document.querySelector("#usuario-register"); //Input del usuario del register
let nombre_register = document.querySelector("#nombre-register"); //Input del nombre del register
let apellido_register = document.querySelector("#apellido-register"); //Input del apellido del register

let contraseña_register = document.getElementById("contraseña_register");
let contraseña_confirm = document.getElementById("contraseña_confirm");

btn_listo_register.addEventListener('click', function(){
    let msg = "";
    if(correo_register.value == "" || usuario_register.value == "" || nombre_register.value == "" || apellido_register.value == "" || contraseña_register.value == "" || contraseña_confirm.value == ""){
        msg = "Todos los campos son obligatorios";
    }else{
        if(contraseña_register.value != contraseña_confirm.value){
            msg += "<br>- Las contraseñas no coinciden";
        }if(contraseña_register.value.length < 6){
            msg += "<br>- La contraseña debe tener al menos 6 caracteres";
        }if(contraseña_register.value.length > 20){
            msg += "<br>- La contraseña debe tener menos de 20 caracteres";
        }if(contraseña_register.value.search(/[a-z]/i) < 0){
            msg += "<br>- La contraseña debe tener al menos una letra minúscula";
        }if(contraseña_register.value.search(/[A-Z]/i) < 0){
            msg += "<br>- La contraseña debe tener al menos una letra mayúscula";
        }if(contraseña_register.value.search(/[0-9]/i) < 0){
            msg += "<br>- La contraseña debe tener al menos un número";
        }if(contraseña_confirm.value == ""){
            msg += "<br>- Confirmar contraseña";
        }if(correo_register.value.search(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) == -1){
            msg += "<br>- El correo no es válido";
        }
        if(correo_register.value.length > 50){
            msg += "<br>- El correo debe tener menos de 50 caracteres";
        }if(usuario_register.value.length < 6){
            msg += "<br>- El usuario debe tener al menos 6 caracteres";
        }if(usuario_register.value.length > 20){
            msg += "<br>- El usuario debe tener menos de 20 caracteres";
        }if(nombre_register.value.search(/[0-9]/i) > 0){
            msg += "<br>- El nombre no puede contener números";
        }if(apellido_register.value.search(/[0-9]/i) > 0){
            msg += "<br>- El apellido no puede contener números";
        }
    }if(msg != ""){
        text_modal.innerHTML = msg;
        modalError.style.display = "block";
    }else{
        document.getElementById("cargando").style.display = 'block';
        fetch('https://fakestoreapi.com/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(
                {
                    email: correo_register.value,
                    username: usuario_register.value,
                    password: contraseña_register.value,
                    name:{
                        firstname: nombre_register.value,
                        lastname: apellido_register.value
                    },
                    address:{
                        city: "Ciudad",
                        street: "Calle",
                        number: "0",
                        zipcode: "00000",
                        geolocation:{
                            lat:'0',
                            long:'0'
                        }
                    },
                    phone:'0000000000',
                }
            )
        })
        .then(response=>{
            if(response.ok){
                return response.json();
            }else if(response.status === 404) {
                console.clear();
                throw new Error("Error 404: No se encontró el recurso");
            }else if(response.status === 500) {
                console.clear();
                throw new Error("Error del servidor");
            }else {
                console.clear();
                throw new Error("Error desconocido");
            }
        })
        .then(json => {
            PostData(json);
            console.log(json);
        })
        .catch(error => console.log('ERROR ---->', error))
        .finally(()=>{
            document.getElementById("cargando").style.display = 'none';
        })
    }
});

const PostData = (data) => {
    let msg__modal = ""
    msg__modal += `<b>Usuario:</b> ${data.username}<br>`;
    msg__modal += `<b>Correo:</b> ${data.email}<br>`;
    msg__modal += `<b>Contraseña:</b> ${data.password}<br>`;
    msg__modal += `<b>Dirección:</b> ${data.address.street}<br>`;
    msg__modal += `<b>Ciudad:</b> ${data.address.city}<br>`;
    msg__modal += `<b>Teléfono:</b> ${data.phone}<br>`;

    document.querySelector('.modal__paragraph').innerHTML = msg__modal;
    modal.classList.add('modal--show');
}

/////////////////////////////////////////////////////
//Check
document.getElementById('ocultar-contraseña').addEventListener('change', e => {

    if (document.getElementById('ocultar-contraseña').checked){
        contraseña_register.type = 'password';
        contraseña_confirm.type = 'password';
    } else {
        contraseña_register.type = 'text';
        contraseña_confirm.type = 'text';
    }
});


////////////////////////////////////////////////////////////
let btn_listo_login = document.querySelector("#btn__listo-login"); //Botón de listo del login
let usuario_login = document.querySelector("#usuario-login"); //Input de usuario del login
let contraseña_login = document.querySelector("#contraseña-login"); //Input de contraseña del login

btn_listo_login.addEventListener('click', () => {
    let msg = "";
    if(usuario_login.value == "" || contraseña_login.value == ""){
        msg = "Todos los campos son obligatorios";
    }
    if(msg != ""){
        text_modal.innerHTML = msg;
        modalError.style.display = "block";
    }else{
        document.getElementById("cargando").style.display = 'block';
        fetch('https://fakestoreapi.com/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(
                {
                username: usuario_login.value,
                password: contraseña_login.value,
            })
        })
        .then(response=>{
            if(response.ok){
                return response.json();
            }else if(response.status === 404) {
                console.clear();
                throw new Error("Error 404: No se encontró el recurso");
            }else if(response.status === 500) {
                console.clear();
                throw new Error("Error del servidor");
            }else {
                console.clear();
                text_modal.innerHTML = "El usuario o la contraseña son incorrectos";
                modalError.style.display = "block";
                throw new Error("Error desconocido");
            }
        })
        .then(json => {
            document.querySelector('.modal__paragraph').innerHTML = "Se le ha generado un Token";
            document.querySelector('.modal__title').innerHTML = "¡Iniciaste con EXITO!";
            modal.classList.add('modal--show');
            console.log(json);
        })
        .catch(error => console.log('ERROR ---->', error))
        .finally(()=>{
            document.getElementById("cargando").style.display = 'none';
        })
    }
});
