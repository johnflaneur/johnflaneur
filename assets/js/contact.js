// SECCIÓN CONTACTO FORMULARIO

//CONTACTO - VARIABLES Y CONSTANTES con sus respectivos arrays-objetos
const form = document.getElementById("formC");
const tryAgainForm = document.getElementById("try-again");

const [formName, formEmail, formSubject, formMessage] = [
  document.querySelector("#nameC"),
  document.querySelector("#emailC"),
  document.querySelector("#subjectC"),
  document.querySelector("#messageC"),
];
form.addEventListener("submit",  (e) =>{
    e.preventDefault();
    let warnings = "";
    let entrar = false;
    tryAgainForm.innerHTML = "";
    let regexEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if(formName.value.length < 6){
        warnings += `Nombre incompleto <br>`;
        entrar = true;
    }
    if(!regexEmail.test(formEmail.value)){
        warnings += `Email inválido <br>`;
        entrar = true;
    }
    if(formSubject.value.length < 8){
        warnings += `<br>Asunto inválido</br>`;
        entrar = true;
    }
    if(formMessage.value.length < 80){
        warnings += `Mensaje inválido`
    }
    if(entrar){
        tryAgainForm.innerHTML = warnings
    }
    else{
        Swal.fire({
              width: "50rem",
              height: "50rem",
              icon: "success",
              iconColor: "#e068a0",
              text: `Perfecto. ¡Nos estaremos comunicando a la brevedad!`,
              showConfirmButton: false,
              timer: 2000,
            })};
            form.reset();
    });
