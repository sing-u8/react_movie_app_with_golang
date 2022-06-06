import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Genre } from 'schema/genre.interface';

import * as genreApi from 'api/genre.api';

export default function genres(props: any) {
    const [genres, setGenres] = useState<Array<Genre>>([]);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [error, setError] = useState<Error>();

    useEffect(() => {
        (async function getAllGeners() {
            try {
                const json = await genreApi.getAllGenres();
                setGenres(json.genres);
                setIsLoaded(true);
                console.log('genres, isloaded : ', json.genres, isLoaded);
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
                    <h2>Genres</h2>

                    <div className="list-group">
                        {genres.map(m => (
                            <Link
                                key={m.id}
                                className="list-group-item list-group-item-action"
                                state={{
                                    genreName: m.genre_name,
                                }}
                                to={`/genre/${m.id}`}
                            >
                                {m.genre_name}
                            </Link>
                        ))}
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
}
