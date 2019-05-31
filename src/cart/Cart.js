import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import forEach from 'lodash/forEach';
import './Cart.scss';

import { connect } from 'react-redux';

import CartItem from './CartItem/CartItem';
import * as CONSTANT from '../constant/Constant';

class CartBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.cart,
    }
    this.type = props.type;
  }

  calculateTotal(cart) {
    let total = 0;
    forEach(cart, (product) => {
      total += (product.total * product.price);
    })
    return total;
  }

  renderPopup(cart, cartTotalPriceFormatted) {
    return (
      <div className="cart cart-popup">
        <div className="cart-container">
          <table className="cart-table">
            <tbody>
              {
                (cart.length === 0) ?
                  <tr><td colSpan="4" className="cart-item py-5">Shopping cart is empty</td></tr>
                  :
                  (cart.map((productInCart, index) => {
                    const product = { ...productInCart };
                    return (
                      <CartItem product={product} type={ CONSTANT.CART_TYPE.POPUP } key={index} />
                    )
                  }))
              }
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="4">
                  <div className="row no-gutters justify-content-end">
                    <div className="col text-left">
                      <div className="my-3 d-flex justify-content-between">
                        <div className="type-bold">
                          TOTAL
                        </div>
                        <div className="type-price type-font-size-16">
                          { cartTotalPriceFormatted }
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    );
  }

  renderFull(cart, cartTotalPriceFormatted) {
    return (
      <div className="cart">
        <h1>Shopping Cart</h1>
        <div className="cart-container">
          <table className="cart-table">
            <thead>
              <tr>
                <th>PRODUCT</th>
                <th className="text-right">QUANTITY</th>
                <th className="text-right">TOTAL</th>
                <th className="text-right">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {
                (cart.length === 0) ?
                  <tr><td colSpan="4" className="cart-item py-5">Shopping cart is empty</td></tr>
                  :
                  (cart.map((productInCart, index) => {
                    const product = { ...productInCart };
                    return (
                      <CartItem product={product} type={ CONSTANT.CART_TYPE.FULL } key={index} />
                    )
                  }))
              }
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="4">
                  <div className="row no-gutters justify-content-end">
                    <div className="col-5 text-left">
                      <div className="mt-5 type-bold">CART OVERVIEW</div>
                      <div className="mt-3 d-flex justify-content-between">
                        <div className="type-bold">
                          SUBTOTAL
                        </div>
                        <div className="type-price type-font-size-16">
                          {cartTotalPriceFormatted}
                        </div>
                      </div>
                      <div className="mt-3 mb-5 d-flex justify-content-between">
                        <div className="type-bold">
                          TOTAL
                        </div>
                        <div className="type-price type-font-size-16">
                          {cartTotalPriceFormatted}
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
          <div className="d-flex justify-content-between mt-5">
            <Link to="/" className="cta-button--link align-self-start">Continue shopping</Link>
            <button className="cta-button--primary" disabled={ cart.length === 0 }>CHECKOUT<span>({cartTotalPriceFormatted})</span></button>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { cart } = this.state;
    const cartTotalPrice = this.calculateTotal(cart);
    const cartTotalPriceFormatted = new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' }).format(cartTotalPrice);
    return (this.type === CONSTANT.CART_TYPE.POPUP) ? this.renderPopup(cart, cartTotalPriceFormatted) : this.renderFull(cart, cartTotalPriceFormatted);
  }
}

const mapStateToProps = state => ({
  cart: state.cart,
});

const Cart = connect(mapStateToProps)(CartBase);

export default Cart;
