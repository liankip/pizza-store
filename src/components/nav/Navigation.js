import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../context/AuthContext';

class Navigation extends Component {

    render() {
        return (
            <div className="p-4 rounded overflow-hidden shadow-lg">
                <h1 className="text-purple-500 leading-normal float-left">
                    <Link to="/" className="brand-logo"><i className="fas fa-home fa-lg"></i></Link>
                </h1>
                <h1 className="px-2 text-purple-500 leading-normal float-right"><Link to="/cart"><i className="fas fa-shopping-cart fa-lg"></i></Link></h1>
                <h1 className="px-2 text-purple-500 leading-normal float-right"><Link to="/signin"><i className="fas fa-user fa-lg"></i></Link></h1>
                <h1 className="px-2 text-purple-500 leading-normal float-right"><Link to="/receiptlist"><i className="fas fa-clipboard-list fa-lg"></i></Link></h1>
            </div>
        )
    }
}

export default withAuth(Navigation);