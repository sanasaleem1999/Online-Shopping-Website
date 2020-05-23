const Product = require('../model/product');
const user = require("../model/user");
const Order = require("../model/order");
const mongoose = require('mongoose');


exports.addToCart = async (req,res,next)=>{
    const productId = req.params.id;
    console.log(productId)
    console.log(req.user);
    console.log("user com come")
    const loggedUser = req.user;
    console.log(loggedUser);
    req.user.addintoCart(productId).then(result=>{
        console.log('ye cart ka result hai' + result);
        console.log("product added to cart");
      //  res.redirect('/admin/');
    })

    console.log("in shop route");


}
// for displaying all crts
exports.getCart = (req,res,next)=>{
    req.user.populate("cart.items.productId").execPopulate().then(result=>{
        // console.log(result)
        const allCart = result.cart.items;
       // console.log(allCart)
        res.render('allCartProduct',{
            products: allCart,
            pageTitle:'cart display'
        })
    })  
}
 // for deleteing products

 exports.deleteCartItem = (req,res,next)=>{
    const prodId = req.params.id;

    req.user.deleteCartItems(prodId).then(result=>{
      //  console.log(result);
        res.redirect('/admin/display-carts');
    })
 }

 exports.searchProduct = (req,res,next)=>{
    const searchstr = req.query.search;   
       Product.find({$text:{$search : searchstr}}).exec((err,result)=>{
           if(err){
               console.log(err);
           }
           else{
               // console.log(result);
               res.render('skinCare.ejs',{
                   pageTitle:'search result',
                   items:result,
                   usermode:true
               })
           }
        })
}
 // for filtering

 exports.filterByBrand = (req,res,next)=>{
         const filter = req.query.brand;
         Product.find({brand:filter}).then(result=>{
            // console.log(result[0].image);
             res.render('skinCare.ejs',{
                 pageTitle:'Skin White products',
                 items:result,
                 usermode:true
             })
         })
 }
 exports.filterByCategory = (req,res,next)=>{
   const filter = req.query.category;
   console.log(filter)
   Product.find({category:filter}).then(result=>{
   // console.log(result[0].image);
       res.render('skinCare.ejs',{
           pageTitle:'Skin White products',
           items:result,
           usermode:true
       })
   })
}

exports.priceFilter = (req,res,next)=>{
     var lowerPrice = req.query.lower;
     var upperPrice = req.query.upper;
      console.log(upperPrice);
     lowerPrice = parseInt(lowerPrice);
     upperPrice = parseInt(upperPrice);    
     Product.find({price:{$gte : lowerPrice , $lte: upperPrice}}).then(result=>{
         res.render('skinCare.ejs',{
           pageTitle:'price filter',
           items:result,
           usermode:true
       })
     })  
}
exports.getMainPage = (req, res, next) => {
    res.render('mainpage');
}
exports.mainpage = (req, res, next) => {
    console.log('hello');
    Product.find().then(data => {
        console.log("got result");
        res.render('skinCare.ejs', {
            items: data,
            usermode: true
        })

    }).catch( err => {
        console.log(err);
    })
}
// for product details
exports.getProductDetails =  (req, res, next) =>{
    console.log('product details');
    const id = req.params.id;
    console.log(id);
     Product.findById(id).then(result=>{
        res.render('productDetail', {
            pageTitle: "Product Detail",
            items: result
        })
    });
    
}
  
