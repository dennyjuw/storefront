import { combineReducers } from 'redux';
import cartReducer from './cartReducer';
import categoryReducer from './categoryReducer';

const rootReducer = combineReducers({  
  cart: cartReducer,
  product: categoryReducer,
});

export default rootReducer;