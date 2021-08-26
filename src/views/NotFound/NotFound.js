import React from 'react';
import { Link } from 'react-router-dom';


const NotFound = () => {

    return (
        <div>
           <h1> Oops! The page was not found! </h1>
           <Link to="/">
                Go back to Home
            </Link>
        </div>
    );
}

export default NotFound;