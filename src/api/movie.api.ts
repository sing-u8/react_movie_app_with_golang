import { env } from 'env/env.dev';

export const url = env.protocol + env.subDomain + env.domain + env.port + env.version;

export function getAllMovies() {
    console.log('getAllMovies : ', url, `${url}/movies`, 'http');
    return fetch(`${url}/movies`).then(res => res.json());
}
