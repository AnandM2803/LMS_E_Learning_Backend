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
  chapterVideoLinks: {
    type: [String],
    required: true,
  },
  chapter1Name: {
    type: String,
    required: true,
  },
  chapter1VideoName: {
    type: String,
    required: true,
  },
  chapter2Name: {
    type: String,
    required: true,
  },
  chapter2VideoName: {
    type: String,
    required: true,
  },
  chapter3Name: {
    type: String,
    required: true,
  },
  chapter3VideoName: {
    type: String,
    required: true,
  },
  chapter4Name: {
    type: String,
    required: true,
  },
  chapter4VideoName: {
    type: String,
    required: true,
  },
  chapter5Name: {
    type: String,
    required: true,
  },
  chapter5VideoName: {
    type: String,
    required: true,
  },
  chapter6Name: {
    type: String,
    required: true,
  },
  chapter6VideoName: {
    type: String,
    required: true,
  },
  chapter7Name: {
    type: String,
    required: true,
  },
  chapter7VideoName: {
    type: String,
    required: true,
  },
  chapter8Name: {
    type: String,
    required: true,
  },
  chapter8VideoName: {
    type: String,
    required: true,
  },
}, { versionKey: false, timestamps: true });

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
