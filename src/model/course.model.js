const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const courseSchema = new Schema({
  courseName: { type: String, required: true },
  author: { type: String, required: true },
  courseRating: { type: String, required: true },
  courseImg: { type: String, required: true },
  coursePrice: { type: Number, required: true },
  isPaidCourse: { type: Boolean, required: true, default: true },
  description: { type: String, required: true },
  videoUrl: { type: String, required: true },
  tabCourseDescription: { type: String, required: true },
  tabCourseReview: { type: String, required: true },
  tabCourseDiscussion: { type: String, required: true },
  tabCourseResources: { type: String, required: true },
  courseIndex: [{
    sectionName: { type: String, required: true },
    chapterName: { type: [], required: true, default: [] },
    videoLinks: { type: [], required: true, default: [] }
  }],
}, { versionKey: false, timestamps: true });

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
