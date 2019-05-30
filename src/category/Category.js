import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import find from 'lodash/find';
import './Category.scss';

import { connect } from 'react-redux';
import { doCartAdd } from '../redux/actions/cartUpdate';
import { doCategoryUpdate } from '../redux/actions/categoryUpdate';

class CategoryBase extends Component {
	constructor(props) {
		super(props);
		this.state = { items: [] };
	}

	fetchCategory(url) {
		fetch(url)
			.then(res => {
				return res.json();
			})
			.then(res => {
				this.setState({ items : res });
				this.props.onFetchCategory(res);
			});
	}

	componentDidMount() {
		this.fetchCategory('/products.json');
	}

	addToCart(id) {
		const productToAdd = find(this.state.items, { id });
		this.props.onAddToCart(productToAdd, 1)
	}

	render() {
		const { items } = this.state;

		if (!items) {
			return <p>Loading ...</p>;
		} else {
			return (
				<div className="category">
					<div className="category-heading">
						<div className="category-heading-description">
              <h1><span>Plates</span></h1>
              <hr />
							<div>
								<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat.</p>
							</div>
						</div>
					</div>

					<div className="container">
						<div className="col d-flex justify-content-center flex-wrap">
							{items.map((item, index) => (
								<div className="product" key={index}>
									<div className="image">
										<img src={'/media/' + item.image} alt={item.title} />
										<div className="image__quicklink">
											<Link to={'/product/' + item.id} className="cta-button--primary--condensed">VIEW DETAILS</Link>
											<button onClick={() => this.addToCart(item.id)} className="cta-button--primary-alt--condensed mt-4">ADD TO CART</button>
										</div>
									</div>
									<div className="product__brand">{item.brand}</div>
									<Link to="">
										<div className="product__title">{(item.title).toUpperCase()}</div>
									</Link>
									<div className="product__price type-price type-font-size-14">
										{new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' }).format(item.price)}
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			);
		}
	}
}

const mapDispatchToProps = dispatch => ({
  onAddToCart: (product, total) => dispatch(doCartAdd(product, total)),
  onFetchCategory: (products) => dispatch(doCategoryUpdate(products)),
});

const Category = connect(null, mapDispatchToProps)(CategoryBase);

export default Category;
