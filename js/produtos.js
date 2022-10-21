const sectionStarWars = document.getElementById('star_wars-section')
const sectionConsoles = document.getElementById('consoles-section')
const sectionDiversos = document.getElementById('diversos-section')

const apiProdutos = 'js/db.json'

fetch(apiProdutos)
    .then(dados => dados.json())
    .then(resposta => listaStarWars(resposta))

function listaStarWars(starwars){
    const produtosStarWars = starwars.map(
        (sw) => `<li class="mb-4 mx-2 lg:mx-1.5">
        <img class="w-full" src="${sw.image}" alt="foto-produto">
        <div class="flex flex-col justify-items-start mt-2">
        <span class="text-base">${sw.nome}</span>
        <span class="text-base font-bold">${sw.preco}</span>
        <a href=""><button class="text-sm font-bold text-left text-blue-500">Ver produto</button></a>
        </div>
    </li>`
    );

    document.getElementById("star-wars").innerHTML = produtosStarWars;

    
}

/*  fetch(apiProdutos)
.then(dados => dados.json())
.then(resposta => {
    resposta.forEach(produto => listaProdutos.innerHTML += (`<li class="mb-4 mx-2 lg:mx-1.5">
                                                                <img class="w-full" src="${produto.image}" alt="foto-produto">
                                                                <div class="flex flex-col justify-items-start mt-2">
                                                                <span class="text-base">${produto.nome}</span>
                                                                <span class="text-base font-bold">${produto.preco}</span>
                                                                <a href=""><button class="text-sm font-bold text-left text-blue-500">Ver produto</button></a>
                                                                </div>
                                                            </li>`))
}) */