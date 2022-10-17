export function valida(input) {
    const tipoDeInput = input.dataset.tipo

    if (validadores[tipoDeInput]) {
        validadores[tipoDeInput](input)
    }

    if (!input.validity.valid) {
        input.classList.add('border-solid', 'border-2', 'border-red-500');
        input.nextElementSibling.classList.remove('hidden');
        input.nextElementSibling.innerHTML = mostraMensagemDeErro(tipoDeInput, input);
    } else {
        input.classList.remove('border-solid', 'border-2', 'border-red-500');
        input.nextElementSibling.classList.add('hidden');
        input.nextElementSibling.innerHTML = '';
    }
}

const tiposDeErro = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'customError'
]

//OBJETOS DE ERRO
const mensagemDeErro = {
    nome: {
        valueMissing: 'O campo nome não pode estar vazio.',
        patternMismatch: 'O nome não pode conter mais que 40 caracteres.'
    },
    email: {
        valueMissing: 'O campo email não pode estar vazio.',
        typeMismatch: 'O email digitado não é válido.'
    },
    senha: {
        valueMissing: 'O campo senha não pode estar vazio.',
        patternMismatch: 'A senha deve ter de 6 a 14 digitos, pelo menos um número e pelo menos um letra maiúsculo.'
    },
    dataNascimento: {
        valueMissing:'O campo data de nascimento não pode estar vazio.',
        customError: 'Você deve ser maior que 18 anos para se cadastrar.'
    },
    cpf: {
        valueMissing:'O campo CPF não pode estar vazio.',
        customError: 'O CPF digitado não é válido.'
    },
    cep: {
        valueMissing:'O campo CEP não pode estar vazio.',
        patternMismatch: 'O CPF digitado não é válido.',
        customError: 'Não foi possível encontrar o CEP.'
    },
    logradouro: {
        valueMissing:'O campo logradouro não pode estar vazio.',
    },
    cidade: {
        valueMissing:'O campo cidade não pode estar vazio.'
    },
    estado: {
        valueMissing:'O campo estado não pode estar vazio.'
    },
    url: {
        valueMissing:'O campo url não pode estar vazio.'
    },
    categoria: {
        valueMissing:'O campo categoria não pode estar vazio.'
    },
    preco: {
        valueMissing:'O campo preco não pode estar vazio.'
    },
    mensagemEnviada: {
        valueMissing: 'O campo nome não pode estar vazio.',
        patternMismatch: 'O nome não pode conter mais que 40 caracteres.'
    }   
}

const validadores = {
    dataNascimento:input => validaDataNascimento(input),
    cpf:input => validaCPF(input),
    cep:input => recuperarCEP(input),
}

function mostraMensagemDeErro(tipoDeInput, input) {
    let mensagem = ''
    tiposDeErro.forEach(erro => {
        if(input.validity[erro]) {
            mensagem = mensagemDeErro[tipoDeInput][erro]
        }
    })
    return mensagem
}

// VALIDA DATA

function validaDataNascimento(input) {
    const dataRecebida = new Date(input.value)
    let mensagem = ''

    if (!maiorQue18(dataRecebida)) {
        mensagem = 'Você deve ser maior que 18 anos para se cadastrar.'
    }

    input.setCustomValidity(mensagem)
}

function maiorQue18(data) {
    const dataAtual = new Date()
    const dataMais18 = new Date(data.getUTCFullYear() + 18, data.getUTCMonth(), data.getUTCDate())

    return dataMais18 <= dataAtual
}

// VALIDA CPF

function validaCPF(input) {
    const cpfFormatado = input.value.replace(/\D/g, '')
    let mensagem = ''
    
    if (!checaCPFRepetido(cpfFormatado) || !chegaEstruturaCPF(cpfFormatado)) {
        mensagem = 'O CPF digitado não é válido.'
    }

    input.setCustomValidity(mensagem)
}

function checaCPFRepetido(cpf) {
    const valoresRepetidos = [
        '00000000000',
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999'
    ]
    let cpfValido = true

    valoresRepetidos.forEach(valor => {
        if(valor == cpf) {
            cpfValido = false
        }
    })

    return cpfValido
}


// VERIFICADOR DE DIGITO CPF - ESTUDAR MELHOR!

function chegaEstruturaCPF(cpf) {
    const multiplicador = 10

    return checaDigitoVerificador(cpf, multiplicador)
}

function checaDigitoVerificador(cpf, multiplicador){
    if (multiplicador >= 12) {
        return true
    }

    let multiplicadorInicial = multiplicador
    let soma = 0
    const cpfSemDigitos = cpf.substr(0, multiplicador - 1).split('')
    const digitoVerificador = cpf.charAt(multiplicador - 1)
    for(let contador = 0; multiplicadorInicial > 1 ; multiplicadorInicial--){
        soma = soma + cpfSemDigitos[contador] * multiplicadorInicial
        contador++
    }

    if (digitoVerificador == confirmaDigito(soma)) {
        return checaDigitoVerificador(cpf, multiplicador + 1)
    }

    return false

}

function confirmaDigito(soma) {
    return 11 - (soma % 11)
}

//CEP

function recuperarCEP(input) {
    const cep = input.value.replace(/\D/g, '')
    const url = `https://viacep.com.br/ws/${cep}/json`
    const options = {
        method: 'GET',
        mode: 'cors',
        headers: {
            'content-type': 'application/json;charset=utf-8'
        }
    }

    if (!input.validity.patternMismatch && !input.validity.valueMissing) {
        fetch(url,options).then(
            response => response.json()
        ).then(
            data => {
                if(data.erro) {
                    input.setCustomValidity('Não foi possível buscar o CEP')
                    return
                }
                input.setCustomValidity('')
                preencheCampoComCPF(data)
                return
            }
        )
    }
}

function preencheCampoComCPF(data) {
    const logradouro = document.querySelector('[data-tipo="logradouro"]')
    const cidade = document.querySelector('[data-tipo="cidade"]')
    const estado = document.querySelector('[data-tipo="estado"]')

    logradouro.value = data.logradouro
    cidade.value = data.localidade
    estado.value = data.uf
}

// VALIDA MENSAGEM

export function validaMensagemEnviada(textarea)
{
    const mensagemEnviada = textarea.dataset

    if (validadorMensagem[mensagemEnviada]) {
    }
    if (!textarea.validity.valid) {
        textarea.classList.add('border-solid', 'border-2', 'border-red-500');
        textarea.nextElementSibling.classList.remove('hidden');
        textarea.nextElementSibling.innerHTML = mostraErroTextarea(mensagemEnviada, textarea);
    } else {
        textarea.classList.remove('border-solid', 'border-2', 'border-red-500');
        textarea.nextElementSibling.classList.add('hidden');
        textarea.nextElementSibling.innerHTML = '';
    }
}

const tiposErroTextarea = [
    'valueMissing',
    'patternMismatch'
]

const mensagemErroTextarea = {
    mensagemEnviada: {
        valueMissing: 'O campo mensagem não pode estar vazio.',
        patternMismatch: 'O mensagem não pode conter mais que 120 caracteres.'
    }
}

const validadorMensagem = {
    mensagemEnviada: textarea => validaMensagemEnviada(textarea)
}

function mostraErroTextarea(mensagemEnviada, textarea) {
    let mensagem = ''
    tiposErroTextarea.forEach(erro => {
        if(textarea.validity[erro]) {
            mensagem = mensagemErroTextarea[mensagemEnviada][erro]
        }
    })
    return mensagem
}