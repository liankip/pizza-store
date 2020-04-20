import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeItem, addQuantity, subtractQuantity} from '../actions/cartActions';

import Checkout from './Checkout';

class Cart extends Component{    

    handleRemove = (id) => {
        this.props.removeItem(id);
    }

    handleAddQuantity = (id)=>{
        this.props.addQuantity(id);
    };
    
    handleSubtractQuantity = (id)=>{
        this.props.subtractQuantity(id);
    };

    render() {
             
        var addedItems = this.props.items.length ?
            (
                this.props.items.map(item=>{
                    return (
                       
                        <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/4" key={item.id}>
                            <div className="max-w-sm rounded overflow-hidden shadow-lg">
                                <div className="px-6 py-4">
                                    <img src={item.img} alt={item.img}/>
                                    <span className="font-bold text-xl mb-2">{item.title}</span>
                                    <p className="text-gray-600 text-base"><b>Price: ${item.price}</b></p> 
                                    <p>
                                        <b>Quantity: {item.quantity}</b> 
                                    </p>
                                    <Link to="/cart">
                                        <button className="bg-gray-200 hover:bg-purple-700 hover:text-white text-sm font-semibold text-purple-700 py-2 px-4 rounded inline-flex items-center mr-2" onClick={()=>{this.handleAddQuantity(item.id)}}>
                                            <i className="fas fa-arrow-up"></i>
                                        </button>
                                    </Link>
                                    <Link to="/cart">
                                        <button className="bg-gray-200 hover:bg-purple-700 hover:text-white text-sm font-semibold text-purple-700 py-2 px-4 rounded inline-flex items-center mr-2" onClick={()=>{this.handleSubtractQuantity(item.id)}}>
                                            <i className="fas fa-arrow-down" ></i>
                                        </button>
                                    </Link>
                                    <button className="bg-gray-200 hover:bg-purple-700 hover:text-white text-sm font-semibold text-purple-700 py-2 px-4 rounded inline-flex items-center mr-2" onClick={()=>{this.handleRemove(item.id)}}>Remove</button>
                                </div>
                            </div>
                        </div>
                    )
                })
            ):

            (
                <div className="flex h-screen w-screen">
                    <div className="m-auto">
                        <p className="text-gray-600 text-2xl">you haven't ordered yet</p>
                    </div>
                </div>
            )
       return(
            <div className="flex flex-wrap -mx-1 lg:-mx-4">
                {addedItems}
                <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-full">
                { this.props.items.length ? (<Checkout />):('')}
                </div>
            </div>
       )
    }
}


const mapStateToProps = (state)=>{
    return{
        items: state.addedItems,
    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
        removeItem: (id)=>{dispatch(removeItem(id))},
        addQuantity: (id)=>{dispatch(addQuantity(id))},
        subtractQuantity: (id)=>{dispatch(subtractQuantity(id))}
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Cart)