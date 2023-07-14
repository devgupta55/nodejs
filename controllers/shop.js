const Product  = require ('../models/product');
const Order = require ('../models/order');

exports.getProducts = (request, response, next)=>{
    Product.find()
    .then(products => {
        console.log(products);
        response.render('shop/product-list',{
            prods: products, 
            pageTitle: 'All Products', 
            path: '/products',
            isAuthenticated: request.isAuthenticated
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
            path: '/',
            isAuthenticated: request.isAuthenticated
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
        path: '/products',
        isAuthenticated: request.isAuthenticated
    });
   })
   .catch(err => console.log(err));
}


exports.getCart = (request, response, next) =>{
    request.user
    .populate('cart.items.productId')
    .then(user => {
        console.log(user.cart.items);
        const products = user.cart.items;
        response.render('shop/cart',{
            path: '/cart',
            pageTitle: "Your Cart",
            products: products,
            isAuthenticated: request.isAuthenticated
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
    .removeFromCart(prodId)
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
    request.user
    .populate('cart.items.productId')
    .then(user => {
        console.log(user.cart.items);
        const products = user.cart.items.map(i=>{
            return {
                quantity: i.quantity, 
                product: {...i.productId._doc}
            };
        });
        const order = new Order({
            user:{
                name: request.user.name,
                userId: request.user
            },
            products: products
        });
        return order.save();
    })
    .then(result => {
        return request.user.clearCart();
    })
    .then(()=>{
        response.redirect('/orders');
    })
    .catch(err => console.log(err));
};

exports.getOrders = (request, response, next) => {
    Order.find({'user.userId': request.user._id})
    .then(orders => {
        response.render('shop/orders', {
            path : "/orders",
            pageTitle : 'Orders',
            orders: orders,
            isAuthenticated: request.isAuthenticated
        })
    })
    .catch(err => console.log(err));
}



