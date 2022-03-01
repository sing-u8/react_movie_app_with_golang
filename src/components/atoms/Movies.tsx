import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Movie } from 'schema/movie.interface';

export default function Movies() {
    const [movies, setMovies] = useState<Array<Movie>>([]);

    useEffect(() => {
        setMovies([
            { id: 1, title: 'The Shawshank Redemption', runtime: 142 },
            { id: 2, title: 'The Godfather', runtime: 175 },
            { id: 3, title: 'The Dark Knight', runtime: 153 },
        ]);
    }, []);

    return (
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
    );
}
