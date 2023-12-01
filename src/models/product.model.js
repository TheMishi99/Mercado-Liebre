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
    writeFileSync(model.productsPath, JSON.stringify(allProducts, null, 2));
  },
  modifyOne: (newProductData) => {
    const allProducts = model.index();
    const productIndex = allProducts.findIndex(
      (product) => product.id == newProductData.id
    );
    if(allProducts[productIndex].image != newProductData.image){
      if(allProducts[productIndex].image != "/images/products/default.jpg"){
        try {
          unlinkSync(
            join(__dirname, "../../public", allProducts[productIndex].image)
          );
          console.log('File removed')
        } catch(err) {
          console.error('Something wrong happened removing the file', err)
        }
      }
    }
    allProducts[productIndex].name = newProductData.name;
    allProducts[productIndex].price = newProductData.price;
    allProducts[productIndex].image = newProductData.image;
    writeFileSync(model.productsPath, JSON.stringify(allProducts, null, 2));
  },
  deleteOne: (id) => {
    const allProducts = model.index();
    const productToDelete_Index = allProducts.findIndex(
      (product) => product.id == id
    );
    if(allProducts[productToDelete_Index].image != "/images/products/default.jpg"){
      try {
        unlinkSync(
          join(__dirname, "../../public", allProducts[productToDelete_Index].image)
        );
        console.log('File removed')
      } catch(err) {
        console.error('Something wrong happened removing the file', err)
      }
    }
    allProducts.splice(productToDelete_Index, 1);
    writeFileSync(model.productsPath, JSON.stringify(allProducts, null, 2));
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
