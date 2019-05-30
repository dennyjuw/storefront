import React from 'react';
import { Link } from 'react-router-dom';
import forEach from 'lodash/forEach';
import './Navigation.scss';

import { connect } from 'react-redux';

import Cart from '../cart/Cart';
import * as CONSTANT from '../constant/Constant';

class NavigationBase extends React.Component {
  constructor(props) {
  	super(props);
  	this.state = {
  		...props.cart,
      toggleCart: false,
  	}
  }

  calculateTotalProduct(product) {
  	let total = 0;
  	forEach(product, (prod) => {
  		total = total + prod.total;
  	})
  	return total;
  }

  toggleCart = event => {
    this.setState({
      toggleCart: !this.state.toggleCart
    })
  }

  render() {
  	const { cart } = this.state;
  	const totalProductInCart = this.calculateTotalProduct(cart);

  	return(
  		<div className="navigation container-fluid">
  			<div className="row">
	  			<div className="col-2">
			  		<Link to='/'><img src="/media/logo.png" alt="Hero store" /></Link>
			  	</div>
			  	<div className="col d-flex justify-content-center align-items-center">
				   	<Link to='/' className="navigation-link">Home</Link>
				   	<Link to='/shop' className="navigation-link">Shop</Link>
				   	<Link to='/journal' className="navigation-link">Journal</Link>
				   	<Link to='/more' className="navigation-link">More</Link>
				  </div>
				  <div className="col-2 d-flex align-items-center justify-content-end">
            <button onClick={this.toggleCart} className="navigation-link">Cart {cart.length > 0 && <span>({totalProductInCart})</span>}</button>
				  </div>
				</div>
        <div className={ this.state.toggleCart ? 'navigation-cart-popup open' : 'navigation-cart-popup'}>
          <Cart type={CONSTANT.CART_TYPE.POPUP} />
          <div className="d-flex justify-content-between px-4 pb-4">
            <Link to="/cart" className="cta-button--primary--inverse mr-4 flex-grow-1" onClick={this.toggleCart}>VIEW CART</Link>
            <button className="flex-grow-1 cta-button--primary" disabled={ cart.length === 0 } onClick={this.toggleCart}>CHECKOUT</button>
          </div>
        </div>
		  </div>
		)
  };
}

const mapStateToProps = state => ({
  cart: state.cart,
});

const Navigation = connect(mapStateToProps)(NavigationBase);

export default Navigation;
