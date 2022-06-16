import React, { Component, Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from 'components/atoms/forms/Input';
import Alert from 'components/atoms/ui-components/Alert';

import * as loginApi from 'api/login.api';

type Props = {
    handleJWTChange?: (jwt: string) => void;
};

const Login: React.FC<Props> = props => {
    const navigate = useNavigate();
    const [state, setState] = useState<{
        email: string;
        password: string;
        error: string;
        errors: Array<string>;
        alert: {
            type: string;
            message: string;
        };
    }>({
        email: '',
        password: '',
        error: null,
        errors: [],
        alert: {
            type: 'd-none',
            message: '',
        },
    });

    function handleChange(evt: any) {
        const value = evt.target.value;
        const name = evt.target.name;
        setState({ ...state, [name]: value });
    }
    function handleSubmit(evt: any) {
        evt.preventDefault();
        const errors = [];

        if (state.email === '') {
            errors.push('email');
        }

        if (state.password === '') {
            errors.push('password');
        }

        setState({ ...state, errors: errors });

        if (errors.length > 0) {
            return false;
        }
        const data = new FormData(evt.target);
        const payload = Object.fromEntries(data.entries());

        loginApi.signIn(payload).then(data => {
            if (data.error) {
                setState({
                    ...state,
                    alert: {
                        type: 'alert-danger',
                        message: data.error.message,
                    },
                });
            } else {
                console.log(data);
                handleJWTChange(Object.values(data)[0] as string);
                window.localStorage.setItem('jwt', JSON.stringify(Object.values(data)[0]));
                navigate('/admin');
            }
        });
    }

    function handleJWTChange(jwt: string) {
        props.handleJWTChange(jwt);
    }

    function hasError(key: string) {
        return state.errors.indexOf(key) !== -1;
    }

    return (
        <Fragment>
            <h2>Login</h2>
            <hr />
            <Alert alertType={state.alert.type} alertMessage={state.alert.message} />

            <form className="pt-3" onSubmit={handleSubmit}>
                <Input
                    title={'Email'}
                    type={'email'}
                    name={'email'}
                    handleChange={handleChange}
                    className={hasError('email') ? 'is-invalid' : ''}
                    errorDiv={hasError('email') ? 'text-danger' : 'd-none'}
                    errorMsg={'Please enter a valid email address'}
                    value={state.email}
                />

                <Input
                    title={'Password'}
                    type={'password'}
                    name={'password'}
                    handleChange={handleChange}
                    className={hasError('password') ? 'is-invalid' : ''}
                    errorDiv={hasError('password') ? 'text-danger' : 'd-none'}
                    errorMsg={'Please enter a password'}
                    value={state.password}
                />

                <hr />
                <button className="btn btn-primary">Login</button>
            </form>
        </Fragment>
    );
};

export default Login;
