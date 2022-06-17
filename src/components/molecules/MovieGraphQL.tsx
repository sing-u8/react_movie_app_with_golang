import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Movie as MovieType } from 'schema/movie.interface';

import * as movieApi from 'api/movie.api';
import * as graphqlApi from 'api/graphql.api';
import _ from 'lodash';

export default function MovieGraphQL() {
    const { id } = useParams();

    const [movie, setMovie] = useState<MovieType>({} as MovieType);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [error, setError] = useState<Error>();

    useEffect(() => {
        const payload = `
        {
            movie(id: ${id}) {
                id
                title
                runtime
                year
                description
                release_date
                rating
                mpaa_rating
                poster
            }
        }
        `;
        graphqlApi.getMovieWithParam(payload, 'movie').then((data: any) => {
            console.log('graphqlApi.getMovieWithParam --- ', data);
            setMovie(data.data.movie);
            setIsLoaded(true);
        });
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

                    {movie.poster !== '' && (
                        <div>
                            <img src={`https://image.tmdb.org/t/p/w200${movie.poster}`} alt="poster" />
                        </div>
                    )}

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
