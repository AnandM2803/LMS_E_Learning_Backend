const BaseController = require('./base.controller');
const CourseRepository = require('../repositories/course.repository');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage: storage }).single('courseImg');

class CourseController extends BaseController {
  constructor() {
    super(CourseRepository);
  }
  add = (req, res) => {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      const { courseName, author, courseRating, coursePrice, description, videoUrl, tabCourseDescription, tabCourseReview, tabCourseDiscussion, tabCourseResources, courseIndex, isPaidCourse } = req.body;
      const courseImg = req.file ? `uploads/${req.file.filename}` : '';

      try {
        const newCourse = await this.repo.create({
          courseName,
          author,
          courseRating,
          courseImg,
          coursePrice,
          description,
          videoUrl,
          tabCourseDescription,
          tabCourseReview,
          tabCourseDiscussion,
          tabCourseResources,
          courseIndex,
          isPaidCourse
        });
        res.status(201).json(newCourse);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });
  }
}

module.exports = new CourseController();
