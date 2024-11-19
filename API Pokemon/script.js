const setCreateCard = function(dadosPokemons) {
    const divCardPokemons = document.getElementById('pokemonCards');
    divCardPokemons.innerHTML = ''; // Limpa os cards existentes

    dadosPokemons.forEach(function(item) {
        const { name, height, weight, sprites } = item;

        const divCard = document.createElement('div');
        const h2CardTitle = document.createElement('h2');
        const figureCardImage = document.createElement('figure');
        const img = document.createElement('img');
        const divCardText = document.createElement('div');

        divCard.classList.add('card');
        h2CardTitle.classList.add('card-title');
        figureCardImage.classList.add('card-image');
        img.src = sprites.front_default;
        img.alt = name;
        img.title = name;
        divCardText.classList.add('card-text');

        divCard.appendChild(h2CardTitle);
        h2CardTitle.appendChild(document.createTextNode(name));
        divCard.appendChild(figureCardImage);
        figureCardImage.appendChild(img);
        divCard.appendChild(divCardText);

        const alturaCm = height * 10;
        const alturaTexto = alturaCm >= 100 ? `${(alturaCm / 100).toFixed(2)} m` : `${alturaCm} cm`;

        const pesoKg = (weight / 10).toFixed(2);

        divCardText.appendChild(document.createElement('p')).appendChild(document.createTextNode(`Altura: ${alturaTexto}`));
        divCardText.appendChild(document.createElement('p')).appendChild(document.createTextNode(`Peso: ${pesoKg} kg`));

        divCardPokemons.appendChild(divCard);
    });
}

const getDadosPokemonsAPI = async function() {
    const url = 'https://pokeapi.co/api/v2/pokemon?limit=150';

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Erro na resposta da rede');
        }
        const dados = await response.json();
        const pokemonPromises = dados.results.map(pokemon => fetch(pokemon.url).then(res => res.json()));
        const pokemons = await Promise.all(pokemonPromises);
        setCreateCard(pokemons);
    } catch (error) {
        console.error('Houve um problema com a requisição:', error);
    }
}

const filterPokemons = () => {
    const filter = document.getElementById('pokemonInput').value.toLowerCase();
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const name = card.querySelector('h2').innerText.toLowerCase();
        if (name.includes(filter)) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
}

window.addEventListener('load', function() {
    getDadosPokemonsAPI();
});

document.getElementById('searchButton').addEventListener('click', filterPokemons);
