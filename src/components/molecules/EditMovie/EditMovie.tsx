import React, { Fragment, useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './EditMovie.css';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import { Movie as MovieType, createInitMovie } from 'schema/movie.interface';

import Input from 'components/atoms/forms/Input';
import TextArea from 'components/atoms/forms/TextArea';
import Select from 'components/atoms/forms/Select';
import Alert from 'components/atoms/ui-components/Alert';

import * as movieApi from 'api/movie.api';
import _ from 'lodash';

export default function EditMovie() {
    const { id } = useParams();
    const navigate = useNavigate();

    const movieInit = createInitMovie();
    const [state, setState] = useState<{ movie: MovieType; isLoaded: boolean; error: Error; mpaaOptions: Array<{ id: string; value: string }>; alert: { type: string; message: string } }>({
        movie: movieInit,
        isLoaded: false,
        error: undefined,
        mpaaOptions: [
            { id: 'G', value: 'G' },
            { id: 'PG', value: 'PG' },
            { id: 'PG13', value: 'PG13' },
            { id: 'R', value: 'R' },
            { id: 'NC17', value: 'NC17' },
        ],
        alert: {
            type: 'd-none',
            message: '',
        },
    });
    const [errors, setErrors] = useState<string[]>([]);

    function hasError(key: string) {
        return errors.indexOf(key) !== -1;
    }

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

        // client side validation
        const errors = [];
        if (state.movie.title === '') {
            errors.push('title');
        }

        setErrors(errors);

        if (errors.length > 0) {
            return false;
        }

        const data = new FormData(evt.target);
        const payload = Object.fromEntries(data.entries());
        movieApi.createMovie(payload).then(data => {
            if (data.error) {
                setState({
                    ...state,
                    alert: { type: 'alert-danger', message: data.error.message },
                });
            } else {
                // setState({
                //     ...state,
                //     alert: { type: 'alert-success', message: 'Changes saved!' },
                // });
                navigate('/admin');
            }
        });
    }

    function confirmDelete(e?: any) {
        console.log('would delete movie id', state.movie.id);
        confirmAlert({
            title: 'Delete Movie?',
            message: 'Are you sure?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        movieApi.deleteMovie(String(state.movie.id)).then(data => {
                            if (data.error) {
                                setState({
                                    ...state,
                                    alert: { type: 'alert-danger', message: data.error.message },
                                });
                            } else {
                                navigate('/admin');
                            }
                        });
                    },
                },
                {
                    label: 'No',
                    onClick: () => {
                        return false;
                    },
                },
            ],
        });
    }

    useEffect(() => {
        const movieInit = createInitMovie();
        setState({
            ...state,
            movie: {
                ...movieInit,
            },
        });

        if (id != undefined && Number(id) > 0) {
            (async function getMovie() {
                try {
                    const json = await movieApi.getMovie(id as string);
                    const releaseDate = new Date(json.movie.release_date);
                    setState({
                        ...state,
                        movie: {
                            ...state.movie,
                            id: Number(id) as number,
                            title: json.movie.title as string,
                            release_date: releaseDate.toISOString().split('T')[0] as string,
                            runtime: json.movie.runtime as string,
                            mpaa_rating: json.movie.mpaa_rating as string,
                            rating: json.movie.rating as string,
                            description: json.movie.description as string,
                        },
                        isLoaded: true,
                    });
                } catch (err) {
                    setState({
                        ...state,
                        isLoaded: true,
                        error: err as Error,
                    });
                }
            })();
        } else {
            setState({
                ...state,
                isLoaded: true,
            });
        }
    }, []);

    return (
        <Fragment>
            {state.error ? (
                <div>Error: {state.error.message}</div>
            ) : !state.isLoaded ? (
                <p>Loading...</p>
            ) : (
                <Fragment>
                    <h2>Add/Edit Movie</h2>
                    <Alert alertType={state.alert.type} alertMessage={state.alert.message} />
                    <hr />
                    <form onSubmit={handleSubmit}>
                        <input type="hidden" name="id" id="id" value={state.movie.id} onChange={handleChange} />

                        <Input
                            title={'Title'}
                            className={hasError('title') ? 'is-invalid' : ''}
                            type={'text'}
                            name={'title'}
                            value={state.movie.title}
                            handleChange={handleChange}
                            errorDiv={hasError('title') ? 'text-danger' : 'd-none'}
                            errorMsg={'Please enter a title'}
                        />
                        <Input title={'Release date'} type={'date'} name={'release_date'} value={state.movie.release_date} handleChange={handleChange} />
                        <Input title={'Runtime'} type={'text'} name={'runtime'} value={state.movie.runtime} handleChange={handleChange} />

                        <Select title={'MPAA Rating'} name={'mpaa_rating'} options={state.mpaaOptions} value={state.movie.mpaa_rating} handleChange={handleChange} placeholder={'Choose...'} />

                        <Input title={'Rating'} type={'text'} name={'rating'} value={state.movie.rating} handleChange={handleChange} />

                        <TextArea title={'Description'} name={'description'} value={state.movie.description} rows={3} handleChange={handleChange} />

                        <hr />

                        <button className="btn btn-primary">Save</button>
                        <Link to="/admin" className="btn btn-warning ms-1">
                            Cancel
                        </Link>
                        {state.movie.id > 0 && (
                            <a href="#!" onClick={() => confirmDelete()} className="btn btn-danger ms-1">
                                Delete
                            </a>
                        )}
                    </form>
                </Fragment>
            )}
        </Fragment>
    );
}
