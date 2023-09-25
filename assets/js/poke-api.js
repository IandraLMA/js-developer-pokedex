
const pokeApi = {}
function convertPokeApiDetailToPokemonItens(pokeDetailItens) {
    const pokeItens = new PokeItens()
    pokeItens.id = pokeDetailItens.id
    pokeItens.name = pokeDetailItens.name
    pokeItens.photo = pokeDetailItens.sprites.default
    pokeItens.shortEffect = pokeDetailItens.effect_entries[0].short_effect
    return pokeItens
}

pokeApi.getPokemonDetailItens = (pokemonItens) => {
    return fetch(pokemonItens.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemonItens)
}

pokeApi.getPokemonsItens = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/item?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemonItens) => pokemonItens.map(pokeApi.getPokemonDetailItens))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetailsItens) => pokemonsDetailsItens)
}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}
