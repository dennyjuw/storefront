const doCartAdd = (productInfo, total) => ({
  type: 'CART_ADD',
  payload: {
  	productInfo,
  	total,
  }
});

const doCartUpdate = (productInfo, total) => ({
  type: 'CART_UPDATE',
  payload: {
  	productInfo,
  	total,
  }
});

const doCartRemove = (productId) => ({
	type: 'CART_REMOVE',
	payload: { productId }
});

export { doCartAdd, doCartUpdate, doCartRemove };

