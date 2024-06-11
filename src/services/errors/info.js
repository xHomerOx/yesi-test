export const generateProductsErrorInfo = (product) => {
  return `One ore more properties were not valid.
    List of required properties:
    * title: needs to be a String, received ${product.title}
    * description: needs to be a String, received ${product.description}
    * code: must be unique, received ${product.code}
    * price: needs to be a Number, received ${product.number}
    * status: needs to be a Boolean (true or false), received ${product.status}
    * stock: needs to be a Number, received ${product.stock}
    * category: needs to be a String, received ${product.category}`;
};

export const updateorDeleteProductsErrorInfo = (product) => {
  return `* id: not found, received ${product}`;
};
