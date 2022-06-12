import React, { Component, Fragment, useState } from 'react';
import Input from 'components/atoms/forms/Input';
import Alert from 'components/atoms/ui-components/Alert';

type Props = {
    handleJWTChange?: (jwt: string) => void;
};

const Login: React.FC<Props> = props => {
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
        setState(prevState => ({
            ...prevState,
            [name]: value,
        }));
    }
    function handleSubmit(evt: any) {
        evt.preventDefault();
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
                    value={''}
                />

                <Input
                    title={'Password'}
                    type={'password'}
                    name={'password'}
                    handleChange={handleChange}
                    className={hasError('password') ? 'is-invalid' : ''}
                    errorDiv={hasError('password') ? 'text-danger' : 'd-none'}
                    errorMsg={'Please enter a password'}
                    value={''}
                />

                <hr />
                <button className="btn btn-primary">Login</button>
            </form>
        </Fragment>
    );
};

export default Login;
