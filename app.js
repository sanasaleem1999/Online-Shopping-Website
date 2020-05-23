const express = require('express');
const path = require('path');
const multer = require('multer');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./model/user');

// shop controller
const shopController = require('./controller/shop');


// const fileStorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'images');

//     },

//     filename: (req, file, cb) => {
//         cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
//     }
// })


// const fileFilter = (req, file, cb) => {
//     if(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg'){
//         cb(null, true);
//     } else{
//         cb(null, false);
//     }
   

// }

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
//important but comment for now
//app.use(multer({storage: fileStorage , fileFilter: fileFilter}).single('image'));

//not important
//app.use('/styles', express.static('public/styles'));
//app.use(  express.static(path.join(__dirname, 'public/styles')));

app.use(express.static('public'));

const admin = require('./router/adminroutes/routes');
const shop = require('./router/shoproutes/routes');
const auth = require('./router/authroutes/routes');

app.use('/shop', shop);
app.use('/admin',admin);
app.use(auth);

// app.use(express.static(path.join(__dirname, '/public')));
//important but comment for Now
//app.use( '/images', express.static(path.join(__dirname, 'images')));


app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Method','GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Header','Content-Type, Authorization');
    next();
})

// app.use((req,res,next)=>{
//     User.findById('5e18cf50320652074471f72d').then(result=>{
//         req.user = result;
//         next();
//     })
// })

app.use('/',shopController.getMainPage)


app.set('view engine', 'ejs');
app.set('views', 'views');




mongoose.connect('mongodb+srv://sana:sana123@onlineapp-ulbra.mongodb.net/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, () =>{
    console.log("mongo connected");
    app.listen(3000, () => {               //we can also write 3000 as process.env.PORT || 3000
        console.log("server started");
    });
})


//app.set('views', 'ejs')