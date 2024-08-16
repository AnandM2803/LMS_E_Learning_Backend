const BaseController = require('./base.controller');
const InstructorRepository = require('../repositories/instructor.repository');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
  // Configuration
  cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('photoUrl');

class InstructorController extends BaseController {
    constructor() {
        super(InstructorRepository);
    }

    add = (req, res) => {
        upload(req, res, async (err) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            console.log('Request Body:', req.body);
            const {
                vote,
                day,
                price,
                mentorName,
                technologyName,
                ratings,
                location,
                aboutMe,
                timings
            } = req.body;

            let photoUrl = '';
            if (req.file) {
                try {
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
                        streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
                    });

                    photoUrl = result.secure_url;
                    console.log('Uploaded photo URL:', photoUrl);
                } catch (uploadError) {
                    return res.status(500).json({ error: uploadError.message });
                }
            }

            const formattedTimings = {
                Monday: [],
                Tuesday: [],
                Wednesday: [],
                Thursday: [],
                Friday: [],
                Saturday: [],
                Sunday: []
            };

            if (timings) {
                Object.keys(timings).forEach(day => {
                    if (formattedTimings[day] !== undefined) {
                        formattedTimings[day] = timings[day][0].split(',').map(time => time.trim());
                    }
                });
            }

            console.log('Formatted Timings:', formattedTimings);

            try {
                const newInstructor = await this.repo.create({
                    vote,
                    day,
                    price,
                    mentorName,
                    technologyName,
                    ratings,
                    photoUrl,
                    location,
                    aboutMe,
                    timings: formattedTimings,
                });
                res.status(201).json(newInstructor);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
}

module.exports = new InstructorController();
