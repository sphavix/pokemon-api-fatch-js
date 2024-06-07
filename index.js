//fetch = Function used for making HTTP requests to fetch resources.
//        (JSON format data, images, files)
//        Simplifies asynchronous data fetching in JavaScript
//        used for interacting with APIs to retrieve and send data 
//        asynchronously over the web
//        fetch(url, {options})

fetchData();

async function fetchData(){
    try{

        const pokemonName = document.getElementById("pokemonName").value.toLowerCase();
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

        if(!response.ok){
            throw new Error("Request failed");
        }

        const data = await response.json();
        const pokemonSprite = data.sprites.front_default;
        const imageElement = document.getElementById("pokemonSprite");

        imageElement.src = pokemonSprite;
        imageElement.style.display = "block";
    }
    catch(error){
        console.log(error);
    }
}