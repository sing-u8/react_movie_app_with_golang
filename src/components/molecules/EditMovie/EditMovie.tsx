import React, { Fragment, useEffect, useState } from 'react';
import './EditMovie.css';
import { Movie as MovieType, createInitMovie } from 'schema/movie.interface';
import Input from 'components/atoms/forms/Input';
import TextArea from 'components/atoms/forms/TextArea';
import Select from 'components/atoms/forms/Select';

export default function EditMovie() {
    const movieInit = createInitMovie();
    const [state, setState] = useState<{ movie: MovieType; isLoaded: boolean; error: Error; mpaaOptions: Array<{ id: string; value: string }> }>({
        movie: movieInit,
        isLoaded: false,
        error: new Error(''),
        mpaaOptions: [
            { id: 'G', value: 'G' },
            { id: 'PG', value: 'PG' },
            { id: 'PG13', value: 'PG13' },
            { id: 'R', value: 'R' },
            { id: 'NC17', value: 'NC17' },
        ],
    });

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
            },
        });
    }, []);

    return (
        <Fragment>
            <h2>Add/Edit Movie</h2>
            <hr />
            <form onSubmit={handleSubmit}>
                <input type="hidden" name="id" id="id" value={state.movie.id} onChange={handleChange} />

                <Input title={'Title'} type={'text'} name={'title'} value={state.movie.title} handleChange={handleChange} />
                <Input title={'Release date'} type={'date'} name={'release_date'} value={state.movie.release_date} handleChange={handleChange} />
                <Input title={'Runtime'} type={'text'} name={'runtime'} value={state.movie.runtime} handleChange={handleChange} />

                <Select title={'MPAA Rating'} name={'mpaa_rating'} options={state.mpaaOptions} value={state.movie.mpaa_rating} handleChange={handleChange} placeholder={'Choose...'} />

                <Input title={'Rating'} type={'text'} name={'rating'} value={state.movie.rating} handleChange={handleChange} />

                <TextArea title={'Description'} name={'description'} value={state.movie.description} rows={3} handleChange={handleChange} />

                <hr />

                <button className="btn btn-primary">Save</button>
            </form>

            <div className="mt-3">
                <pre>{JSON.stringify({ state }, null, 3)}</pre>
            </div>
        </Fragment>
    );
}
