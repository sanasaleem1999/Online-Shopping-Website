const path = require('path');
const fs = require('fs');
const Product = require('../model/product');
const User = require('../model/user');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const Order = require("../model/order");


//getsignup form
exports.getSignupForm = (req, res, next) => {
    res.render('signup', {
        pageTitle: 'signup',
    })
    console.log('get signup complete');
}

//post signup
exports.postSignup = (req, res,next) => {
    var email = req.body.email;
    var password = req.body.password;
    console.log(password);
    User.findOne({email: email}).then(userdoc => {
        if(userdoc){
            return res.send('already user exists');
        } else{
            bcrypt.hash(password, 12).then(hashpassword => {
                const user = new User(
                    { 
                        _id: mongoose.Types.ObjectId(),
                         email: email,
                         password: hashpassword,
                    }
                )
                return user.save()
            }).then( result => {
                console.log(result);
                console.log("successfully user created");
            }).catch(err => {
                console.log(err);
                res.status(404).send(err);
            })
           
        }
    })
   
}

//get login form


//get form
exports.getForm = (req,res,next)=>{
    res.render('addProduct',{
        editMode: false
    });

}

//adding product details
exports.addProduct = async(req, res, next) => {
    console.log("in add route")
    const name = req.body.name;
    const category = req.body.category;
    const brand = req.body.brand;
    const price = req.body.price;
    const benefits = req.body.benefits;
    console.log(req.body);
    console.log(name, category, brand, price, benefits)
    try {
           const product = new Product({
               name: name,
               category: category,
               brand: brand,
               price: price,
               benefits: benefits,
           })
          await  product.save();
        //   console.log(product + "added")
          res.status(200).json({msg: "Product Added Successfully"});
    } catch(err){
        res.status(404).send(err);
    }
}

//get form for image
exports.imageUpload = (req, res, next) => {
    console.log("image uploading page");
    const id = req.params.id;
    console.log(id);
    res.render('fileupload', {
        key: id,
        pageTitle: "Image Upload"
    })
}

//post image
exports.postImage = async (req, res, next) => {
    const id = req.params.id;
    console.log(id);
    const image = req.file;
    Product.findById(id).then( result => {
        console.log(result);
        const picture = req.file.buffer;
        const imgStr = Buffer.from(picture).toString('base64');
        var base64Flag = 'data:image/jpeg;base64,';
        result.image = base64Flag + imgStr;
        result.save();
        console.log("result Saved");
        res.status(200).send({ msg: "Image Added"})
    }).catch(err => {
        console.log(err);
    })

}

//displaying products 
exports.displayProduct = (req, res, next) => {
         console.log("display");
     const productFromDb = Product.find().then( result => {
      //   console.log(result + "hello jee");
        res.render('skinCare', {
            pageTitle: "Products",
            items: result,
            usermode:false
    
        })
    }).catch(err => {
        console.log(err);
    })
   
}

//get form for edit
exports.getFormForEdit = (req, res, next) => {
    console.log('edit form');
   const productId = req.params.id;
   console.log(productId);
   try{
    Product.findById(productId).then( result => {
    //  console.log(result);
      res.render('addProduct', {
           item: result,
           pageTitle: "Edit Product",
           editMode:true
      })
  })
   } catch(err){
       res.status(400).send(err);
   }
}

//update product
exports.updateProduct = (req, res, next) => {
    const id = req.params.prodId;
    const updatedname = req.body.name;
    const updatedPrice = req.body.price;
    const updatedCategory = req.body.category;
    const updatedBrand = req.body.brand;
    const updatedBenefits = req.body.benefits;
   // const imageStatus = image.path;
   Product.findByIdAndUpdate(id, {
       name:updatedname,
       category:updatedCategory,
       brand:updatedBrand,
       price:updatedPrice,
       benefits: updatedBenefits,
    //    if(imageUrl){
    //      image = imageUrl.path;
    //    }
   },{new:true},(result)=>{
       res.send('done');
   });
}


//delete product
exports.deleteProduct = (req,res,next) =>{
    const id = req.params.prodId;
    Product.findByIdAndRemove(id).then((result)=>{
       //   console.log(result);
          console.log("deleted");
          res.redirect('/admin/');
    })
}

//search bar
exports.searchProduct = (req, res, next) => {
    const searchItem = req.body.search;
    console.log(searchItem);
    Product.find({category: searchItem}).then(result=>{
       // console.log(result + "searche successfully");
    }).catch(err => {
        console.log(err);
    })

}


//for order
exports.postOrder = (req, res, next) => {
    console.log("post order");
    const id = req.params.id;
    const date = req.body.today;
    const loggedUser = req.user;
    console.log(loggedUser);
    const email = req.user[0].email
    console.log(email)
    const order = new Order({
        _id: mongoose.Types.ObjectId(),
        product: id,
        date: date,
        email: email
    })
    order.save().then(data => {
        console.log("Order saved");
        console.log(data);
        console.log("data");
    }).catch(err => {
        console.log(err);
    })


}

//get all orders
exports.getOrder = (req, res, next) => {
    console.log("get order");
    Order.find().then(result => {
        console.log(result);
        console.log("result");
        const user = req.user;
        console.log(user);
        console.log("user");
        res.status(200).json({ msg: "Orders checked"})
    }).catch(err => {
        console.log(err);
    })
}

//display order
exports.displayOrder = (req, res, next) => {
    console.log("display order");
}




