const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User', //referring to user model.
    required: true
  }
});

module.exports = mongoose.model('Product', productSchema);


// const { get } = require('lodash');
// const mongodb = require ('mongodb');

// class Product {
//   constructor(title, price, description, imageUrl, id, userId){
//     this.title = title;
//     this.price = price;
//     this.description = description;
//     this.imageUrl = imageUrl;
//     this._id = id ? new mongodb.ObjectId(id): null;
//     this.userId = userId;
//   }

//   save() {
//     let dbOp; //db operation
//     const db = getDb(); //connection that allows to interact with the database
//     if(this._id) {
//       //update the product
//       dbOp = db
//       .collection('products')
//       .updateOne(
//         {_id: this._id}, 
//         {$set: this}
//       );
//     }
//     else{
//       dbOp = db
//       .collection('products')
//       .insertOne(this)

//     }
//     return dbOp
//     .then(result => {
//       console.log(result);
//     })
//     .catch(err => console.log(err));
//   }

//   static fetchAll() {
//     const db = getDb();
//     return db.collection('products').find().toArray()
//     .then(products => {
//       console.log(products);
//       return products;
//     })
//     .catch(err => console.log(err));
//   }

//   static findById(prodId){
//     const db = getDb();
//     return db.collection('products')
//     .find({_id: new mongodb.ObjectId(prodId)})
//     .next()
//     .then(product => {
//       console.log(product);
//       return product;
//     })
//     .catch(err => console.log(err));
//   }

//   static deleteById(prodId){
//     const db = getDb();
//     return db.collection('products').deleteOne({_id: new mongodb.ObjectId(prodId)})
//     .then(() => {
//       console.log("Deleted the Product");
//     })
//     .catch(err => console.log(err));
//   }
  
// }

// module.exports= Product;