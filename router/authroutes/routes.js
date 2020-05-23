const express = require('express');

const router = express.Router();
const User = require('../../model/user');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('../../nodemon.json');

//get sign up page
router.get('/signup', (req, res, next) => {
    console.log('in sign up page');
    res.render('register',{
        pageTitle: 'sign up',
    })
})


//post sign up
router.post('/postsignup', (req, res, next) =>{
        var firstName = req.body.firstname;
        var lastName = req.body.lastname;
        var email = req.body.email;
        var password = req.body.password;
        console.log(email);
        User.findOne({email: email}).then(userdoc => {
            if(userdoc){
                return res.send('already user exists');
            } else{
                bcrypt.hash(password, 12).then(hashpassword => {
                    const user = new User(
                        { 
                            _id: mongoose.Types.ObjectId(),
                             firstname: firstName,
                             lastname: lastName,
                             email: email,
                             password: hashpassword,
                        }
                    )
                    return user.save()
                }).then( result => {
                    console.log(result);
                    console.log("successfully user created");
                    res.redirect('/');
             }).catch(err => {
                    console.log(err);
                    res.status(404).send(err);
                })
               
            }
        })
        
})//end of post signup


//post log in
router.post('/postlogin', async (req, res, next) => {

    try{
         const email = req.body.email;
         const password = req.body.password;
         const user = await User.findOne({email});
         if(!user){
             console.log("user not exist")
            // return res.send('no user found');
         }
         const match =  await bcrypt.compare(password, user.password)
         if(!match){
             console.log("password is incorrect")
            // res.status(400).send('please fill correct password');
         }
         const token = await jwt.sign({email}, process.env.JWT_KEY);
         if(!token){
            console.log("no token")
         }
         
             console.log(token);
             console.log(email, password);
             if(email === "ali@gmail.com");
             {
                res.status(200).json({usermode: false, token});
             } 

             //yh ab krna hai
          //   res.status(200).json({ usermode: true, token})
           
               
            
          
    

    } catch (err) {
        console.log(err);
    }

})






module.exports = router

