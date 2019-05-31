import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import find from 'lodash/find';
import './Product.scss';

import { connect } from 'react-redux';
import { doCartAdd } from '../redux/actions/cartUpdate';
import { doCategoryUpdate } from '../redux/actions/categoryUpdate';

export class ProductBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: props.product,
      id: props.match.params.id,
      productInfo: null,
      total: 1,
    };
  }

  fetchCategory() {
    fetch('/products.json')
      .then(res => {
        return res.json();
      })
      .then(res => {
        this.props.onFetchCategory(res);
        this.setState({ product: res });
        this.getProductInfo();
      })
      .catch(err => {
        // catch error
      });
  }

  componentWillMount() {
    if (this.state.product.length === 0) {
      this.fetchCategory();
    } else {
      this.getProductInfo();
    }
  }

  getProductInfo() {
    const productId = parseInt(this.state.id, 10);
    const product = find(this.state.product, { id: productId });
    this.setState({ productInfo: product });
  }

  addTotal = event => {
    const { total } = this.state;
    this.setState({
      total: parseInt((total === '' ? 0 : total), 10) + 1
    });
    event.preventDefault();
  }

  removeTotal = event => {
    const { total } = this.state;
    if (total > 1) {
      this.setState({
        total: parseInt(total, 10) - 1
      });
    }
    event.preventDefault();
  }

  addToCart = event => {
    if (Number.isInteger(this.state.total)) {
      this.props.onAddToCart(this.state.productInfo, this.state.total);
    }
  }

  onChange = event => {
    const re = /^[0-9\b]+$/;
    if (event.target.value === '' || re.test(event.target.value)) {
       this.setState({ total: event.target.value })
    }
  };

  render() {
    const { productInfo, total } = this.state;

    if (!productInfo) {
      return <p>Loading ...</p>;
    } else {
      const { brand, title, image, price } = this.state.productInfo;

      return (
        <div className="container">
          <div className="row">
            <div className="col d-flex justify-content-center my-5">
              <Link to="/" className="navigation-link">HOME</Link>/<Link to="/" className="navigation-link">PLATES</Link>/<span className="navigation-link navigation-breadcrumb">{ title }</span>
            </div>
          </div>
          <div className="product-details row">
            <div className="col-8">
              <div className="product-details__image">
                <img src={'/media/' + image} alt={ title } />
              </div>
            </div>
            <div className="col-4">
              <div className="product-details__brand">
                { brand }
              </div>
              <div className="product-details__title">
                { title }
              </div>
              <div className="product-details__price type-price">
                {new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' }).format(price)}
              </div>
              <div className="product-details__description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat.
              </div>
              <hr />
              <div className="d-flex justify-content-center">
                <input type="text" value={total} onChange={this.onChange} className="product-details__cta__input" />
                <div className="d-flex flex-column">
                  <button id="cta-button-increment" onClick={this.addTotal} className="cta-button--secondary">+</button>
                  <button id="cta-button-decrement" onClick={this.removeTotal} className="cta-button--secondary">&ndash;</button>
                </div>
                <button className="cta-button--primary ml-4" type="submit" onClick={this.addToCart}>ADD TO CART</button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  product: state.product,
});

const mapDispatchToProps = dispatch => ({
  onAddToCart: (product, total) => dispatch(doCartAdd(product, total)),
  onFetchCategory: (products) => dispatch(doCategoryUpdate(products)),
});

const Product = connect(mapStateToProps, mapDispatchToProps)(ProductBase);

export default Product;
