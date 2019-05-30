import React, { Component, Fragment } from 'react';
import './CartItem.scss';

import { connect } from 'react-redux';
import { doCartUpdate, doCartRemove } from '../../redux/actions/cartUpdate';

import * as CONSTANT from '../../constant/Constant';

class CartItemBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.product,
    }
    this.type = props.type;
  }

  removeItemFromCart(productId) {
    this.props.onRemoveItemFromCart(productId);
  }

  componentWillReceiveProps(nextProps) {
    const { id, image, brand, title, total, price } = nextProps.product;
    this.setState({ id, image, brand, title, total, price });
  }

  onChange = event => {
    const re = /^[0-9\b]+$/;
    if (event.target.value === '' || re.test(event.target.value)) {
      this.props.onAddToCart(this.state, parseInt(event.target.value, 10));
    }
  };

  addTotal = event => {
    const { total }= this.state;
    this.props.onAddToCart(this.state, parseInt((total === '' ? 0 : total), 10) + 1);
    event.preventDefault();
  }

  removeTotal = event => {
    const { total } = this.state;
    if (total > 1) {
      this.props.onAddToCart(this.state, parseInt(total, 10) - 1);
    }
    event.preventDefault();
  }

  render() {
    const { id, image, brand, title, total, price } = this.state;
    const formatedPrice = new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' }).format(total * price);

    return (
      <tr className="cart-item">
        <td className="d-flex">
          <div className="cart-item__image">
            <img src={'/media/' + image} alt={title} />
          </div>
          <div>
            {
              this.type !== CONSTANT.CART_TYPE.POPUP &&
              <div className="cart-item__brand">
                { brand }
              </div>
            }
            <div className="cart-item__title">
              { title } { this.type === CONSTANT.CART_TYPE.POPUP && <span className="type-normal type-font-size-10">x&nbsp;{ total }</span> }
            </div>
            {
              this.type === CONSTANT.CART_TYPE.POPUP &&
                <Fragment>
                  <div className="cart-item__brand">
                    { brand }
                  </div>
                  <div className="type-price text-left">
                    { formatedPrice }
                  </div>
                </Fragment>
            }
          </div>
        </td>
        {
          this.type !== CONSTANT.CART_TYPE.POPUP &&
            <Fragment>
              <td className="cart-item__quantity">
                <div className="d-flex justify-content-end">
                  <input type="text" value={total} onChange={this.onChange} ref={input => this.quantityInput = input} className="cart-item__quantity__input" />
                  <div className="d-flex flex-column">
                    <button onClick={this.addTotal} className="cta-button--secondary">+</button>
                    <button onClick={this.removeTotal} className="cta-button--secondary">&ndash;</button>
                  </div>
                </div>
              </td>
              <td className="type-price text-right">
                { formatedPrice }
              </td>
            </Fragment>
        }

        <td className="cart-item__cta">
          <button className={ this.type === CONSTANT.CART_TYPE.POPUP ? 'cta-button--remove--condensed' : 'cta-button--remove' } onClick={() => this.removeItemFromCart(id)}/>
        </td>
      </tr>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  onAddToCart: (product, total) => dispatch(doCartUpdate(product, total)),
  onRemoveItemFromCart: (productId) => dispatch(doCartRemove(productId)),
});

const CartItem = connect(null, mapDispatchToProps)(CartItemBase);

export default CartItem;
