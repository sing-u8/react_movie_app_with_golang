import { env } from 'env/env.dev';

export const url = env.protocol + env.subDomain + env.domain + env.port + env.version;

export async function getMoviesWithParam(payload: string, param: string) {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const requestOptions = {
        method: 'POST',
        body: payload,
        headers: myHeaders,
    };
    return fetch(`${url}/graphql`, requestOptions)
        .then(res => {
            return res.json();
        })
        .then(data => {
            const theList = Object.values(data.data[`${param}`]);
            return theList;
        });
}

export async function getMovieWithParam(payload: string, param: string) {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const requestOptions = {
        method: 'POST',
        body: payload,
        headers: myHeaders,
    };
    return fetch(`${url}/graphql`, requestOptions).then(res => {
        return res.json();
    });
}

export async function getMovieList(payload: string) {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const requestOptions = {
        method: 'POST',
        body: payload,
        headers: myHeaders,
    };
    return fetch(`${url}/graphql`, requestOptions)
        .then(res => {
            return res.json();
        })
        .then(data => {
            const theList = Object.values(data.data.list);
            return theList;
        });
}
