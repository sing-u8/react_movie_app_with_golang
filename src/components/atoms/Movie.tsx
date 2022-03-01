import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Movie as MovieType } from 'schema/movie.interface';

export default function Movie() {
    const { id } = useParams();

    const [movieState, setMovieState] = useState<MovieType>();

    useEffect(() => {
        setMovieState({
            id: Number(id),
            title: 'Some movie',
            runtime: 150,
        });
    }, []);

    return (
        <Fragment>
            <h2>Movie: {movieState?.title}</h2>

            <table className="table table-compact table-striped">
                <thead></thead>
                <tbody>
                    <tr>
                        <td>
                            <strong>Title:</strong>
                        </td>
                        <td>{movieState?.title}</td>
                    </tr>
                    <tr>
                        <td>
                            <strong>Run time:</strong>
                        </td>
                        <td>{movieState?.runtime} minutes</td>
                    </tr>
                </tbody>
            </table>
        </Fragment>
    );
}
