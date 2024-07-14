const mongosh=require('mongoose')


const UserSchema=new mongosh.Schema({
    name:String,
    email:String,
    age:Number
})

const Usermodel=mongosh.model("users",UserSchema)
module.exports=Usermodel