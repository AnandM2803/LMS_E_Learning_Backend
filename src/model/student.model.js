const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  firstName: { type: String, required: true, minlength: 4 },
  lastName: { type: String, required: true, minlength: 4 },
  userName: { type: String, required: true, minlength: 4 },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, minlength: 8 },
  phone: { type: Number, required: true, unique: true, minlength: 10, maxlength:12 },
  address: { type: String, required: true },
  role: { type: String, required: true, default: 'student' },
  avatar: { type: String, required: true, default: 'avatar.webp' },
  enrolledCourses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
}, { versionKey: false, timestamps: true });

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
