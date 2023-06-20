const Product  = require ('../models/product');
const Cart = require ('../models/cart');
exports.getProducts = (request, response, next)=>{
    Product.fetchAll()
    .then(([rows])=> {
        response.render('shop/product-list',{
            prods: rows, 
            pageTitle: 'All Products', 
            path: '/products'
        })
    })
    .catch(err => console.log(err));
};

exports.getProduct = (request, response, next) => {
   const prodId = request.params.productId;
   Product.findById(prodId)
   .then(([product])=>{
    response.render('shop/product-detail', {
        product: product[0], //passing a single element as an array
        pageTitle: product.title,
        path: '/products'
    });
   })
   .catch(err => console.log(err));
}
exports.getIndex = (request, response, next) =>{
    Product.fetchAll()
    .then(([rows, fieldData])=> {
        response.render('shop/index',{
            prods: rows, 
            pageTitle: 'shop', 
            path: '/'
        })
    })
    .catch(err => console.log(err));
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



