const express = require('express');

const router = express.Router();

//const User = require('../model/user');
const shopController = require('../../controller/shop');

const auth = require('../authroutes/authverify');


//display product
router.get('/' ,auth,shopController.mainpage);

// add to cart
router.get('/add-to-cart/:id',auth, shopController.addToCart);


//display karna hai
router.get('/display-carts',shopController.getCart);

//delate-carts
router.get('/delete-cart/:id',shopController.deleteCartItem )

//search route
// router.post('/search',shopController.searchProduct);
// for get routes
router.get('/search',shopController.searchProduct);

// //filter
 router.get('/brand-filtter',shopController.filterByBrand);

// //filter by category
router.get('/category-filter',shopController.filterByCategory);

// //product-details
//  router.get('/productdetails/:id', shopController.getProductDetails)

 // filter by price

router.get('/price-filter',shopController.priceFilter);
// //product-details
router.get('/productdetails/:id', shopController.getProductDetails);



module.exports = router;