const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
require('../../nodemon.json');
const User = require('../../model/user');


module.exports = async (req, res, next)=>{
  const email = 'ali@gmail.com';
    try{
        const token = req.query.token;
        const id = req.params.id;
        if(token){
            console.log(token);
            const logUser = await User.find({ email: "ali@gmail.com"})
            const decode = jwt.verify(token, 'secret');
            console.log(decode + 'verify');
            if(email === decode.email){
               // res.redirect('/admin');
               req.user = logUser;
               req.token = token;
                next()
            }
            else{
                     const user = await User.find({email: decode.email});
                     console.log( 'simple user'+ user.email);
                      console.log(user + 'decoded');
                      req.user = user;
                      req.token = token;
                      next();
      
        
            }
          //  next();
        
        } else {
            alert('PLEASE LOGIN OR CREATE NEW ACCOUNT');
            res.redirect('/');
        }
        // console.log(token);
        // const decode = jwt.verify(token, 'secret');
        // console.log(decode + 'verify');
        // const user = await User.find({email: decode.email});
        // console.log(user + 'decoded');
        // req.user = user;
        // req.token = token;
       // next();
    } catch  (err) {
        console.log(err);
        res.status(404).send('auth failed');
    }

}