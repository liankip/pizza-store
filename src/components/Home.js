import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToCart } from './actions/cartActions';

class Home extends Component{
    
    handleClick = (id)=>{
        this.props.addToCart(id); 
    }

    render() {
        var itemList = this.props.items.map(item=>{
            return(            
                <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/4" key={item.id}>
                    <div className="max-w-sm rounded overflow-hidden shadow-lg">
                        <div className="px-6 py-4">
                            <img src={item.img} alt={item.title}/>
                            <div className="font-bold text-xl mb-2">{item.title}</div>
                            <p className="text-gray-600 text-base">{item.desc}</p>
                            <div className="px-2 py-4">
                                <p><b>Price: {item.price}$</b></p>
                            </div>
                            <button className="bg-gray-200 hover:bg-purple-700 hover:text-white text-sm font-semibold text-purple-700 py-2 px-4 rounded inline-flex items-center mr-2" to="/" onClick={()=>{this.handleClick(item.id)}}>
                                <i className="fas fa-cart-plus"></i>
                                <span className="px-1">Order</span>
                            </button>
                        </div>
                    </div>
                </div>
            )
        })

        return(
            <div className="flex flex-wrap -mx-1 lg:-mx-4">
                {itemList}
            </div>
        )
    }
}
const mapStateToProps = (state)=>{
    return {
      items: state.items
    }
  }
const mapDispatchToProps= (dispatch)=>{
    
    return{
        addToCart: (id)=>{dispatch(addToCart(id))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)