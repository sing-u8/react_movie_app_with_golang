import React, { Fragment, useEffect, useState } from 'react';

import { Movie } from 'schema/movie.interface';

import * as graphqlApi from 'api/graphql.api';

interface State {
    movies: Array<Movie>;
    isLoaded: boolean;
    error: Error;
    alert: {
        type: string;
        message: string;
    };
}

const GraphQL = () => {
    const [state, setState] = useState<State>({
        movies: [],
        isLoaded: false,
        error: null,
        alert: {
            type: 'd-none',
            message: '',
        },
    });

    useEffect(() => {
        const payload = `
        {
            list {
                id
                title
                runtime
                year
                description
            }
        }
        `;

        graphqlApi.getMovieList(payload).then(theList => {
            console.log(theList);
            setState({
                ...state,
                movies: theList as Movie[],
            });
        });
    }, []);

    return (
        <Fragment>
            <h2>GraphQL</h2>
            <hr />
            <div className="list-group">
                {state.movies.map(m => (
                    <a key={m.id} className="list-group-item list-group-item-action" href="#!">
                        <strong>{m.title}</strong>
                        <br />
                        <small className="text-muted">
                            ({m.year}) - {m.runtime} minutes
                        </small>
                        <br />
                        {m.description.slice(0, 100)}...
                    </a>
                ))}
            </div>
        </Fragment>
    );
};

export default GraphQL;
