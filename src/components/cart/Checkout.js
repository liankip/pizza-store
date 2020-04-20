import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

const httpClient = axios.create();
httpClient.defaults.timeout = 500;

class Checkout extends Component{
    
    state = {
        address: ''
    };    

    onAddressChange = e => {
        this.setState({ address: e.target.value });
    };

    saveOrder = e => {
        return httpClient.post(`https://pizza-apiv10.herokuapp.com/api/orders`,  {
            code: 'pizz-' + Math.floor(Math.random() * 2000) + 1,
            user_id: localStorage.getItem('user_id') || 3,
            items: JSON.stringify(this.props.items),
            address: this.state.address,
            subtotal: this.props.total,
            total: this.props.total + 8,
        });
    }

    render() {
        return(
            <div className="max-w-sm rounded overflow-hidden shadow-lg">
                <div className="px-6 py-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Address
                        </label>
                        <textarea name="address" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={this.onAddressChange}></textarea>
                    </div>
                    <div className="mb-4">
                        <label className="md:w-2/3 block text-gray-500 font-bold">
                            <span className="text-gray-600 text-base">
                                Shipping add + $8
                            </span>
                        </label>
                    </div>
                    <div className="font-bold text-xl mb-2"><b>Total: ${this.props.total} </b></div>
                    <Link to="/receipt">
                        <button className="bg-gray-200 hover:bg-purple-700 hover:text-white text-sm font-semibold text-purple-700 py-2 px-4 rounded inline-flex items-center mr-2" onClick={this.saveOrder}>Checkout</button>
                    </Link>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return{
        items: state.addedItems,
        total: state.total
    }
}

const mapDispatchToProps = (dispatch)=>{
    return{
        addShipping: ()=>{dispatch({type: 'ADD_SHIPPING'})},
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Checkout)