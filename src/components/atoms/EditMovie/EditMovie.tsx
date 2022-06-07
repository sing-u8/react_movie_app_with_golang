import React, { Fragment, useEffect, useState } from 'react';
import './EditMovie.css';
import { Movie as MovieType, createInitMovie } from 'schema/movie.interface';

export default function EditMovie() {
    const movieInit = createInitMovie();
    const [state, setState] = useState<{ movie: MovieType; isLoaded: boolean; error: Error }>({ movie: movieInit, isLoaded: false, error: new Error('') });

    function handleChange(evt: any) {
        const value = evt.target.value;
        const name = evt.target.name;
        setState(prev => ({
            ...prev,
            movie: {
                ...prev.movie,
                [name]: value,
            },
        }));
    }

    function handleSubmit(evt: any) {
        console.log('Form was submitted');
        evt.preventDefault();
    }

    useEffect(() => {
        const movieInit = createInitMovie();
        setState({
            ...state,
            movie: {
                ...movieInit,
                ...{ title: 'The Godfather', mpaa_rating: 'R' },
            },
        });
    }, []);

    return (
        <Fragment>
            <h2>Add/Edit Movie</h2>
            <hr />
            <form onSubmit={handleSubmit}>
                <input type="hidden" name="id" id="id" value={state.movie.id} onChange={handleChange} />
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                        Title
                    </label>
                    <input type="text" className="form-control" id="title" name="title" value={state.movie.title} onChange={handleChange} />
                </div>

                <div className="mb-3">
                    <label htmlFor="release_date" className="form-label">
                        Release date
                    </label>
                    <input type="text" className="form-control" id="release_date" name="release_date" value={state.movie.release_date} onChange={handleChange} />
                </div>

                <div className="mb-3">
                    <label htmlFor="runtime" className="form-label">
                        Runtime
                    </label>
                    <input type="text" className="form-control" id="runtime" name="runtime" value={state.movie.runtime} onChange={handleChange} />
                </div>

                <div className="mb-3">
                    <label htmlFor="mpaa_rating" className="form-label">
                        MPAA Rating
                    </label>
                    <select name="mpaa_rating" className="form-select" value={state.movie.mpaa_rating} onChange={handleChange}>
                        <option className="form-select">Choose...</option>
                        <option className="form-select" value="G">
                            G
                        </option>
                        <option className="form-select" value="PG">
                            PG
                        </option>
                        <option className="form-select" value="PG13">
                            PG13
                        </option>
                        <option className="form-select" value="R">
                            R
                        </option>
                        <option className="form-select" value="NC17">
                            NC17
                        </option>
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="rating" className="form-label">
                        Rating
                    </label>
                    <input type="text" className="form-control" id="rating" name="rating" value={state.movie.rating} onChange={handleChange} />
                </div>

                <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                        Description
                    </label>
                    <textarea className="form-control" id="description" name="description" value={state.movie.description} rows={3} onChange={handleChange} />
                </div>

                <hr />

                <button className="btn btn-primary">Save</button>
            </form>

            <div className="mt-3">
                <pre>{JSON.stringify({ state }, null, 3)}</pre>
            </div>
        </Fragment>
    );
}
