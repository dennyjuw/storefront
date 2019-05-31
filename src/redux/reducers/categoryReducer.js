const CATEGORY_INITIAL_STATE = [];

const storeAllProductInCategory = (state, action) => {
  return action.payload;
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
