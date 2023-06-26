const express = require('express');
const router = express.Router(); //this is mini express app pluggable to another express app
const path = require('path');

const adminController = require('../controllers/admin');
// /admin/add-product => GET
router.get('/add-product',adminController.getAddProduct);

router.post('/add-product', adminController.postAddProduct);

// router.get('/products', adminController.getProducts);

// router.get('/edit-product/:productId', adminController.getEditProduct);

// router.post('/edit-product', adminController.postEditProduct);

// router.post('/delete-product', adminController.postDeleteProduct);
module.exports = router;