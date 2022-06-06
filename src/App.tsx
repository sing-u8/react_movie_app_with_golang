import React from 'react';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';

// components
import Home from 'components/atoms/Home';
import Movies from 'components/atoms/Movies';
import Admin from 'components/atoms/Admin';
import Movie from 'components/atoms/Movie';
import Genres from 'components/atoms/genres';
import OneGenre from 'components/atoms/OneGenre';
import EditMovie from 'components/atoms/EditMovie/EditMovie';

// css
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
    return (
        <BrowserRouter>
            <div className="container">
                <div className="row">
                    <h1 className="mt-3">Go Watch a Movie!</h1>
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
                                    <Link to="/movies">Moives</Link>
                                </li>
                                <li className="list-group-item">
                                    <Link to="/genres">Genres</Link>
                                </li>
                                <li className="list-group-item">
                                    <Link to="/admin/add">Add Movie</Link>
                                </li>
                                <li className="list-group-item">
                                    <Link to="/admin">Manage Catalogue</Link>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    <div className="col-md-10">
                        <Routes>
                            <Route path="/" element={<Home />}></Route>

                            <Route path="/admin" element={<Admin />}></Route>
                            <Route path="/admin/add" element={<EditMovie />}></Route>

                            <Route path="/genres" element={<Genres />}></Route>
                            <Route path="/genre/:id" element={<OneGenre />}></Route>

                            <Route path="/movies" element={<Movies />}></Route>
                            <Route path="/movies/:id" element={<Movie />}></Route>
                        </Routes>
                    </div>
                </div>
            </div>
        </BrowserRouter>
    );
}
