const mongoose = require("mongoose");
const bcrypt=require('bcrypt')
const Schema = mongoose.Schema;

const instructorSchema = new Schema(
  {
    firstName: { type: String, reuired: true },
    lastName: { type: String, required: true },
    email: {type:String,required:true,unique:true},
    password:{type:String,required:true},
    phone:{type:Number,required:true},
    address:{type:String,required:true},
    vote: { type: String, required: true },
    day: { type: [String], required: true },
    price: { type: Number, required: true },
    mentorName: { type: String, required: true },
    technologyName: { type: String, required: true },
    ratings: { type: Number, required: true },
    location: { type: String, required: true },
    photoUrl: { type: String, required: true },
    aboutMe: { type: String, required: true },
    timings: {
        Monday: { type: [String], default: [] },
        Tuesday: { type: [String], default: [] },
        Wednesday: { type: [String], default: [] },
        Thursday: { type: [String], default: [] },
        Friday: { type: [String], default: [] },
        Saturday: { type: [String], default: [] },
        Sunday: { type: [String], default: [] }
      }
  },
  { versionKey: false, timestamps: true }
);

instructorSchema.pre('save',async function(next)
{
    if(!this.isModified('password')) return next();
    try{
        const salt=await bcrypt.genSalt(10);
        this.password=await bcrypt.hash(this.password,salt);
        next();
    } catch(err)
    {
        next(err);
    }
});

instructorSchema.methods.comparePassword=async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword,this.password);
};

module.exports = mongoose.model("Instructor", instructorSchema);
