import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

const httpClient = axios.create();
httpClient.defaults.timeout = 500;

class Receipt extends Component{
    
    state = { 
        carts: [],
        items: []
    };

    async componentDidMount() {
        return axios.get(`https://pizza-apiv10.herokuapp.com/api/lastinsert`).then(res => {
            this.setState({ carts: res.data });
            this.setState({ items: JSON.parse(res.data[0].items)});
        });
    }

    render() {

        const isDataLoaded = this.state.carts || this.state.items;

        if (!isDataLoaded) {
          return <div>Loading...</div>;
        }
          
        /* Data */
        const renderCarts = this.state.carts.map(function(cart, index) {
            return (
                <div key={index}>
                    <div>
                        <p className="text-gray-600 text-base">Order Receipt</p>
                        <h2 className="font-bold text-xl mb-2">{cart.code}</h2>
                    </div>
                    <div>
                        <p className="text-gray-600 text-base">Sub Total</p>
                        <h2 className="font-bold text-xl mb-2">$ {cart.subtotal}</h2>
                    </div>
                    <div>
                        <p className="text-gray-600 text-base ">Shipping</p>
                        <p className="font-bold text-xl mb-2 ">+ $8</p>
                    </div>
                    <div>
                        <p className="text-gray-600 text-base">Total</p>
                        <h2 className="font-bold text-xl mb-2">$ {cart.total}</h2>
                    </div>
                </div>
            )
        });

        /* Items */
        const renderItems = this.state.items.map(function(item, index) {
            return (
                <div key={index} className="mb-4">
                    <div>
                        <p>{item.title} x {item.quantity} = ${item.quantity*item.price}</p>
                    </div>
                </div>
            )
        });

        return(
            <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl py-8 mx-auto">
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <h1 className="font-bold text-xl mb-2">Receipt</h1>
                        {renderCarts}
                        
                        <p className="text-gray-600 text-base">List Pizza</p>
                        {renderItems}
                        <h3 className="font-bold text-xl mb-2">Note : Screenshoot this receipt code </h3>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return{
        total: state.total
    }
}

export default connect(mapStateToProps)(Receipt)
