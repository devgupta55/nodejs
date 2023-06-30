const Product  = require ('../models/product');
//const Cart = require ('../models/cart');

exports.getProducts = (request, response, next)=>{
    Product.fetchAll()
    .then(products => {
        response.render('shop/product-list',{
            prods: products, 
            pageTitle: 'All Products', 
            path: '/products'
        })
    })
    .catch(err => console.log(err));
};

exports.getIndex = (request, response, next) =>{
    Product.fetchAll()
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

// exports.deleteCartProduct= (request, response, next) =>{
//     const prodId = request.body.productId;
//     request.user.getCart()
//     .then(cart => {
//         return cart.getProducts({where: {id: prodId}});
//     })
//     .then(products => {
//         const product = products[0];
//         return product.cartItem.destroy();
//     })
//     .then(result => {
//         response.redirect('/cart');
//     })
//     .catch(err => console.log(err));
// }

// exports.getCheckout = (request, response, next) =>{
//     response.render('shop/checkout', {
//         path: "/checkout",
//         pageTitle: 'Checkout'
//     })
// }

// exports.postOrder = (request, response, next) => {
//     let fetchedCart;
//     request.user
//       .getCart()
//       .then(cart => {
//         fetchedCart = cart;
//         return cart.getProducts();
//       })
//       .then(products => {
//         return request.user
//           .createOrder()
//           .then(order => {
//             return order.addProducts(
//               products.map(product => {
//                 product.orderItem = { quantity: product.cartItem.quantity };
//                 return product;
//               })
//             );
//           })
//           .catch(err => console.log(err));
//       })
//       .then(result => {
//         return fetchedCart.setProducts(null);
//       })
//       .then(result => {
//         response.redirect('/orders');
//       })
//       .catch(err => console.log(err));
//   };

// exports.getOrders = (request, response, next) => {
//     request.user.getOrders({include: ['products']})
//     .then(orders => {
//         response.render('shop/orders', {
//             path : "/orders",
//             pageTitle : 'Orders',
//             orders: orders
//         })
//     })
//     .catch(err => console.log(err));
   
// }



