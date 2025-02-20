'use strict';

async function pesquisarJogos(categoria) {
    const url = `https://www.freetogame.com/api/games?category=${categoria}`
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}` // Usando o proxy CORS
    const response = await fetch(proxyUrl)
    const dados = await response.json()
    return dados
}

async function criarCardJogo(jogo) {
    const galeria = document.getElementById('galeria')
    const card = document.createElement('div')
    card.className = 'jogo'

    const imagem = document.createElement('img')
    imagem.src = jogo.thumbnail
    imagem.alt = jogo.title

    const titulo = document.createElement('h2')
    titulo.textContent = jogo.title

   
    card.appendChild(imagem)
    card.appendChild(titulo)
   

    galeria.appendChild(card)
}

async function preencherJogos() {
    const categoria = document.getElementById('categoria').value
    const jogos = await pesquisarJogos(categoria)
    const galeria = document.getElementById('galeria')

    galeria.replaceChildren()
    jogos.forEach(criarCardJogo)
}

document.getElementById('pesquisar').addEventListener('click', preencherJogos);