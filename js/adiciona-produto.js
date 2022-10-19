const formProduto = document.getElementById('add-produto')

formProduto.addEventListener('submit', (evento) => {
    evento.preventDefault()

    criaElemento(evento.target.elements['link-img'].value,
    evento.target.elements['categoria'].value,
    evento.target.elements['nome'].value,
    evento.target.elements['preco'].value,
    evento.target.elements['descricao'].value,)
})

function criaElemento(img, categoria, nome, preco, descricao) {
    console.log(img)
    console.log(categoria)
    console.log(nome)
    console.log(preco)
    console.log(descricao)
}