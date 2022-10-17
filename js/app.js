import { valida, checkLength } from './validacao.js';

const inputs = document.querySelectorAll('input')
const textareas = document.querySelectorAll('textarea')

inputs.forEach(input => {
    if(input.dataset.tipo === 'preco') {
        SimpleMaskMoney.setMask(input, {
            prefix: 'R$ ',
            fixed: true,
            fractionDigits: 2,
            decimalSeparator: ',',
            thousandsSeparator: '.',
            cursor: 'end'
        })
    }

    input.addEventListener('blur', (evento) => {
        valida(evento.target)
    })
})

textareas.forEach(textarea => {
    textarea.addEventListener('blur', (evento) => {
        checkLength(evento.target)
    })
})