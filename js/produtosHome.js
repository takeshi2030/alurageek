// Buscar a uls no html
/* const sectionStarWars = document.getElementById('lista-star-wars')
const sectionConsoles = document.getElementById('lista-consoles')
const sectionDiversos = document.getElementById('lista-diversos') */
const listasections = document.getElementById('lista-sections')

const listSection = [
    'star-wars',
    'consoles',
    'diversos' 
]

listSection.forEach((section, idx, arr) => {
    listasections.innerHTML += `
    <li>
        <section id="section-${section}" class="mb-4">
            <div class="flex items-center justify-between px-4 md:px-12 lg:px-40 mb-4">
                <h3 class="text-xl lg:text-4xl font-bold text-gray-600">${section}</h3>
                <button class="flex items-center text-blue-500 hover:text-blue-700"><p class="text-sm md:text-lg font-bold mr-2 md:mr-4">Ver tudo</p><i class="fa-solid fa-arrow-right"></i></button>
            </div>
            <!------GRID PRODUTOS------->
            <ul id="lista-${section}" class="px-2 md:px-10 lg:px-40 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 mb-2">
                <!-- PRODUTOS -->
            </ul>
        </section>
    </li>`
    })

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
    produtosStarWars.forEach((produto, idx, arr) => {
        let param = ''
        if (idx >= arr.length -2) {
            param = 'hidden lg:block'
        }
        sectionStarWars.innerHTML += 
        (`<li class="mb-4 mx-2 lg:mx-1.5 ${param}">
            <img class="w-full" src="${produto.image}" alt="foto-produto">
            <div class="flex flex-col justify-items-start mt-2">
            <span class="text-base">${produto.nome}</span>
            <span class="text-base font-bold">${produto.preco}</span>
            <a href="detalhe_produto/${produto.id}"><button class="text-sm font-bold text-left text-blue-500">Ver produto</button></a>
            </div>
        </li>`)
    })

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
