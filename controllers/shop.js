const Product  = require ('../models/product');
const Cart = require ('../models/cart');
exports.getProducts = (request, response, next)=>{
    Product.fetchAll(products =>{
        response.render('shop/product-list',{
            prods: products, 
            pageTitle: 'All Products', 
            path: '/products', 
        });
    });
};

exports.getProduct = (request, response, next) => {
    const prodId= request.params.productId;
    Product.findById(prodId, product => {
        response.render('shop/product-detail', {
            product: product,
            pageTitle: product.title, 
            path: '/products'
        });
    });
}
exports.getIndex = (request, response, next) =>{
    Product.fetchAll(products =>{
        response.render('shop/index',{
            prods: products, 
            pageTitle: 'shop', 
            path: '/', 
        });
    });
};

exports.getCart = (request, response, next) =>{
    Cart.getCart(cart => {
        Product.fetchAll(products => {
            const cartProducts = [];
            for(product of products) {
                const cartProductData = cart.products.find(prod => prod.id === product.id)
                if(cartProductData){
                    cartProducts.push({productData: product, qty: cartProductData.qty });
                }
            }
            response.render('shop/cart',{
                path: '/cart',
                pageTitle: "Your Cart",
                products: cartProducts
            });
        });
    });
    
}

exports.postCart = (request, response, next) =>{
    const prodId = request.body.productId;
    Product.findById(prodId, (product) =>{
        Cart.addProduct(prodId, product.price)

    });
    response.redirect('/cart');
};

exports.deleteCartProduct= (request, response, next) =>{
    const prodId = request.body.productId;
    Product.findById(prodId, product =>{
        Cart.deleteProduct(prodId, product.price);
        response.redirect('/cart');
    })
}

exports.getCheckout = (request, response, next) =>{
    response.render('shop/checkout', {
        path: "/checkout",
        pageTitle: 'Checkout'
    })
}

exports.getOrders = (request, response, next) => {
    response.render('shop/orders', {
        path : "/orders",
        pageTitle : 'Orders'
    })
}



