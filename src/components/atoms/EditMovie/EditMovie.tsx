import React, { Fragment, useEffect, useState } from 'react';
import './EditMovie.css';
import { Movie as MovieType, createInitMovie } from 'schema/movie.interface';

export default function EditMovie() {
    const [movie, setMovie] = useState<MovieType>({} as MovieType);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [error, setError] = useState<Error>();

    useEffect(() => {
        const movieInit = createInitMovie();
        setMovie({
            ...movieInit,
            ...{ title: 'The Godfather', mpaa_rating: 'R' },
        });
    }, []);

    return (
        <Fragment>
            <h2>Add/Edit Movie</h2>
            <hr />
            <form method="post">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                        Title
                    </label>
                    <input type="text" className="form-control" id="title" name="title" value={movie.title} />
                </div>

                <div className="mb-3">
                    <label htmlFor="release_date" className="form-label">
                        Release date
                    </label>
                    <input type="text" className="form-control" id="release_date" name="release_date" value={movie.release_date} />
                </div>

                <div className="mb-3">
                    <label htmlFor="runtime" className="form-label">
                        Runtime
                    </label>
                    <input type="text" className="form-control" id="runtime" name="runtime" value={movie.runtime} />
                </div>

                <div className="mb-3">
                    <label htmlFor="mpaa_rating" className="form-label">
                        MPAA Rating
                    </label>
                    <select className="form-select" value={movie.mpaa_rating}>
                        <option className="form-select">Choose...</option>
                        <option className="form-select" value="G">
                            G
                        </option>
                        <option className="form-select" value="PG">
                            PG
                        </option>
                        <option className="form-select" value="PG14">
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
                    <input type="text" className="form-control" id="rating" name="rating" value={movie.rating} />
                </div>

                <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                        Description
                    </label>
                    <textarea className="form-control" id="description" name="description" rows={3}>
                        {movie.description}
                    </textarea>
                </div>

                <hr />

                <button className="btn btn-primary">Save</button>
            </form>
        </Fragment>
    );
}
