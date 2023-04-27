let IdSearch = 1;

const colors = {
    fire: "#ff7402",
    grass: "#33a165",
    steel: "#00858a",
    water: "#0050ac",
    psychic: "#c90086",
    ground: "#c90086",
    ice: "#70deff",
    flying: "#5d4e75",
    ghost: "#4d5b64",
    normal: "#753845",
    poison: "#7e0058",
    rock: "#6e1a00",
    fighting: "#634136",
    dark: "#272625",
    bug: "#6e1a00",
    dragon: "#00c431",
    electric: "#bba909",
    fairy: "#d31c81",
    unknow: "#757575",
    shadow: "#29292c",
}


// -- Bonne chance !

//  Votre code
/************************************************
**********cree barre pour chercher un pokemon****
*************************************************/
//recuperation de l'element input
const searchInput = document.querySelector("#searchInput");
//recuperation de l'element div
const searchResults = document.querySelector("#searchResults");

searchInput.addEventListener("focus", () => {
    searchInput.value = '';
});



/************************************************
**********recuperation code bouton **************
*************************************************/
// recuperation des elements bouton aleatoire 
const boutonAleatoire = document.querySelector("#shuffle");

// recuperation des elements bouton suivant et precedent
const boutonGauche = document.querySelector("#goprev");
const boutonDroite = document.querySelector("#gonext");

/************************************************
*******Recuperation information sur pokemon******
*************************************************/

//recuperation de l'element  imagetype du pokemon
const imageTypePokemon = document.querySelector("#pokeTypeImg");
//recuperation de l'element pokemtype
const typePokemon = document.querySelector("#pokeType");
//reuperation de l'element  nom du pokemon
const nomPokemon = document.querySelector("#pokeName");
//recuperation de l'element  height du pokemon
const heightPokemon = document.querySelector("#pokeHeight");
//recuperation de l'element  weight du pokemon
const weightPokemon = document.querySelector("#pokeWeight");
//recuperation de l'element  abilities du pokemon
const abilitiesPokemon = document.querySelector("#pokeAbilities");
//recuperation de l'element  numero du pokemon
const numeroPokemon = document.querySelector("#bgId");
//recuperation de l'element  image du pokemon
const imagePokemon = document.querySelector("#pokeImg");

/**************************************************
*****Recuperation information  stats de pokemon****
***************************************************/

//recuperation de l'element  hp du pokemon
const hpPokemon = document.querySelector("#hp");


/****************************************
*********Affiche les information*********
*****************************************/
// code pour afficher nom pokemon
function afficheNomPokemon(data) {
    nomPokemon.innerHTML = data.name;
}

//code pour afficher le type du pokemon
function afficheTypePokemon(data) {
    typePokemon.innerHTML = data.types[0].type.name;
}
//code pour afficher image du imagetype du pokemon
function afficheImageTypePokemon(data) {
    imageTypePokemon.src = "assets/type/" + data.types[0].type.name + ".svg";
}

//code pour afficher image du pokemon  recuperer dans dossier assets pokemon
function afficheImagePokemon(data) {
    imagePokemon.src = "assets/pokemon/" + data.id + ".png";
}

//code pour afficher numero du pokemon
function afficheNumeroPokemon(data) {
    numeroPokemon.innerHTML = formateNumber(data.id);
}

//code pour afficher height du pokemon
function afficheHeightPokemon(data) {
    heightPokemon.innerHTML = getCorrectValue(data.height) + "M";
}
//code pour afficher weight du pokemon
function afficheWeightPokemon(data) {
    weightPokemon.innerHTML = getCorrectValue(data.weight) + "Kg";
}
//code pour afficher abilities du pokemon
function afficheAbilitiesPokemon(data) {
    abilitiesPokemon.innerHTML = data.abilities[0].ability.name;
}

/****************************************
**fonction clique des bouton aleatoire **
*****************************************/

//bouton aleatoire
boutonAleatoire.addEventListener("click", function () {
    IdSearch = Math.floor(Math.random() * (898 - 1) + 1);
    fetchPokemon(IdSearch);
    fadeOutPokemon();
});



/****************************************
**fonction clique des bouton de gauche et droit  **
*****************************************/

boutonGauche.addEventListener("click", function () {
    if (IdSearch > 1) {
        IdSearch--
        fadeOutPokemon();
        fetchPokemon(IdSearch, true);
    }

});

//bouton droit
boutonDroite.addEventListener("click", function () {
    IdSearch++;
    fetchPokemon(IdSearch);
    fadeOutPokemon();
});




/****************************************
**faire une animation pour les bouton  **
*****************************************/


function fadeInPokemon() {
    imagePokemon.style = "--animate-duration: 0.8s";
    imagePokemon.classList.remove("animate__bounceOutDown")
    imagePokemon.classList.add("animate__bounceInDown")
}
function fadeOutPokemon() {
    console.log(imagePokemon)
    imagePokemon.style = "--animate-duration: 0.8s";
    imagePokemon.classList.remove("animate__bounceInDown")
    imagePokemon.classList.add("animate__bounceOutDown")
}

/****************************************
**********Recupere l'api ****************
*****************************************/
// searchInput.addEventListener("input", () => {
//     const pokemonName = searchInput.value.toLowerCase();
//     fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
//         .then(response => response.json())
//         .then(data => {
//             const pokemon = {
//                 name: data.name,
//                 id: data.id,
//                 image: data.sprites.front_default,
//                 type: data.types[0].type.name,
//                 height: data.height,
//                 weight: data.weight,
//                 abilities: data.abilities[0].ability.name
//             };
//             const pokemonHtml = `
//                         <h2>${pokemon.name} (n°${pokemon.id})</h2>
//                         <img src="${pokemon.image}">
//                         <p>Type : ${pokemon.type}</p>
//                         <p>Hauteur : ${pokemon.height / 10} m</p>
//                         <p>Poids : ${pokemon.weight / 10} kg</p>
//                         <p>Capacités : ${pokemon.abilities}</p>
//                     `;
//             searchResults.innerHTML = pokemonHtml;
//         })
//         .catch(() => {
//             searchResults.innerHTML = "<p>Pokémon non trouvé</p>";
//         });
// });


//fonction pour recuperer les information du pokemon
function fetchPokemon(id, _isPrev = false) {
    fetch("https://pokeapi.co/api/v2/pokemon/" + id)
        .then(response => response.json())
        .then(data => {
            setTimeout(() => {
                replaceContent(data)

                fadeInPokemon();
            }, "500")
        });
}

function replaceContent(data) {
    afficheNomPokemon(data);
    afficheTypePokemon(data);
    afficheImagePokemon(data);
    afficheNumeroPokemon(data);
    afficheImageTypePokemon(data);
    afficheHeightPokemon(data);
    afficheWeightPokemon(data);
    afficheAbilitiesPokemon(data);
    //changeBackground(data);
    document.body.style.background = `linear-gradient(180deg, rgba(255, 255, 255, 0.63) 0%, rgba(0, 0, 0, 0.63) 100%), ${colors[data.types[0].type.name]}`;

    pokeStats.innerHTML = "";
    data.stats.slice(0, 3).forEach(el => {
        pokeStats.innerHTML += `  <div class="pb-4 row align-items-center">
        <span class="text-capitalize col-4 col-lg-3 m-0">${el.stat.name}</span>
        <div class="progress p-0 col-7 col-lg-8 bg-transparent" role="progressbar" aria-label="Basic example"
            aria-valuenow="${el.base_stat}" aria-valuemin="0" aria-valuemax="150">
            <div class="progress-bar animate__animated animate__slideInLeft bg-white" style="width: ${el.base_stat / 1.5}%;"></div>
        </div>
        <h5 class="col-1 text-end m-0">${el.base_stat}</h5>
    </div>`
    })
}


//  Formate le numéro du Pokémon
// 1 -> #001
function formateNumber(number) {
    let str = "" + number
    let pad = "000"
    let ans = "#" + pad.substring(0, pad.length - str.length) + str;
    return ans;
}

// Transforme la Height et la Weight sous bon format
function getCorrectValue(value) {
    if (value < 10) {
        return "0." + value;
    } else {
        let splitted = value.toString().split('');
        splitted.splice(splitted.length - 1, 0, ".");
        return splitted.join('');
    }
}
