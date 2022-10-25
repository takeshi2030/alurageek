
const todosProdutos = document.getElementById('lista-produtos')



// TRABALHANDO 'API'
const apiProdutos = 'js/db.json'

const listaProdutos = () => {
    return fetch(apiProdutos)
    .then(dados => dados.json())
}

fetch(apiProdutos)
.then(dados => dados.json())
.then(resposta => {
    const todasCategorias = resposta

    // Imprimir todos os produtos
    todasCategorias.forEach(produto => todosProdutos.innerHTML +=
        (`<li class="mb-10 mx-2 lg:mx-1.5 relative">
            <div class="absolute top-2 right-3">
                <i class="fa-solid fa-trash text-white mr-3"></i>
                <i class="fa-solid fa-pen text-white"></i>
            </div>
            <img class="w-full" src="${produto.image}" alt="foto-produto">
            <div class="flex flex-col justify-items-start mt-2">
            <span class="text-base">${produto.nome}</span>
            <span class="text-base font-bold">${produto.preco}</span>
            <span class="text-base">#${produto.id}</span>
            </div>
        </li>`))

})

// CRIAR CONST PARA PEGAR OS DOIS ULTIMO PRODUTOS
// CRIAR FUNCTION PARA VERIFICAR SE TEM 6 PRODUTOS NA LINHA
// SE SIM => OS DOIS ULTIMOS RECEBEM Class="hidden lg:block"
