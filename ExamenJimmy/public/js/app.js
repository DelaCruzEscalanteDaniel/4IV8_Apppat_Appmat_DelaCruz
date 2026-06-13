
const API = 'http://localhost:3001/api';

function cambiarSeccion(seccion) {

    document.querySelectorAll('.seccion').forEach(sec => {
        sec.style.display = 'none';
    });

    document.querySelectorAll('.tab').forEach(btn => {
        btn.classList.remove('active');
    });

    document.getElementById(`seccion-${seccion}`).style.display = 'block';

    event.target.classList.add('active');
}

window.cambiarSeccion = cambiarSeccion;

async function obtener(endpoint) {

    const respuesta = await fetch(`${API}/${endpoint}`);

    if (!respuesta.ok) {
        throw new Error(`Error ${respuesta.status}`);
    }

    return await respuesta.json();
}

async function enviar(endpoint, metodo, datos) {

    const respuesta = await fetch(`${API}/${endpoint}`, {
        method: metodo,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    });

    return await respuesta.json();
}

async function cargarDirectores() {

    const resp = await obtener('directores');

    const tbody = document.getElementById('tbody-directors');
    const select = document.getElementById('movie-director');

    tbody.innerHTML = '';

    select.innerHTML =
        '<option value="">Seleccionar director</option>';

    resp.data.forEach(director => {

        tbody.innerHTML += `
<tr>
    <td>${director.id}</td>
    <td>${director.nombre}</td>
    <td>${director.fecha_nacimiento ?
        director.fecha_nacimiento.split('T')[0] : ''}</td>

    <td>
        <button onclick="editarDirector(${director.id})">
            Editar
        </button>

        <button onclick="eliminarDirector(${director.id})">
            Eliminar
        </button>
    </td>
</tr>
`;

        select.innerHTML += `
            <option value="${director.id}">
                ${director.nombre}
            </option>
        `;
    });

    document.getElementById('contador-directors').textContent =
        resp.count;

    document.getElementById('tabla-directors').style.display =
        'table';

    document.getElementById('carga-directors').style.display =
        'none';
}

async function cargarGeneros() {

    const resp = await obtener('generos');

    const tbody = document.getElementById('tbody-genres');

    const selectReview =
        document.getElementById('review-genre');

    tbody.innerHTML = '';

    selectReview.innerHTML =
        '<option value="">Seleccionar género</option>';

    resp.data.forEach(genero => {

        tbody.innerHTML += `
            <tr>
                <td>${genero.id}</td>
                <td>${genero.nombre}</td>
                <td>${genero.descripcion || ''}</td>
                <td>-</td>
            </tr>
        `;

        selectReview.innerHTML += `
            <option value="${genero.id}">
                ${genero.nombre}
            </option>
        `;
    });

    document.getElementById('contador-genres').textContent =
        resp.count;

    document.getElementById('tabla-genres').style.display =
        'table';

    document.getElementById('carga-genres').style.display =
        'none';
}

async function cargarPeliculas() {

    const resp = await obtener('peliculas');

    const tbody = document.getElementById('tbody-movies');

    const selectReview =
        document.getElementById('review-movie');

    tbody.innerHTML = '';

    selectReview.innerHTML =
        '<option value="">Seleccionar película</option>';

    resp.data.forEach(pelicula => {

        tbody.innerHTML += `
            <tr>
                <td>${pelicula.id}</td>
                <td>${pelicula.titulo}</td>
                <td>${pelicula.director || ''}</td>
                <td>${pelicula.anio_lanzamiento || ''}</td>
                <td>${pelicula.duracion || ''}</td>
                <td>-</td>
            </tr>
        `;

        selectReview.innerHTML += `
            <option value="${pelicula.id}">
                ${pelicula.titulo}
            </option>
        `;
    });

    document.getElementById('contador-movies').textContent =
        resp.count;

    document.getElementById('tabla-movies').style.display =
        'table';

    document.getElementById('carga-movies').style.display =
        'none';
}

async function cargarResenas() {

    const resp = await obtener('resenas');

    const tbody = document.getElementById('tbody-reviews');

    tbody.innerHTML = '';

    resp.data.forEach(resena => {

        tbody.innerHTML += `
            <tr>
                <td>${resena.id}</td>
                <td>${resena.pelicula}</td>
                <td>${resena.genero}</td>
                <td>${resena.calificacion}</td>
                <td>${resena.comentario || ''}</td>
                <td>${new Date(
                    resena.fecha_resena
                ).toLocaleDateString()}</td>
                <td>-</td>
            </tr>
        `;
    });

    document.getElementById('contador-reviews').textContent =
        resp.count;

    document.getElementById('tabla-reviews').style.display =
        'table';

    document.getElementById('carga-reviews').style.display =
        'none';
}

document
    .getElementById('form-director')
    .addEventListener('submit', async e => {

        e.preventDefault();

        await enviar(
            'directores',
            'POST',
            {
                nombre:
                    document.getElementById(
                        'director-name'
                    ).value,

                fecha_nacimiento:
                    document.getElementById(
                        'director-birth'
                    ).value
            }
        );

        e.target.reset();

        cargarDirectores();
    });

document
    .getElementById('form-genre')
    .addEventListener('submit', async e => {

        e.preventDefault();

        await enviar(
            'generos',
            'POST',
            {
                nombre:
                    document.getElementById(
                        'genre-name'
                    ).value,

                descripcion:
                    document.getElementById(
                        'genre-description'
                    ).value
            }
        );

        e.target.reset();

        cargarGeneros();
    });

document
    .getElementById('form-movie')
    .addEventListener('submit', async e => {

        e.preventDefault();

        await enviar(
            'peliculas',
            'POST',
            {
                titulo:
                    document.getElementById(
                        'movie-title'
                    ).value,

                director_id:
                    document.getElementById(
                        'movie-director'
                    ).value,

                anio_lanzamiento:
                    document.getElementById(
                        'movie-year'
                    ).value,

                duracion:
                    document.getElementById(
                        'movie-duration'
                    ).value,

                sinopsis:
                    document.getElementById(
                        'movie-synopsis'
                    ).value
            }
        );

        e.target.reset();

        cargarPeliculas();
    });

document
    .getElementById('form-review')
    .addEventListener('submit', async e => {

        e.preventDefault();

        await enviar(
            'resenas',
            'POST',
            {
                pelicula_id:
                    document.getElementById(
                        'review-movie'
                    ).value,

                genero_id:
                    document.getElementById(
                        'review-genre'
                    ).value,

                calificacion:
                    document.getElementById(
                        'review-rating'
                    ).value,

                comentario:
                    document.getElementById(
                        'review-comment'
                    ).value
            }
        );

        e.target.reset();

        cargarResenas();
    });

document.addEventListener(
    'DOMContentLoaded',
    async () => {

        await cargarDirectores();
        await cargarGeneros();
        await cargarPeliculas();
        await cargarResenas();
    }
);