// Buscar a uls no html
const sectionStarWars = document.getElementById('lista-star-wars')
const sectionConsoles = document.getElementById('lista-consoles')
const sectionDiversos = document.getElementById('lista-diversos')

// TRABALHANDO 'API'
const apiProdutos = 'js/db.json'

const listaProdutos = () => {
    return fetch(apiProdutos)
    .then(dados => dados.json())
}

listaProdutos()
.then(resposta => {
    const todasCategorias = resposta

    // Filtrar no JSON por SECTION
    const produtosStarWars = todasCategorias.filter(categoria => categoria.section==="star_wars-section")
    const produtosConsole = todasCategorias.filter(categoria => categoria.section==="consoles-section")
    const produtosDiversos = todasCategorias.filter(categoria => categoria.section==="diversos-section")
    
    // Imprimir as informações no html
    produtosStarWars.forEach(produto => sectionStarWars.innerHTML += 
        (`<li class="mb-4 mx-2 lg:mx-1.5">
            <img class="w-full" src="${produto.image}" alt="foto-produto">
            <div class="flex flex-col justify-items-start mt-2">
            <span class="text-base">${produto.nome}</span>
            <span class="text-base font-bold">${produto.preco}</span>
            <a href="detalhe_produto/${produto.id}"><button class="text-sm font-bold text-left text-blue-500">Ver produto</button></a>
            </div>
        </li>`))

    produtosConsole.forEach(produto => sectionConsoles.innerHTML += 
        (`<li class="mb-4 mx-2 lg:mx-1.5">
            <img class="w-full" src="${produto.image}" alt="foto-produto">
            <div class="flex flex-col justify-items-start mt-2">
            <span class="text-base">${produto.nome}</span>
            <span class="text-base font-bold">${produto.preco}</span>
            <a href="detalhe_produto/${produto.id}"><button class="text-sm font-bold text-left text-blue-500">Ver produto</button></a>
            </div>
        </li>`))

    produtosDiversos.forEach(produto => sectionDiversos.innerHTML += 
        (`<li class="mb-4 mx-2 lg:mx-1.5">
            <img class="w-full" src="${produto.image}" alt="foto-produto">
            <div class="flex flex-col justify-items-start mt-2">
            <span class="text-base">${produto.nome}</span>
            <span class="text-base font-bold">${produto.preco}</span>
            <a href="detalhe_produto/${produto.id}"><button class="text-sm font-bold text-left text-blue-500">Ver produto</button></a>
            </div>
        </li>`))
})

// CRIAR CONST PARA PEGAR OS DOIS ULTIMO PRODUTOS
// CRIAR FUNCTION PARA VERIFICAR SE TEM 6 PRODUTOS NA LINHA
// SE SIM => OS DOIS ULTIMOS RECEBEM Class="hidden lg:block"
