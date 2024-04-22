const pokemonlistHTML = document.getElementById('pokemonList'); //<lo> do html que será add o convetPokemon 
const loadMoreButton = document.getElementById('loadMoreButton'); //botão para carregar mais pokemons
const maxRequest = 151;
const limit = 10;
let offset = 0;

function loadPokeItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) =>
            `<article class="card__article">
        <li class="pokemon ${pokemon.type}">
           <div class="top">
              <span class="name">${pokemon.name}</span>
              <span class="number">#0${pokemon.number}</span>
           </div>

           <div class="detail">
              <ol class="types">
              ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
              </ol>

              <img id="img"
                 src="${pokemon.photo}"
                 alt="${pokemon.name}">

           </div>
        </li>

        <div class="card__data">

           <section class="details__data">
              <h2 class="card__title ${pokemon.types[0]}">${pokemon.name}</h2>

              <span class="card__description">Abilities:
              <span>${pokemon.ablities}</span>
              </span>
              <span class="card__description">Base Experience:
              <span>${pokemon.b_e}</span>
              </span>
              <span class="card__description">Height:
              <span>${pokemon.height} m</span>
              </span>
              <span class="card__description">Weight:
                 <span>${pokemon.weight} kg</span>
              </span>
              
              <a href="https://pokeapi.co/api/v2/pokemon/${pokemon.number}/" target="to_blank" class="card__button">More Details</a>
           </section>

           <section class="img__data">
           </section>
           <img id="img"
              src="${pokemon.photo}"
              alt="${pokemon.name}">
           </section>

        </div>
     </article>`
        ).join('');
        pokemonlistHTML.innerHTML += newHtml;
    }) //codigo  para adicionar os dados na lista de pokemons em formato html
}

loadPokeItens(offset, limit);//chama a função com os parametros iniciais e chama ela novamente quando

loadMoreButton.addEventListener('click', () => {
    offset += limit;
    const qtdPoke = offset + limit;

    if (qtdPoke >= maxRequest) {
        const newLimit = maxRequest - offset;
        debugger

        loadPokeItens(offset, newLimit);

        loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
        loadPokeItens(offset, limit);
    }
})
