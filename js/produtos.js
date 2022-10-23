// Buscar a uls no html
const sectionStarWars = document.getElementById('lista-star-wars')
const sectionConsoles = document.getElementById('lista-consoles')
const sectionDiversos = document.getElementById('lista-diversos')
const todosProdutos = document.getElementById('lista-produtos')

const apiProdutos = 'js/db.json'

fetch(apiProdutos)
.then(dados => dados.json())
.then(resposta => {
    const listaProdutos = resposta

    // Filtrar no JSON por SECTION
    const produtosStarWars = listaProdutos.filter(catalogo => catalogo.section==="star_wars-section")
    const produtosConsole = listaProdutos.filter(catalogo => catalogo.section==="consoles-section")
    const produtosDiversos = listaProdutos.filter(catalogo => catalogo.section==="diversos-section")
    
    // Imprimir as informações no html
    produtosStarWars.forEach(produto => sectionStarWars.innerHTML += 
        (`<li class="mb-4 mx-2 lg:mx-1.5">
            <img class="w-full" src="${produto.image}" alt="foto-produto">
            <div class="flex flex-col justify-items-start mt-2">
            <span class="text-base">${produto.nome}</span>
            <span class="text-base font-bold">${produto.preco}</span>
            <a href=""><button class="text-sm font-bold text-left text-blue-500">Ver produto</button></a>
            </div>
        </li>`))

    produtosConsole.forEach(produto => sectionConsoles.innerHTML += 
        (`<li class="mb-4 mx-2 lg:mx-1.5">
            <img class="w-full" src="${produto.image}" alt="foto-produto">
            <div class="flex flex-col justify-items-start mt-2">
            <span class="text-base">${produto.nome}</span>
            <span class="text-base font-bold">${produto.preco}</span>
            <a href=""><button class="text-sm font-bold text-left text-blue-500">Ver produto</button></a>
            </div>
        </li>`))

    produtosDiversos.forEach(produto => sectionDiversos.innerHTML += 
        (`<li class="mb-4 mx-2 lg:mx-1.5">
            <img class="w-full" src="${produto.image}" alt="foto-produto">
            <div class="flex flex-col justify-items-start mt-2">
            <span class="text-base">${produto.nome}</span>
            <span class="text-base font-bold">${produto.preco}</span>
            <a href=""><button class="text-sm font-bold text-left text-blue-500">Ver produto</button></a>
            </div>
        </li>`))
})

fetch(apiProdutos)
.then(dados => dados.json())
.then(resposta => {
    const listaProdutos = resposta

    // Imprimir todos os produtos
    listaProdutos.forEach(produto => todosProdutos.innerHTML +=
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

// FUNCTION PARA VERIFICAR SE TEM 6 PRODUTOS NA LINHA
// SE SIM => OS DOIS ULTIMOS RECEBEM class="hidden"

// FUNCTION SEARCH