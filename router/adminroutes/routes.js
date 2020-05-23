const express = require('express');

const router = express.Router();

const adminController = require('../../controller/admin');

const auth = require('../../router/authroutes/authverify');

const multer = require('multer');
const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error("file format not support"))
        }
        cb(undefined, true)
    }
})






//get signup form
router.get('/getsignup' , adminController.getSignupForm);


//post signup
router.post('/signup', adminController.postSignup );


//getcart


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

//upload image
router.get("/imageupload/:id",  adminController.imageUpload);

//post image
router.post("/postimage/:id", upload.single("uploadimage"), adminController.postImage)

//order now
router.post("/order/:id", auth, adminController.postOrder);

//get all orders
router.get("/checkorders", auth, adminController.getOrder);

//get order display page
router.get("/display-order", adminController.displayOrder)

module.exports = router