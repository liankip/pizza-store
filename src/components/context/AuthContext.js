import React, { Component } from 'react';
import axios from 'axios';

const axiosReq = axios.create();
const AuthContext = React.createContext();

axiosReq.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
});

export class AuthContextProvider extends Component {
    
    constructor() {
        super()
        this.state = {
            users: [],
            user: localStorage.getItem('user') || "",
            token: localStorage.getItem('token') || "",
            toSignIn: (localStorage.getItem('token') === null) ? false : true,
            receipts: []
        }
    }

    initUser = () => {
        const user_id = localStorage.getItem('user_id');
        return axiosReq.get(`https://pizza-apiv10.herokuapp.com/api/receipts/${user_id}`)
                        .then(response => {
                            this.setState({ user: response.data })
                            this.setState({ receipts: response.data.orders });
                            return response
                    });

    }

    signin = (credentials) => {
        return axiosReq.post('https://pizza-apiv10.herokuapp.com/api/auth/signin', credentials)
                    .then(response => {
                        const { token } = response.data

                        localStorage.setItem("token", token)
                        localStorage.setItem("user_id", response.data.user_id)

                        this.setState({
                            token,
                            toSignIn: true
                        })
                    })

    }

    render() {
        return (
            <AuthContext.Provider value={{
                signin: this.signin,
                logout: this.logout,
                initUser: this.initUser,
                ...this.state
            }}>
                {this.props.children}
            </AuthContext.Provider>
        )
    }
}

export const withAuth = (WrappedComponent) => {
    return class extends Component {
        render() {
            return (
                <AuthContext.Consumer>
                    {(context) => (
                        <WrappedComponent {...this.props} {...context} />
                    )}
                </AuthContext.Consumer>
            )
        }
    }
}