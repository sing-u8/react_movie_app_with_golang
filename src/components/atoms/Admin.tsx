import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import * as movieApi from 'api/movie.api';

import { Movie } from 'schema/movie.interface';

export default function Admin() {
    const [movies, setMovies] = useState<Array<Movie>>([]);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [error, setError] = useState<Error>();

    useEffect(() => {
        (async function getAllMovies() {
            try {
                const json = await movieApi.getAllMovies();
                setMovies(json.movies);
                setIsLoaded(true);
                console.log('movies, isloaded : ', movies, isLoaded);
            } catch (err) {
                console.log('catch err : ', err);
                setIsLoaded(true);
                setError(err as Error);
            }
        })();
    }, []);

    return (
        <Fragment>
            {error ? (
                <div> Error: {error.message}</div>
            ) : !isLoaded ? (
                <p>Loading...</p>
            ) : (
                <Fragment>
                    <h2>Manage Catalogue</h2>
                    <div className="list-group">
                        {movies.map(m => (
                            <Link key={m.id} to={`/admin/movie/${m.id}`} className="list-group-item list-group-item-action">
                                {m.title}
                            </Link>
                        ))}
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
}
