import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import * as movieApi from 'api/movie.api';

import { Movie } from 'schema/movie.interface';

export default function Movies() {
    const [movies, setMovies] = useState<Array<Movie>>([]);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    useEffect(() => {
        (async function getAllMovies() {
            const json = await movieApi.getAllMovies();
            setMovies(json.movies);
            setIsLoaded(true);
            console.log('movies, isloaded : ', movies, isLoaded);
        })();
    }, []);

    return (
        <Fragment>
            {!isLoaded ? (
                <p>Loading...</p>
            ) : (
                <Fragment>
                    <h2>Movies</h2>
                    <ul>
                        {movies.map(m => (
                            <li key={m.id}>
                                <Link to={`/movies/${m.id}`}>{m.title}</Link>
                            </li>
                        ))}
                    </ul>
                </Fragment>
            )}
        </Fragment>
    );
}
