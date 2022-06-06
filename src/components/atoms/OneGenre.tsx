import React, { useState, useEffect, Fragment } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

import * as movieApi from 'api/movie.api';
import { Movie } from 'schema/movie.interface';

export default function OneGenre(props: any) {
    const { id } = useParams();
    const state = useLocation().state as { genreName: string };

    const [movies, setMovies] = useState<Array<Movie>>([]);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [error, setError] = useState<Error>();
    const [genreName, setGenreName] = useState<string>('');

    useEffect(() => {
        (async function getAllGenres() {
            try {
                const json = await movieApi.getAllMoviesByGenre(id as string);
                setMovies(json.movies ?? []);
                setIsLoaded(true);
                setGenreName(state.genreName);
                console.log('Genre, isloaded : ', movies, isLoaded, props, state);
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
                    <h2>Genre: {genreName}</h2>
                    <div className="list-group">
                        {movies.map(m => (
                            <Link key={m.id} to={`/movies/${m.id}`} className="list-group-item list-group-item-action">
                                {m.title}
                            </Link>
                        ))}
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
}
