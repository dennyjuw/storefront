const CATEGORY_INITIAL_STATE = {
  product: []
};

const storeAllProductInCategory = (state, action) => {
  const newState = { ...state };
  newState.product = action.payload;
  return newState;
}

function categoryReducer(state = CATEGORY_INITIAL_STATE, action) {
  switch(action.type) {
    case 'CATEGORY' : {
      return storeAllProductInCategory(state, action);
    }
    default : return state;
  }
}

export default categoryReducer;
