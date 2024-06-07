const form = document.querySelector('form')
const loading = document.querySelector('.loading');
const search = document.querySelector('#search')
const result = document.querySelector('.result');
const randomPokemon = document.querySelector('.btn-random');

//set the max number of pokemon
const maxNum = 650; //649

//Get random Pokemon by giving it a listener
randomPokemon.addEventListener('click', () => {
    remoeResult()
    loading.classList.remove('d-none')

    //set the URI
    let randomNum = Math.floor(Math.random() * maxNum)
    const URI = `https://pokeapi.co/api/v2/pokemon/${randomNum}`;
    getPokemon(URI, randomNum)
})


form.addEventListener('submit', (e) => {
    e.preventDefault();
    remoeResult()
    loading.classList.remove('d-none')
    loadPokeMon();
})

// Clear the results by clicking on the result card
const remoeResult = () => {
    result.className = 'result';
    result.innerHTML = '';
}
result.addEventListener('click', remoeResult)

//Get Pokemon by giving by entering a name or number
const getPokemon = async (URI, text) => {
    try{
        const response = await fetch(URI);

        if(!response.ok || !text || text <= 0 || text >= maxNum){
            throw 'Please only numbers between 1 and 649 or type the name correctly'
        }

        const data = await response.json();
        console.log(data);

        //use destructor to the sprites of the pokemon
        const {id, name, sprites: {other: {dream_world: {front_default}}}} = data;

        //set timer for loading results
        setTimeout(() => {
            //add loader image
            loading.classList.add('d-none');

            result.className = 'result active'

            result.innerHTML = `
                <div class="pokebox found">
                    <span class="closebox">x</span>
                    <img src="${front_default}" alt="${name}" class="pokemon">
                    <h3 class="pokename">${name}</h3>
                    <p class="pokenumber">#${id.toString().padStart(3, '0')}</p>
                </div>`;
            search.value = null;
        }, 1600);

    }
    catch(error){
        console.log(error);

        //set timer for loading error results
        setTimeout(() => {
            //add loader image
            loading.classList.add('d-none');

            result.className = 'result active'

            let pokenumber = search.value ? (isNaN(search.value) ? search.value : `#${search.value}`) : '';

            result.innerHTML = `
                <div class="pokebox notfound">
                    <span class="closebox">x</span>
                    <h1><span>4</span><img src="./img/pokeball.png" alt="pokeball"/><span>4</span></h1>
                    <p>Pokemon <span class="pokenumber">${pokenumber}</span> not found</p>
                </div>`;
            search.value = null;
        }, 1600);
    }
}

function loadPokeMon(){
    let text = search.value.trim();
    if(isNaN(text)) text = text.toLowerCase();

    const URI = `https://pokeapi.co/api/v2/pokemon/${text}`;

    getPokemon(URI, text)
}