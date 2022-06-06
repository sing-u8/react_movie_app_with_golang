import { env } from 'env/env.dev';
import _ from 'lodash';

export const url = env.protocol + env.subDomain + env.domain + env.port + env.version;

export function getAllMovies() {
    console.log('getAllMovies : ', url, `${url}/movies`, 'http');
    return fetch(`${url}/movies`).then(res => {
        console.log('Status code is ', res.status, _.isNumber(res.status));
        if (res.status !== 200) {
            throw new Error(`Invalid response code : ${res.status}`);
        }
        return res.json();
    });
}
