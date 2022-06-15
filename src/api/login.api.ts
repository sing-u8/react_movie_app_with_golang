import { env } from 'env/env.dev';

export const url = env.protocol + env.subDomain + env.domain + env.port + env.version;

export async function signIn(payload: { [k: string]: FormDataEntryValue }) {
    console.log('signIn : ', url, `${url}/signin`, 'http');
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(payload),
    };
    return fetch(`${url}/signin`, requestOptions).then(res => {
        // if (res.status !== 200) {
        //     throw new Error(`signIn - Invalid response code : ${res.status}`);
        // }
        return res.json();
    });
}
