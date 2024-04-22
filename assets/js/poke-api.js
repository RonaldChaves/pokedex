
const pokeApi = {};

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon();
    pokemon.number = pokeDetail.id;
    pokemon.name = pokeDetail.name;

    const  types = pokeDetail.types.map(type => type.type.name);
    const [type] = types;

    pokemon.types = types;
    pokemon.type = type;

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

    pokemon.weight = pokeDetail.weight/10;

    pokemon.height = pokeDetail.height/10;
    pokemon.b_e = pokeDetail.base_experience;
    pokemon.ablities = pokeDetail.abilities.length;

    return pokemon
}

pokeApi.getPokeDetails = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    return fetch(url)
        .then((response) => response.json())// retornar em json a response
        .then((jsonbody) => jsonbody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokeDetails))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonDetail) => pokemonDetail)
        // retorna o 'return' do json acima com results
        .catch((error) => console.error(error))
};