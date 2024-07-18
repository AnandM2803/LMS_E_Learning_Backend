const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  firstName: { type: String, required: true, minlength: 4 },
  lastName: { type: String, required: true, minlength: 4 },
  userName: { type: String, required: true, minlength: 4 },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, minlength: 8 },
  phone: { type: Number, required: true, unique: true, minlength: 10, maxlength: 12 },
  address: { type: String, required: true },
  role: { type: String, required: true, default: 'student' },
  avatar: { type: String, required: true, default: 'avatar.webp' },
  enrolledCourses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
}, { versionKey: false, timestamps: true });

studentSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    return next(error);
  }
});

studentSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
