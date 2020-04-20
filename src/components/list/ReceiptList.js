import React, {Component} from 'react';
import { withAuth } from '../context/AuthContext';

class ReceiptList extends Component {    

    componentDidMount() {
        this.props.initUser();
    }

    render() {

        const renderCarts = this.props.user ? (
            this.props.receipts.map(function(receipt, index) {
                return (
                    <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/4" key={index}>
                        <div className="max-w-sm rounded overflow-hidden shadow-lg">
                            <div className="px-6 py-4">
                                <div className="font-bold text-xl mb-2">{receipt.code}</div>
                                <div className="py-1">
                                    <p className="text-gray-700 text-base">Subtotal: ${receipt.subtotal}</p>
                                </div>
                                <div className="py-1">
                                    <p className="text-gray-700 text-base">Shipping: + $8</p>
                                </div>
                                <div className="py-1">
                                    <p className="text-gray-700 text-base">Total: ${receipt.total}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
        ):

        (
            <div className="flex h-screen w-screen">
                <div className="m-auto">
                    <p className="text-gray-600 text-2xl">you don't have history order</p>
                </div>
            </div>
        )

        return(
            <div className="flex flex-wrap -mx-1 lg:-mx-4">
                {renderCarts}
            </div>
        );
    }
}

export default withAuth(ReceiptList);