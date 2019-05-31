import React from 'react';
import { shallow, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import Product, { ProductBase } from './Product';

describe('Product', () => {
	let props;
	let propsNotEmpty

  beforeEach(() => {
    props = {
      match: {
      	params: { id: 1 }
      },
      product: []
    };

    propsNotEmpty = {
    	match: {
      	params: { id: 1 }
      },
      product: [
        { id: 1, title: 'test product' }
      ]
    };
  });

	it('renders without crashing', () => {
	  shallow(<ProductBase { ...props } />);
	});

	describe('fetchCategory', () => {
		it('should fetch the category', () => {
	    const mockJsonPromise = Promise.resolve([{ id: 1, title: 'test product' }, { id: 2, title: 'test product 2'}]);
	    const mockFetchPromise = Promise.resolve({ json: () => mockJsonPromise });
	    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
	    const onFetchCategory = jest.fn();

	    // use propsNotEmpty to make sure fetchCategory is not called initially
	    const wrapper = shallow(<ProductBase { ...propsNotEmpty } onFetchCategory={onFetchCategory} />);

	    wrapper.instance().fetchCategory();

	    expect(global.fetch).toHaveBeenCalledTimes(1);
	    expect(global.fetch).toHaveBeenCalledWith('/products.json');

	    process.nextTick(() => {
	     	expect(wrapper.state('product')).toEqual([{ id: 1, title: 'test product' }, { id: 2, title: 'test product 2'}]);
	    	expect(onFetchCategory).toHaveBeenCalled();

	      global.fetch.mockClear();
	    });
		});
	});

	describe('componentWillMount', () => {
		let spy;

		beforeEach(() => {
			spy = jest.spyOn(ProductBase.prototype, 'fetchCategory');
		});

		afterEach(() => {
		  spy.mockClear()
		});

		it('should call fetchCategory when product is empty', () => {
			const wrapper = shallow(<ProductBase { ...props } />);
			expect(spy).toHaveBeenCalled();
		})

		it('should not call fetchCategory when product is not empty', () => {
			const wrapper = shallow(<ProductBase { ...propsNotEmpty } />);
			expect(spy).not.toHaveBeenCalled();
		})
	});

	it('should set product info in state', () => {
		const wrapper = shallow(<ProductBase { ...propsNotEmpty } />);
		wrapper.instance().getProductInfo();
		const productInfoState = wrapper.state('productInfo');
		expect(productInfoState).toEqual({ id: 1, title: 'test product' });
	})

	describe('update product quantity in state', () => {
		let wrapper;

		beforeEach(() => {
			wrapper = shallow(<ProductBase { ...propsNotEmpty } />);
		});

		it('should increment product quantity in state', () => {
			wrapper.find('button#cta-button-increment').simulate('click', { preventDefault() {} });
			expect(wrapper.state('total')).toEqual(2);

			wrapper.setState({ total: '' });
			wrapper.find('button#cta-button-increment').simulate('click', { preventDefault() {} });
			expect(wrapper.state('total')).toEqual(1);
		});

		it('should decrement product quantity in state', () => {
			wrapper.find('button#cta-button-increment').simulate('click', { preventDefault() {} });
			wrapper.find('button#cta-button-increment').simulate('click', { preventDefault() {} });
			wrapper.find('button#cta-button-decrement').simulate('click', { preventDefault() {} });
			expect(wrapper.state('total')).toEqual(2);
		});

		it('should update quantity from input field', () => {
			wrapper.find('input').simulate('change', { target: { value: 10 } });
			expect(wrapper.state('total')).toEqual(10);
		});
	});

	it('should call addOnToCart', () => {
		const onAddToCart = jest.fn();
		const wrapper = shallow(<ProductBase { ...propsNotEmpty } onAddToCart={onAddToCart} />);
		wrapper.find('input').simulate('change', { target: { value: 5 } });
		wrapper.find('button.cta-button--primary').simulate('click', { preventDefault() {} });
		expect(onAddToCart).toHaveBeenCalled();
	});

  describe('connected component', () => {
    const mockStore = configureMockStore();
    const initialState = { product: [{ id: 1, title: 'test product mock'}] };
    let store;

    beforeEach(() => {
      store = mockStore(initialState);
    });

    it('should map state from mapStateToProps', () => {
      const wrapper = shallow(<Product store={ store }/>);
      expect(wrapper.props().children.props.product).toEqual([{ id: 1, title: 'test product mock'}]);
    });
  });
});
