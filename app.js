const movieName = document.querySelector('#nombre-pelicula');
const submit = document.querySelector('#btn-buscar');
const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado')

//listener
submit.addEventListener('click', searchMovie);


//consultar la api con el value ingresado
function searchMovie(){
    if(movieName.value === ''){
        mostrarAlerta('Ingresa una pelicula para buscar');
        return;
    }

    callApi();
}

function callApi() {
    const apiKey = '2b9d0879';

    spinner();

    const url = `https://www.omdbapi.com/?apikey=${apiKey}&t=${movieName.value}`;
    fetch(url)
        .then(resultado => {
            return resultado.json();
        })
        .then(datos => {
            console.log(datos);
            if(datos.Response === 'False'){
                showError(datos.Error);
                movieName.value = '';
                return;
            }
            showMovieResponse(datos);
        })
}

function showMovieResponse(apiResponse){
    const {Poster, Title, Type, Year, Actors, Plot, Genre, Country, imdbRating} = apiResponse;

    resultado.innerHTML = `
        <div class="informacion">
            <img class="informacion__imagen" src=${Poster} alt="movie-poster">
            <div class="informacion__texto">
                <p class="informacion__tipo">${Type}</p>
                <div class="informacion__puntaje">
                    <img src="img/star_77949.svg" alt="star">
                    <span>${imdbRating}</span>
                </div>
                <span class="informacion__categoria">${Genre}</span>
                <p class="informacion__año">Año: <span class="fw-normal">${Year}</span></p>
                <p class="informacion__pais">Origen: <span class="fw-normal">${Country}</span></p>
            </div>
        </div>

        <h2 class="pelicula-heading">${Title}</h2>
        <p class="pelicula-resumen">${Plot}</p>
        <p class="pelicula-actores">Actores: <span class="fw-normal">${Actors}</span></p>

        <footer class="footer">
        <p>Make by puly <span>Frontend dev.&copy;</span></p>
        <a href="https://www.linkedin.com/in/jose-ignacio-robledo-puly-008661239/" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" class="iconoRed icon icon-tabler icon-tabler-brand-linkedin" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <rect x="4" y="4" width="16" height="16" rx="2" />
            <line x1="8" y1="11" x2="8" y2="16" />
            <line x1="8" y1="8" x2="8" y2="8.01" />
            <line x1="12" y1="16" x2="12" y2="11" />
            <path d="M16 16v-3a2 2 0 0 0 -4 0" />
          </svg></a>

        <a href="https://first-portfolio-puly.netlify.app" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" class="iconoRed icon icon-tabler icon-tabler-briefcase" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <rect x="3" y="7" width="18" height="13" rx="2" />
            <path d="M8 7v-2a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2" />
            <line x1="12" y1="12" x2="12" y2="12.01" />
            <path d="M3 13a20 20 0 0 0 18 0" />
          </svg></a>
        </footer>
    `;
}

function spinner(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }

    const spinnerDiv = document.createElement('DIV');
    spinnerDiv.classList.add('sk-cube-grid');

    spinnerDiv.innerHTML = `
        <div class="sk-cube sk-cube1"></div>
        <div class="sk-cube sk-cube2"></div>
        <div class="sk-cube sk-cube3"></div>
        <div class="sk-cube sk-cube4"></div>
        <div class="sk-cube sk-cube5"></div>
        <div class="sk-cube sk-cube6"></div>
        <div class="sk-cube sk-cube7"></div>
        <div class="sk-cube sk-cube8"></div>
        <div class="sk-cube sk-cube9"></div>
    `;

    resultado.appendChild(spinnerDiv);
}

function showError(mensaje){
    resultado.innerHTML = `
        <div class="alerta">
            <p>Error: ${mensaje}</p>
        </div>
    `;

    setTimeout(() => {
        resultado.innerHTML = '';
    }, 3000);
}

function mostrarAlerta(mensaje){
    const existe = document.querySelector('.alerta');
    if(existe){
        existe.remove();
    }

    const alerta = document.createElement('div');
    alerta.classList.add('alerta');
    alerta.innerHTML = `
        <p>${mensaje}</p>
    `;

    container.appendChild(alerta);

    setTimeout(() => {
        alerta.remove();
    }, 3000);
}
