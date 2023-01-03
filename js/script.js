const pokemonName = document.querySelector('.PokemonName');
const pokemonNumber = document.querySelector('.PokemonNumber');
const pokemonImage = document.querySelector('.PokemonImage');

const form = document.querySelector('.Form');
const input = document.querySelector('.InputSearch');
const buttonPrev = document.querySelector('.BtnPreview');
const buttonNext = document.querySelector('.BtnNext');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const APIresponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`
    );

    if (APIresponse.status == 200) { 
        const data = await APIresponse.json();
        return(data);
    }
}


const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Carregando...';
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if (data) {
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];

        searchPokemon = data.id;

        input.value = '';
    } else {
        pokemonName.innerHTML = 'Não encontrado :(';
        pokemonNumber.innerHTML = '';
        pokemonImage.style.display = 'none';

        input.value = '';
    }
}

renderPokemon(searchPokemon);

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});


// botões anterior e próximo
buttonPrev.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon = searchPokemon - 1;
    renderPokemon(searchPokemon);
  }
});

buttonNext.addEventListener('click', () => {
    searchPokemon = searchPokemon + 1;
    renderPokemon(searchPokemon);
});
