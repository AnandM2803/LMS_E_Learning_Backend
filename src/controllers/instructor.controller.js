const BaseController=require('./base.controller')
const InstructorRepository=require('../repositories/instructor.repository')
const multer=require('multer');

const storage=multer.diskStorage({
    destination: function(req,file,cb)
    {
        cb(null,'uploads/');
    },
    filename:function(req,file,cb)
    {
        cb(null,Date.now()+ '-' +file.originalname)
    },
});

const upload=multer({storage:storage}).single('photoUrl');

class Instructorcontroller extends BaseController
{
    constructor()
    {
        super(InstructorRepository)
    }

    add=(req,res)=>{
        upload(req,res,async(err)=>
        {
            if(err)
            {
                return res.status(500).json({error : err.message});
            }
            console.log('Request Body:', req.body);
            const {
                firstName,
                lastName,
                email,
                password,
                phone,
                address,
                vote,
                day,
                price,
                mentorName,
                technologyName,
                ratings,
                location,
                aboutMe,
                timings
            }=req.body;

            const photoUrl=req.file ? `uploads/${req.file.filename}` : '';
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
            
            try{
                const newInstructor=await this.repo.create({
                    firstName,
                    lastName,
                    email,
                    password,
                    phone,
                    address,
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
            } catch(error)
            {
                res.status(500).json({error :error.message})
            }
        });
    }
}

module.exports=new Instructorcontroller();