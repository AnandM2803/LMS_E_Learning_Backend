const mongoose=require('mongoose')

const Schema=mongoose.Schema;

const adminSchema=new Schema({
    firstname:{type:String,required:true,minlength:4},
    lastName:{type:String,required:true,minlength:4},
    userName:{type:String,required:true,unique:true,lowercase:true,minlength:4},
    email:{type:String,required:true,unique:true,lowercase:true},
    password:{type:String,required:true,minlength:8,maxlength:20},
    phone:{type:Number,required:true,unique:true,minlength:10,maxlength:12},
    address:{type:String,required:true},
    role:{type:String,required:true,default:'admin'},
    avatar:{type:String,required:true,default:'avatar.webp'}
},{
    versionKey:false,
    timestamps:true,
});

const admin=mongoose.model('admin',adminSchema);
module.exports=admin;