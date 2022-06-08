import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Movie as MovieType } from 'schema/movie.interface';

import * as movieApi from 'api/movie.api';
import _ from 'lodash';

export default function Movie() {
    const { id } = useParams();

    const [movie, setMovie] = useState<MovieType>({} as MovieType);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [error, setError] = useState<Error>();

    useEffect(() => {
        (async function getMovie() {
            try {
                const json = await movieApi.getMovie(id as string);
                setMovie(json.movie);
                setIsLoaded(true);
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
                <div>Error: {error.message}</div>
            ) : !isLoaded ? (
                <p>Loading...</p>
            ) : (
                <Fragment>
                    <h2>
                        Movie: {movie.title} ({movie.year})
                    </h2>

                    <div className="float-start">
                        <small>Rating: {movie.mpaa_rating}</small>
                    </div>
                    <div className="float-end">
                        {_.keys(movie.genres).map((key, index) => (
                            <span className="badge bg-secondary me-1" key={index}>
                                {movie.genres[_.toNumber(key)]}
                            </span>
                        ))}
                    </div>
                    <div className="clearfix"></div>

                    <hr />

                    <table className="table table-compact table-striped">
                        <thead></thead>
                        <tbody>
                            <tr>
                                <td>
                                    <strong>Title:</strong>
                                </td>
                                <td>{movie.title}</td>
                            </tr>
                            <tr>
                                <td>
                                    <strong>Description:</strong>
                                </td>
                                <td>{movie.description}</td>
                            </tr>
                            <tr>
                                <td>
                                    <strong>Run time:</strong>
                                </td>
                                <td>{movie.runtime} minutes</td>
                            </tr>
                        </tbody>
                    </table>
                </Fragment>
            )}
        </Fragment>
    );
}
