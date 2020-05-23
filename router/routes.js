const express = require('express');

const router = express.Router();

const adminController = require('../controller/admin');

const User = require('../model/user');
const shopController = require('../controller/shop');



//get signup form
router.get('/getsignup' , adminController.getSignupForm);


//post signup
router.post('/signup', adminController.postSignup );


//getcart
router.get('/add-to-cart/:id',shopController.addToCart);


//display karna hai
router.get('/display-carts',shopController.getCart);

//delate-carts
router.get('/delete-cart/:id',shopController.deleteCartItem )

//getform
router.get('/getForm', adminController.getForm);

//add product
router.post('/productsubmitted', adminController.addProduct);

//display product
router.get('/' , adminController.displayProduct);

//get form page for edit
router.get('/editproduct/:id', adminController.getFormForEdit );

//updated route
router.post('/updated/:prodId',adminController.updateProduct )


//deleteing product
router.get('/deleteproduct/:prodId',adminController.deleteProduct );

//search route
router.post('/search', adminController.searchProduct);




module.exports = router