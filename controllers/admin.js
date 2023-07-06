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
    const product = new Product({
        title: title,
        price: price,
        description: description,
        imageUrl: imageUrl,
        userId: request.user
    });
    product
    .save()
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
    Product.findById(prodId)
    .then(product => {
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
    
    Product.findById(prodId).then(product => {
        product
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
    Product.findByIdAndRemove(prodId)
    .then(() => {
        console.log("Destroyed Product");
        response.redirect('/admin/products');
    })
    .catch(err => console.log(err));
}

exports.getProducts = (request, response, next) => {
    Product.find()
    // .select('title price -_id')
    // .populate('userId', 'name')
    .then(products => {
        console.log(products);
        response.render('admin/products', {
            prods: products,
            pageTitle: 'Admin Products',
            path: '/admin/products'
        });
    })
    .catch(err=> console.log(err));
};