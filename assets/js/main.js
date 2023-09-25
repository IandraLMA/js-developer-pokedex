const pokemonList = document.getElementById('pokemonList')
const pokeItensList = document.getElementById('pokeItensList')

var btnPokeItens = document.querySelector('#btnPokeItens');
var btnPokemons = document.querySelector('#btnPokemons');
var pokemonListOl = document.querySelector('#pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 20
let offset = 0;
loadPokemonsItens(offset, limit)
loadPokemons(offset, limit)

btnPokeItens.addEventListener('click', function () {
    pokemonListOl.style.display = 'none';
    pokeItensList.style.display = 'grid';
})
btnPokemons.addEventListener('click', function () {
    pokemonListOl.style.display = 'grid';
    pokeItensList.style.display = 'none';
})

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemons(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemons(offset, limit)
    }

})
loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonsItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonsItens(offset, limit)
    }
})

function convertItensToLi(pokeItens) {
    return `
        <li class="pokemon default">
            <span class="number">#${pokeItens.id}</span>
            <span class="name">${pokeItens.name}</span>

            <div class="detail">
               
            <ol class="types">
            ${pokeItens.shortEffect}
            </ol>

                <img src="${pokeItens.photo}"
                     alt="${pokeItens.name}">
            </div>
        </li>
    `
}

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function loadPokemons(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

function loadPokemonsItens(offset, limit) {
    pokeApi.getPokemonsItens(offset, limit).then((itens = []) => {
        const newHtml = itens.map(convertItensToLi).join('')
        pokeItensList.innerHTML += newHtml
    })

}

