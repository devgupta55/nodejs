const Product  = require ('../models/product');
//const Cart = require ('../models/cart');

exports.getProducts = (request, response, next)=>{
    Product.find()
    .then(products => {
        console.log(products);
        response.render('shop/product-list',{
            prods: products, 
            pageTitle: 'All Products', 
            path: '/products'
        })
    })
    .catch(err => console.log(err));
};

exports.getIndex = (request, response, next) =>{
    Product.find()
    .then(products => {
        response.render('shop/index',{
            prods: products, 
            pageTitle: 'shop', 
            path: '/'
        })
    })
    .catch(err => console.log(err));
};

exports.getProduct = (request, response, next) => {
   const prodId = request.params.productId;
   Product.findById(prodId)
   .then(product=>{
    response.render('shop/product-detail', {
        product: product, 
        pageTitle: product.title,
        path: '/products'
    });
   })
   .catch(err => console.log(err));
}


exports.getCart = (request, response, next) =>{
    request.user
    .getCart()
    .then(products => {
        response.render('shop/cart',{
            path: '/cart',
            pageTitle: "Your Cart",
            products: products
        });
    })
    .catch(err => console.log(err));
}

exports.postCart = (request, response, next) => {
    const prodId = request.body.productId;
    Product.findById(prodId)
    .then(product => {
        return request.user.addToCart(product);
    })
    .then(result => {
        console.log(result);
        response.redirect('/cart');
    })
    .catch(err => {
        console.log(err);
    });
}

exports.deleteCartProduct= (request, response, next) =>{
    const prodId = request.body.productId;
    request.user
    .deleteItemFromCart(prodId)
    .then(result => {
        response.redirect('/cart');
    })
    .catch(err => console.log(err));
}

// exports.getCheckout = (request, response, next) =>{
//     response.render('shop/checkout', {
//         path: "/checkout",
//         pageTitle: 'Checkout'
//     })
// }

exports.postOrder = (request, response, next) => {
    let fetchedCart;
    request.user
    .addOrder()
    .then(result => {
        response.redirect('/orders');
    })
    .catch(err => console.log(err));
  };

exports.getOrders = (request, response, next) => {
    request.user
    .getOrders()
    .then(orders => {
        response.render('shop/orders', {
            path : "/orders",
            pageTitle : 'Orders',
            orders: orders
        })
    })
    .catch(err => console.log(err));
   
}



