const mongoose=require('mongoose')
const bcrypt=require('bcrypt')

const instructorProfileSchema=new mongoose.Schema({

    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: Number, required: true },
    address: { type: String, required: true },  
})

instructorProfileSchema.pre('save',async function(next)
{
    if(!this.isModified('password')) return next();
    try{
        const salt=await bcrypt.genSalt(10);
        this.password=await bcrypt.hash(this.password,salt)
        next();
    }catch(err)
    {
        next(err);
    }
});

instructorProfileSchema.pre('findOneAndUpdate',async function(next)
{
    const update=this.getUpdate();
    if(update.password)
    {
try{
    const salt =await bcrypt.genSalt(10);
    update.password=await bcrypt.hash(update.password,salt);
}catch (err)
{
    return next(err);
}
    }
    next();
});

instructorProfileSchema.methods.comparePassword=async function(enteredPassword)
{
    return await bcrypt.compare(enteredPassword,this.password)
};

module.exports=mongoose.model('InstructorProfile',instructorProfileSchema)
