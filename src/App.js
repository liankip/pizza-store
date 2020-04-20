import React, { Component } from 'react';
import {BrowserRouter, Route, Switch } from 'react-router-dom';

/* Component */
import Home from './components/Home';
import Cart from './components/cart/Cart';
import Receipt from './components/cart/Receipt';

/* Auth */
import Signin from './components/auth/Signin';

/* List */
import ReceiptList from './components/list/ReceiptList';

import { AuthContextProvider } from './components/context/AuthContext';

import Navigation from './components/nav/Navigation';

class App extends Component {

  render() {

    return (
      <BrowserRouter>
        <AuthContextProvider>
          <div className="App">
            <div className="container my-3 mx-auto px-4 md:px-12">
              <Navigation />
              <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/cart" component={Cart}/>
                <Route path="/receipt" component={Receipt} />
                <Route path="/receiptlist" component={ReceiptList} />
                <Route path="/signin" component={Signin}/>
              </Switch>
            </div>
          </div>
        </AuthContextProvider>
      </BrowserRouter>
    );
  }
}

export default App;