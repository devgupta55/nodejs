const fs = require('fs');
const path = require('path');

const Cart = require('./cart');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsfromFile =  (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    }
    else{
        cb(JSON.parse(fileContent));
    }
  });
}

module.exports = class Product {
  constructor(id, title, imageUrl, price, description ) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsfromFile(products => {
      if(this.id){
        const existingProductsIndex = products.findIndex(prod => prod.id === this.id);
        const updatedProducts= [...products];
        updatedProducts[existingProductsIndex] = this;
        fs.writeFile(p, JSON.stringify(updatedProducts), err => {
          console.log(err);
      });
      } 
      else {
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), err => {
          console.log(err);
        });
      }
    });
  };

  static deleteById(id) {
    getProductsfromFile(products => {
      const product = products.find(prod => prod.id ===id);
      //storing rest of the products other than the product whose id is mentioned
      const updatedProducts = products.filter(prod => prod.id !== id);
      fs.writeFile(p, JSON.stringify(updatedProducts), err => {
        if(!err) {
          Cart.deleteProduct(id, product.price);
        }
      })
    });
  }
  static fetchAll(cb) {
    getProductsfromFile(cb);
    
  }

  static findById (id, cb){
    getProductsfromFile(products => {
      const product = products.find(p => p.id === id);
      cb (product);
    });
  }
};
