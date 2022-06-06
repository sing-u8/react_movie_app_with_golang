import { env } from 'env/env.dev';

export const url = env.protocol + env.subDomain + env.domain + env.port + env.version;

export async function getAllMovies() {
    console.log('getAllMovies : ', url, `${url}/movies`, 'http');
    return fetch(`${url}/movies`).then(res => {
        if (res.status !== 200) {
            throw new Error(`getAllMovies - Invalid response code : ${res.status}`);
        }
        return res.json();
    });
}

export async function getAllMoviesByGenre(genreId: string) {
    console.log('getAllMovies : ', url, `${url}/movies`, 'http');
    return fetch(`${url}/movies/${genreId}`).then(res => {
        if (res.status !== 200) {
            throw new Error(`getAllMovies - Invalid response code : ${res.status}`);
        }
        return res.json();
    });
}

export async function getMovie(id: string) {
    return fetch(`${url}/movie/${id}`).then(res => {
        if (res.status !== 200) {
            throw new Error(`getMovie - Invalid response code : ${res.status}`);
        }
        return res.json();
    });
}
