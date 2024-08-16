const mongoose = require("mongoose");
const bcrypt=require('bcrypt')
const Schema = mongoose.Schema;

const instructorSchema = new Schema(
  {
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

module.exports = mongoose.model("Instructor", instructorSchema);
