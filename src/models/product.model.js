const { readFileSync, writeFileSync, unlinkSync } = require("fs");
const { join } = require("path");


const model = {
  productsPath: join(__dirname, "../database/products.json"),
  index: () => JSON.parse(readFileSync(model.productsPath)),
  findOne: (id) => model.index().find((product) => product.id == id),
  createOne: (product) => {
    const allProducts = model.index();
    product.id = Date.now();
    allProducts.push(product);
    writeFileSync(model.productsPath, JSON.stringify(allProducts));
  },
  modifyOne: (newProductData) => {
    const allProducts = model.index();
    const productIndex = allProducts.findIndex(
      (product) => product.id == newProductData.id
    );
    allProducts[productIndex].name = newProductData.name;
    allProducts[productIndex].price = newProductData.price;
    writeFileSync(model.productsPath, JSON.stringify(allProducts));
  },
  deleteOne: (id) => {
    const allProducts = model.index();
    const productToDelete_Index = allProducts.findIndex(
      (product) => product.id == id
    );
    try {
      unlinkSync(
        join(__dirname, "../../public", allProducts[productToDelete_Index].image)
      );
      console.log('File removed')
      allProducts.splice(productToDelete_Index, 1);
      writeFileSync(model.productsPath, JSON.stringify(allProducts));
    } catch(err) {
      console.error('Something wrong happened removing the file', err)
    }
  },
  searchProducts: (keywords) => {
    const allProducts = model.index();
    if(keywords != null){
      return allProducts.filter(product => product.name.toLowerCase().includes(keywords.toLowerCase()))
    }else{
      return [];
    }
  }
};

module.exports = model;
