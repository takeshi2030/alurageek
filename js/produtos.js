const apiProdutos = 'js/db.json'
const listaProdutos = document.querySelector('#produtos')

fetch(apiProdutos)
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
    })

    