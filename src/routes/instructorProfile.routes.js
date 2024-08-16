const express=require('express')
const InstructorProfileController=require('../controllers/instructorProfile.controller')

const router=express.Router();

router.get('/getall', InstructorProfileController.getAll);
router.get('/getbyid/:id', InstructorProfileController.getById);
router.post('/add', InstructorProfileController.add);
router.get('/getbyemail/:email', InstructorProfileController.getByEmail);
router.put('/update/:id', InstructorProfileController.update);
router.delete('/deletebyid/:id', InstructorProfileController.deleteById);

module.exports = router;