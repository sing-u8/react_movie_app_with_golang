import { env } from 'env/env.dev';

export const url = env.protocol + env.subDomain + env.domain + env.port + env.version;

export async function getAllGenres() {
    console.log('getAllMovies : ', url, `${url}/movies`, 'http');
    return fetch(`${url}/genres`).then(res => {
        if (res.status !== 200) {
            throw new Error(`getAllMovies - Invalid response code : ${res.status}`);
        }
        return res.json();
    });
}

export async function getGenre(id: string) {
    return fetch(`${url}/genre/${id}`).then(res => {
        if (res.status !== 200) {
            throw new Error(`getMovie - Invalid response code : ${res.status}`);
        }
        return res.json();
    });
}
