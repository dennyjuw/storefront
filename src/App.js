import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.scss';

import { Provider } from 'react-redux';
import store from './redux/Store';

import Navigation from './navigation/Navigation';
import Category from './category/Category';
import Cart from './cart/Cart';
import Product from './product/Product';
import NotFound from './notFound/NotFound';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Provider store={store}>
          <div className="App">
            <Navigation />
            <Switch>
              <Route exact path="/" component={Category} />
              <Route path="/shop" component={Category} />
              <Route path="/cart" component={Cart}/>
              <Route path="/product/:id" component={Product}/>
              <Route component={NotFound} />
            </Switch>
          </div>
        </Provider>
      </BrowserRouter>
    );
  }
}

export default App;
