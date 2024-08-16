const BaseController = require('./base.controller');
const CourseRepository = require('../repositories/course.repository');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).fields([
  { name: 'courseImg', maxCount: 1 },
  { name: 'authorImage', maxCount: 1 }
]);

class CourseController extends BaseController {
  constructor() {
    super(CourseRepository);
  }

  add = (req, res) => {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      console.log('Request Body:', req.body);

      const {
        courseName,
        author,
        courseRating,
        coursePrice,
        description,
        videoUrl,
        tabCourseDescription,
        tabCourseReview,
        tabCourseDiscussion,
        tabCourseResources,
        isPaidCourse,
        aboutCourseDescription,
        chapterVideoLinks,
        chapter1Name,
        chapter1VideoName,
        chapter2Name,
        chapter2VideoName,
        chapter3Name,
        chapter3VideoName,
        chapter4Name,
        chapter4VideoName,
        chapter5Name,
        chapter5VideoName,
        chapter6Name,
        chapter6VideoName,
        chapter7Name,
        chapter7VideoName,
        chapter8Name,
        chapter8VideoName,
      } = req.body;

      let courseImg = '';
      let authorImage = '';

      try {
        if (req.files && req.files['courseImg']) {
          const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream({
              public_id: uuidv4(),
              resource_type: 'auto'
            }, (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            });
            streamifier.createReadStream(req.files['courseImg'][0].buffer).pipe(uploadStream);
          });
          courseImg = result.secure_url;
          console.log('CourseImage URL:', courseImg);
        }

        if (req.files && req.files['authorImage']) {
          const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream({
              public_id: uuidv4(),
              resource_type: 'auto'
            }, (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            });
            streamifier.createReadStream(req.files['authorImage'][0].buffer).pipe(uploadStream);
          });
          authorImage = result.secure_url;
          console.log('AuthorImage URL:', authorImage);
        }

        try {
          const parsedChapterVideoLinks = JSON.parse(chapterVideoLinks);
          const newCourse = await this.repo.create({
            courseName,
            author,
            courseRating,
            courseImg,
            authorImage,
            coursePrice,
            description,
            videoUrl,
            tabCourseDescription,
            tabCourseReview,
            tabCourseDiscussion,
            tabCourseResources,
            isPaidCourse,
            aboutCourseDescription,
            chapterVideoLinks: Array.isArray(parsedChapterVideoLinks) ? parsedChapterVideoLinks : [parsedChapterVideoLinks],
            chapter1Name,
            chapter1VideoName,
            chapter2Name,
            chapter2VideoName,
            chapter3Name,
            chapter3VideoName,
            chapter4Name,
            chapter4VideoName,
            chapter5Name,
            chapter5VideoName,
            chapter6Name,
            chapter6VideoName,
            chapter7Name,
            chapter7VideoName,
            chapter8Name,
            chapter8VideoName,
          });
          res.status(201).json(newCourse);
        } catch (parseError) {
          res.status(400).json({ error: 'Invalid JSON format for chapterVideoLinks' });
        }
      } catch (uploadError) {
        res.status(500).json({ error: uploadError.message });
      }
    });
  }
}

module.exports = new CourseController();
