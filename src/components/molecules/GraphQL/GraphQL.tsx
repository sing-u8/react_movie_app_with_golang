import React, { Fragment, useEffect, useState } from 'react';

import { Movie } from 'schema/movie.interface';

import * as graphqlApi from 'api/graphql.api';
import Input from 'components/atoms/forms/Input';
import { Link } from 'react-router-dom';

interface State {
    movies: Array<Movie>;
    isLoaded: boolean;
    error: Error;
    alert: {
        type: string;
        message: string;
    };
    searchTerm: string;
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
        searchTerm: '',
    });

    function handleChange(evt: any) {
        const value = evt.target.value;

        setState(prevState => ({
            ...prevState,
            searchTerm: value,
        }));

        if (value.length > 2) {
            performSearch();
        } else {
            setState(prev => ({ ...prev, movies: [] }));
        }
    }

    function performSearch() {
        const payload = `
        {
            search(titleContains: "${state.searchTerm}") {
                id
                title
                runtime
                year
                description
            }
        }
        `;

        graphqlApi.getMoviesWithParam(payload, 'search').then(theList => {
            console.log(theList);
            if (theList.length > 0) {
                setState(prev => ({
                    ...prev,
                    movies: theList as Movie[],
                }));
            } else {
                setState(prev => ({
                    ...prev,
                    movies: [],
                }));
            }
        });
    }

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

            <Input title={'Search'} type={'text'} name={'search'} value={state.searchTerm} handleChange={handleChange} />

            <div className="list-group">
                {state.movies.map(m => (
                    <Link key={m.id} className="list-group-item list-group-item-action" to={`/moviesgraphql/${m.id}`}>
                        <strong>{m.title}</strong>
                        <br />
                        <small className="text-muted">
                            ({m.year}) - {m.runtime} minutes
                        </small>
                        <br />
                        {m.description.slice(0, 100)}...
                    </Link>
                ))}
            </div>
        </Fragment>
    );
};

export default GraphQL;
