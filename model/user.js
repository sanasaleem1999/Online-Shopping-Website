const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({

    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },

    cart:{
        items:[{
            productId:{type:Schema.Types.ObjectId,
                ref:"Product",
                required:true},
            quantity:{type:Number,
                required:true}
        }]
    }
})

userSchema.methods.addintoCart = function(prodId){
    const getProductIndex = this.cart.items.findIndex((each)=>{
        return prodId.toString() === each.productId.toString()
    })
    const updatedCartitems = [...this.cart.items];
     if(getProductIndex >=0){
         const newQuantity = this.cart.items[getProductIndex].quantity +1;
         updatedCartitems[getProductIndex].quantity = newQuantity
     }
     else{
         updatedCartitems.push({
             productId: prodId,
             quantity: 1
         })
     }
     this.cart.items = updatedCartitems;

     return this.save();
}
userSchema.methods.deleteCartItems = function(prodId){
    const newcartProducts = this.cart.items.filter((each)=>{
        return prodId.toString() !== each.productId.toString();
    })
    this.cart.items = newcartProducts;
    return this.save();
}



module.exports = mongoose.model('User', userSchema);
