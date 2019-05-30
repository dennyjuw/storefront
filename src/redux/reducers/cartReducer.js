import findIndex from 'lodash/findIndex';
import remove from 'lodash/remove';

const CART_INITIAL_STATE = {
  cart: []
};

const storeProductInCart = (state, action) => {
  const newState = { ...state };
  const productIndex = findIndex(newState.cart, { id: action.payload.productInfo.id });

  if (productIndex !== -1) {
    newState.cart[productIndex].total = newState.cart[productIndex].total + action.payload.total;
  } else {
    newState.cart.push(action.payload.productInfo);
    newState.cart[newState.cart.length - 1].total = action.payload.total;
  }

  return newState;
}

const updateProductInCart = (state, action) => {
  const newState = { ...state };
  const productIndex = findIndex(newState.cart, { id: action.payload.productInfo.id });

  if (productIndex !== -1) {
    newState.cart[productIndex].total = action.payload.total;
  }

  return newState;
}

const removeProductFromCart = (state, action) => {
  const newState = { ...state };
  const productIndex = findIndex(newState.cart, { id: action.payload.productId });

  if (productIndex !== -1) {
    remove(newState.cart, { id: action.payload.productId });
  }

  return newState;
}

function cartReducer(state = CART_INITIAL_STATE, action) {
  switch(action.type) {
    case 'CART_ADD': {
      return storeProductInCart(state, action);
    }
    case 'CART_UPDATE': {
     return updateProductInCart(state, action); 
    }
    case 'CART_REMOVE': {
      return removeProductFromCart(state, action);
    }
    default : return state;
  }
}

export default cartReducer;
