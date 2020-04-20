import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { withAuth } from '../context/AuthContext';

function ProtectedRoute(Props) {
    const { component: Component, ...rest } = props

    return (
        props.toSignIn ? <Route {...rest} component={Component} /> : <Redirect Push to='/' />
    )
}

export default withAuth(ProtectedRoute);