const form   = document.getElementById('form');
const campos = document.querySelectorAll('.required');
const spans  = document.querySelectorAll('.span-required');
const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
const emailValido = '123@123.com';
const senha = '123';

form.addEventListener('submit', (event) => {
    event.preventDefault();
    emailValidate();
    senhaVazia();
    removeError(0);
    removeError(1);
})

function setError(index){
    campos[index].classList.add('border-solid', 'border-2', 'border-red-500');
    spans[index].classList.remove('hidden');
}

function removeError(index){
    campos[index].classList.remove('border-solid', 'border-2', 'border-red-500');
    spans[index].classList.add('hidden');
}

function setErrorSubmit(index){
    spans[index].classList.remove('hidden');
}

function emailValidate(){
    if (!emailRegex.test(campos[0].value)){
        setError(0);
    } else {
        removeError(0);
    }
}

function senhaVazia(){
    if (!campos[1].value == ""){
        removeError(1);
    } else {
        setError(1);
    }
}

function acessoValidate(){
    if (campos[0].value == emailValido && campos[1].value == senha){
        window.location.href = '/produtos.html'
    } else {
        setErrorSubmit(2);
        campos[0].focus();
    }
}