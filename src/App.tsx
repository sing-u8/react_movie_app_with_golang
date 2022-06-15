import React, { Fragment, useEffect, useState } from 'react';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';

// components
import Home from 'components/atoms/Home';
import Movies from 'components/atoms/Movies';
import Admin from 'components/atoms/Admin';
import Movie from 'components/atoms/Movie';
import Genres from 'components/atoms/genres';
import OneGenre from 'components/atoms/OneGenre';
import EditMovie from 'components/molecules/EditMovie/EditMovie';
import Login from 'components/molecules/Login';

// css
import 'bootstrap/dist/css/bootstrap.min.css';

type Props = any;

const App: React.FC<Props> = props => {
    const [state, setState] = useState<{ jwt: string }>({ jwt: '' });

    function handleJWTChange(jwt: string) {
        setState({
            ...state,
            jwt: jwt,
        });
    }

    function logout() {
        setState({
            ...state,
            jwt: '',
        });
    }

    useEffect(() => {
        checkJWTExist();
    }, [state.jwt]);

    const [loginLink, setLoginLink] = useState<JSX.Element>();
    function checkJWTExist() {
        if (state.jwt === '') {
            setLoginLink(<Link to="/login">Login</Link>);
        } else {
            setLoginLink(
                <Link to="/logout" onClick={logout}>
                    Logout
                </Link>,
            );
        }
    }

    return (
        <BrowserRouter>
            <div className="container">
                <div className="row">
                    <div className="col mt-3">
                        <h1 className="mt-3">Go Watch a Movie!</h1>
                    </div>
                    <div className="col mt-3 text-end">{loginLink}</div>
                    <hr className="mb-3"></hr>
                </div>

                <div className="row">
                    <div className="col-md-2">
                        <nav>
                            <ul className="list-group">
                                <li className="list-group-item">
                                    <Link to="/">Home</Link>
                                </li>
                                <li className="list-group-item">
                                    <Link to="/movies">Movies</Link>
                                </li>
                                <li className="list-group-item">
                                    <Link to="/genres">Genres</Link>
                                </li>
                                {state.jwt !== '' && (
                                    <Fragment>
                                        <li className="list-group-item">
                                            <Link to="/admin/movie/0">Add movie</Link>
                                        </li>
                                        <li className="list-group-item">
                                            <Link to="/admin">Manage Catalogue</Link>
                                        </li>
                                    </Fragment>
                                )}
                            </ul>
                            <pre>{JSON.stringify(state, null, 3)}</pre>
                        </nav>
                    </div>

                    <div className="col-md-10">
                        <Routes>
                            <Route path="/" element={<Home />}></Route>

                            <Route path="/admin" element={<Admin {...props} jwt={state.jwt} />}></Route>
                            <Route path="/admin/movie/:id" element={<EditMovie {...props} jwt={state.jwt} />}></Route>

                            <Route path="/genres" element={<Genres />}></Route>
                            <Route path="/genre/:id" element={<OneGenre />}></Route>

                            <Route path="/movies" element={<Movies />}></Route>
                            <Route path="/movies/:id" element={<Movie />}></Route>

                            <Route path="/login" element={<Login {...props} handleJWTChange={handleJWTChange} />}></Route>
                        </Routes>
                    </div>
                </div>
            </div>
        </BrowserRouter>
    );
};

export default App;
