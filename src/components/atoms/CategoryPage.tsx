import React from 'react';

import { Link } from 'react-router-dom';

export default function CategoryPage() {
    return (
        <div>
            <h2>Categories</h2>

            <ul>
                <li>
                    <Link to={`comedy`}>Comedy</Link>
                </li>
                <li>
                    <Link to={`drama`}>Drama</Link>
                </li>
            </ul>
        </div>
    );
}
