const Product  = require ('../models/product');
exports.getAddProduct=(request, response, next) =>{ 

    response.render('admin/edit-product', {
        pageTitle: 'Add Product', 
        path: '/admin/add-product',
        editing: false
    });
};

exports.postAddProduct = (request, response, next)=>{
    const title = request.body.title;
    const imageUrl = request.body.imageUrl;
    const price = request.body.price;
    const description= request.body.description;
    const product = new Product(null,title, imageUrl, price, description);
    request.user
    .createProduct({
        title: title,
        price: price,
        imageUrl: imageUrl,
        description: description
    })
    .then(result => {
        //console.log(result);
        console.log("Created product");
        response.redirect('/admin/products');
    })
    .catch(err => {
        console.log(err);
    });
};

exports.getEditProduct=(request, response, next) =>{ 
    const editMode = request.query.edit;
    if(!editMode){
        return response.redirect('/');
    }
    const prodId = request.params.productId;  
    request.user.getProducts({where: {id : prodId}})
    //above line returns array now.
    // Product.findByPk(prodId)
    .then(products => {
        const product = products[0];
        if(!product){
            return response.redirect('/');
        }
        response.render('admin/edit-product', {
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            editing: editMode,
            product: product
        })
    })
};
//using the below action we'll remove the current product
//and replace it with new product.
exports.postEditProduct = (request, response, next) => {
    const prodId = request.body.productId;
    const updatedTitle = request.body.title;
    const updatedPrice = request.body.price;
    const updatedImageUrl = request.body.imageUrl;
    const updatedDesc = request.body.description;
    Product.findByPk(prodId)
    .then(product => {
        product.title = updatedTitle;
        product.price = updatedPrice;
        product.description = updatedDesc;
        product.imageUrl = updatedImageUrl;
        return product.save();
    })
    .then(result => {
        console.log('Updated Product');
        response.redirect('/admin/products');
    })
    .catch(err => console.log(err));
    
};

exports.postDeleteProduct = (request, response, next) => {
    const prodId = request.body.productId;
    Product.findByPk(prodId)
    .then(product => {
        return product.destroy();
    })
    .then(result => {
        console.log("Destoryed Product");
        response.redirect('/admin/products');
    })
    .catch(err => console.log(err));
}

exports.getProducts = (request, response, next) => {
    request.user
    .getProducts()
    .then(products => {
        response.render('admin/products', {
            prods: products,
            pageTitle: 'Admin Products',
            path: '/admin/products'
        });
    })
    .catch(err=> console.log(err));
};