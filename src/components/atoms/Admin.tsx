import React, { Fragment, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import * as movieApi from 'api/movie.api';

import { Movie } from 'schema/movie.interface';

type Props = any;

const Admin: React.FC<Props> = props => {
    const navigate = useNavigate();

    const [movies, setMovies] = useState<Array<Movie>>([]);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [error, setError] = useState<Error>();

    useEffect(() => {
        if (props.jwt === '') {
            navigate('/login');
        }

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
};

export default Admin;
