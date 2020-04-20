import React, { Component } from 'react';
import { withAuth } from '../context/AuthContext';
import { Redirect } from 'react-router-dom';

class Signin extends Component{    

    state = {
        email: '',
        password: ''
    }

    handleChange = (e) => {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    signin = (e) => {
        e.preventDefault();
        this.props.signin(this.state)
    }

    render() {
        if(this.props.toSignIn)
            return <Redirect push to='/receiptlist' />

        return(
            <div className="w-full max-w-xs py-8 mx-auto">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Email
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" name="email" type="email" placeholder="Email" 
                                value={this.state.email} 
                                onChange={this.handleChange} />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Password
                        </label>
                        <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" name="password" type="password" placeholder="******************" 
                                value={this.state.password}
                                onChange={this.handleChange} />
                    </div>
                    <div className="flex items-center justify-between">
                        <button className="bg-gray-200 hover:bg-purple-700 hover:text-white text-sm font-semibold text-purple-700 py-2 px-4 rounded inline-flex items-center mr-2" type="button" onClick={this.signin}>
                            Sign In
                        </button>
                    </div>
                </form>
                <p className="text-center text-gray-500 text-xs">
                    &copy;2020 Pizza App V1.0.
                </p>
            </div>

        );
    }
}

export default withAuth(Signin);