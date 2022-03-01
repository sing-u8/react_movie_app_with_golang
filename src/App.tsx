import React from 'react';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';

// components
import Home from 'components/atoms/Home';
import Movies from 'components/atoms/Movies';
import Admin from 'components/atoms/Admin';
import Movie from 'components/atoms/Movie';
import CategoryPage from 'components/atoms/CategoryPage';
import Categories from 'components/atoms/Categories';

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
                                    <Link to="/by-category">Categories</Link>
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
                            <Route path="/by-category" element={<CategoryPage />}></Route>
                            <Route path="/by-category/drama" element={<Categories title={'Drama'} />}></Route>
                            <Route path="/by-category/comedy" element={<Categories title={'Comedy'} />}></Route>
                            <Route path="/movies" element={<Movies />}></Route>
                            <Route path="/movies/:id" element={<Movie />}></Route>
                        </Routes>
                    </div>
                </div>
            </div>
        </BrowserRouter>
    );
}
